import { acEffect } from './reactive';
import { acPipeRegistry } from './pipes';
import { acElementRegistry } from './element-registry';
import { AcElementMetadata } from './element.base';
import { getAcInputMetadata, getAcOutputMetadata } from './decorators';

export class AcTemplateEngine {
    private childElements = new Map<HTMLElement, any>(); // Track child element instances

    constructor(private context: any) { }

    public compile(element: HTMLElement) {
        this.traverse(element);
    }

    // Get child element instances for ViewChild resolution
    public getChildElements(): Map<HTMLElement, any> {
        return this.childElements;
    }

    private traverse(node: Node) {
        if (node.nodeType === Node.TEXT_NODE) {
            this.processTextNode(node as Text);
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            const el = node as HTMLElement;
            const skipChildren = this.processElement(el);

            if (!skipChildren) {
                Array.from(el.childNodes).forEach(child => this.traverse(child));
            }
        }
    }

    private processTextNode(node: Text) {
        const originalText = node.textContent || '';
        const regex = /\{\{\s*(.*?)\s*\}\}/g;

        if (regex.test(originalText)) {
            acEffect(() => {
                let newText = originalText;
                let match;
                // Reset regex index for multiple matches
                regex.lastIndex = 0;
                while ((match = regex.exec(originalText)) !== null) {
                    const expression = match[1];
                    const value = this.evaluateExpression(expression);
                    newText = newText.replace(match[0], value !== undefined ? value : '');
                }
                node.textContent = newText;
            });
        }
    }

    private processElement(el: HTMLElement): boolean {
        // 0. Check for custom elements (tag-based or attribute-based)
        const customElement = this.detectAndInstantiateCustomElement(el);
        if (customElement) {
            return true; // Skip processing children, custom element handles its own template
        }

        // 1. Structural Directives: ac:if and ac:for
        const acIf = el.getAttribute('ac:if');
        if (acIf !== null) {
            this.handleIfDirective(el, acIf);
            return true;
        }

        const acFor = el.getAttribute('ac:for');
        if (acFor !== null) {
            this.handleForDirective(el, acFor);
            return true;
        }

        const attrs = Array.from(el.attributes);

        for (const attr of attrs) {
            const name = attr.name;
            const value = attr.value;

            // 2. Two-way Binding: ac:model="property"
            if (name === 'ac:model' || name === '[(acModel)]') {
                const isCheckbox = (el as HTMLInputElement).type === 'checkbox';
                const isSelect = el.tagName === 'SELECT';

                acEffect(() => {
                    const val = this.evaluateExpression(value);
                    if (isCheckbox) {
                        (el as HTMLInputElement).checked = !!val;
                    } else if (isSelect) {
                        (el as HTMLSelectElement).value = val !== undefined ? val : '';
                    } else {
                        (el as HTMLInputElement).value = val !== undefined ? val : '';
                    }
                });

                const eventName = (isCheckbox || isSelect) ? 'change' : 'input';
                el.addEventListener(eventName, (e) => {
                    const target = e.target as HTMLInputElement | HTMLSelectElement;
                    const val = isCheckbox ? (target as HTMLInputElement).checked : target.value;
                    this.setExpressionValue(value, val);
                });
                el.removeAttribute(name);
            }

            // 3. Event Binding: ac:on:click="handler()"
            else if (name.startsWith('ac:on:')) {
                const eventName = name.split(':')[2];
                if (eventName) {
                    el.addEventListener(eventName, () => {
                        this.evaluateExpression(value);
                    });
                }
                el.removeAttribute(name);
            }

            // 4. Property Binding: ac:bind:prop="value"
            else if (name.startsWith('ac:bind:')) {
                const propName = name.split(':')[2];
                if (propName) {
                    acEffect(() => {
                        const val = this.evaluateExpression(value);
                        (el as any)[propName] = val;
                    });
                }
                el.removeAttribute(name);
            }

            // 5. Special Shorthands: ac:style, ac:class
            else if (name === 'ac:style' || name === 'ac:class') {
                const directiveName = name.split(':')[1];
                acEffect(() => {
                    const val = this.evaluateExpression(value);
                    if (directiveName === 'style') {
                        Object.assign(el.style, val);
                    } else if (directiveName === 'class') {
                        el.className = val;
                    }
                });
                el.removeAttribute(name);
            }

            // Keep support for standard Angular-like syntax for now (optional, but good for compatibility)
            // or strictly remove if the user really wants ONLY ac:
            else if (name.startsWith('(') && name.endsWith(')')) {
                const eventName = name.slice(1, -1);
                el.addEventListener(eventName, () => {
                    this.evaluateExpression(value);
                });
                el.removeAttribute(name);
            }
            else if (name.startsWith('[') && name.endsWith(']')) {
                const propName = name.slice(1, -1);
                acEffect(() => {
                    const val = this.evaluateExpression(value);
                    (el as any)[propName] = val;
                });
                el.removeAttribute(name);
            }
        }
        return false;
    }

    private handleIfDirective(el: HTMLElement, expression: string) {
        const branchChain: { el: HTMLElement, expression: string | null }[] = [];

        // Start with the 'if' branch
        branchChain.push({ el, expression });

        // Find trailing siblings for else-if and else
        let next = el.nextElementSibling as HTMLElement;
        while (next) {
            const elseIfExpr = next.getAttribute('ac:else-if') || next.getAttribute('ac-else-if');
            if (elseIfExpr !== null) {
                branchChain.push({ el: next, expression: elseIfExpr });
                next.removeAttribute('ac:else-if');
                next.removeAttribute('ac-else-if');
                const toRemove = next;
                next = next.nextElementSibling as HTMLElement;
                toRemove.remove();
                continue;
            }

            if (next.hasAttribute('ac:else') || next.hasAttribute('ac-else')) {
                branchChain.push({ el: next, expression: null });
                next.removeAttribute('ac:else');
                next.removeAttribute('ac-else');
                const toRemove = next;
                next = next.nextElementSibling as HTMLElement;
                toRemove.remove();
                break; // 'else' must be the last one in the chain
            }

            break; // No more matching siblings
        }

        el.removeAttribute('ac:if');
        el.removeAttribute('ac-if');
        el.removeAttribute('*acIf');
        el.removeAttribute('*ac-if');

        const placeholder = document.createComment('ac:condition-chain');
        el.parentNode?.replaceChild(placeholder, el);

        let currentActive: HTMLElement | null = null;

        acEffect(() => {
            // Remove current if exists
            if (currentActive) {
                currentActive.remove();
                currentActive = null;
            }

            for (const branch of branchChain) {
                const condition = branch.expression === null ? true : this.evaluateExpression(branch.expression);
                if (condition) {
                    placeholder.parentNode?.insertBefore(branch.el, placeholder);
                    this.traverse(branch.el);
                    currentActive = branch.el;
                    break;
                }
            }
        });
    }

    private handleForDirective(el: HTMLElement, expression: string) {
        el.removeAttribute('ac:for');
        el.removeAttribute('ac-for');
        el.removeAttribute('*acFor');
        el.removeAttribute('*ac-for');

        const match = expression.match(/let\s+(\w+)\s+of\s+(.+)/);
        if (!match) {
            console.error(`Invalid * acFor expression: ${expression} `);
            return;
        }

        const itemName = match[1];
        const listExpression = match[2];
        const placeholder = document.createComment('acFor');
        const parent = el.parentNode;
        parent?.replaceChild(placeholder, el);

        const template = el.cloneNode(true) as HTMLElement;
        const instances: HTMLElement[] = [];

        acEffect(() => {
            const list = this.evaluateExpression(listExpression);
            if (Array.isArray(list)) {
                // Explicitly access length and items to ensure reactivity
                const len = list.length;

                // Remove previous instances
                instances.forEach(ins => ins.remove());
                instances.length = 0;

                for (let i = 0; i < len; i++) {
                    const item = list[i];
                    const instance = template.cloneNode(true) as HTMLElement;
                    const subContext = Object.create(this.context);
                    subContext[itemName] = item;
                    subContext['$index'] = i;

                    const engine = new AcTemplateEngine(subContext);
                    engine.compile(instance);

                    placeholder.parentNode?.insertBefore(instance, placeholder);
                    instances.push(instance);
                }
            }
        });
    }

    private evaluateExpression(expression: string): any {
        if (expression.includes('|')) {
            const parts = expression.split('|').map(p => p.trim());
            let value = this.evaluateExpression(parts[0]);
            for (let i = 1; i < parts.length; i++) {
                const pipeParts = parts[i].split(':').map(p => p.trim());
                const pipeName = pipeParts[0];
                const pipeArgs = pipeParts.slice(1).map(arg => this.evaluateExpression(arg));
                try {
                    const pipe = acPipeRegistry.getPipe(pipeName);
                    value = pipe.transform(value, ...pipeArgs);
                } catch (e) {
                    console.error(e);
                }
            }
            return value;
        }

        try {
            const fn = new Function('context', `with (context) { return ${expression} } `);
            return fn(this.context);
        } catch (e) {
            console.error(`Error evaluating expression: ${expression} `, e);
            return undefined;
        }
    }

    private setExpressionValue(expression: string, value: any) {
        try {
            const fn = new Function('context', 'value', `with (context) { ${expression} = value } `);
            fn(this.context, value);
        } catch (e) {
            console.error(`Error setting expression value: ${expression} `, e);
        }
    }

    private detectAndInstantiateCustomElement(el: HTMLElement): boolean {
        // Check for tag-based custom element
        const tagName = el.tagName.toLowerCase();
        let registration = acElementRegistry.getByTagName(tagName);

        if (registration) {
            console.log(`[AcTemplateEngine] Detected tag - based element: ${tagName} `);
        }

        // Check for attribute-based custom element
        if (!registration) {
            for (const attr of Array.from(el.attributes)) {
                const attrRegistration = acElementRegistry.getByAttribute(attr.name);
                if (attrRegistration) {
                    registration = attrRegistration;
                    console.log(`[AcTemplateEngine] Detected attribute - based element: ${attr.name} `);
                    break;
                }
            }
        }

        if (!registration) {
            return false; // Not a custom element
        }

        // Parse property bindings [input]="expression"
        const inputs: Record<string, any> = {};
        const outputs: Record<string, string> = {};

        for (const attr of Array.from(el.attributes)) {
            const attrName = attr.name;
            const attrValue = attr.value;

            // Property binding: [propertyName]="expression"
            if (attrName.startsWith('[') && attrName.endsWith(']')) {
                const propName = attrName.slice(1, -1);
                inputs[propName] = this.evaluateExpression(attrValue);
                el.removeAttribute(attrName);
            }
            // Event binding: (eventName)="handler($event)"
            else if (attrName.startsWith('(') && attrName.endsWith(')')) {
                const eventName = attrName.slice(1, -1);
                outputs[eventName] = attrValue;
                el.removeAttribute(attrName);
            }
        }

        // Instantiate the custom element
        const ElementClass = registration.constructor;
        const instance = new ElementClass();

        // Set input values
        const inputMetadata = getAcInputMetadata(ElementClass);
        for (const [propKey, inputName] of Object.entries(inputMetadata)) {
            if (inputs[inputName] !== undefined) {
                instance[propKey] = inputs[inputName];
            }
        }

        // Subscribe to output events
        const outputMetadata = getAcOutputMetadata(ElementClass);
        for (const [propKey, outputName] of Object.entries(outputMetadata)) {
            if (outputs[outputName]) {
                const handler = outputs[outputName];
                const eventEmitter = instance[propKey];
                if (eventEmitter && typeof eventEmitter.subscribe === 'function') {
                    eventEmitter.subscribe((value: any) => {
                        // Replace $event with the actual value
                        const expression = handler.replace(/\$event/g, JSON.stringify(value));
                        this.evaluateExpression(expression);
                    });
                }
            }
        }

        // Call onInit if it exists
        if (typeof instance.onInit === 'function') {
            instance.onInit();
        }

        // Render the element's template
        if (registration.metadata.template) {
            el.innerHTML = registration.metadata.template;
        }

        // Apply styles
        if (registration.metadata.styles && registration.metadata.styles.length > 0) {
            const styleEl = document.createElement('style');
            styleEl.textContent = registration.metadata.styles.join('\n');
            el.appendChild(styleEl);
        }

        // Create a new TemplateEngine for the child element's context
        const childEngine = new AcTemplateEngine(instance);

        // Compile the children (the shadow DOM / template content)
        // usage of Array.from to avoid issues if childNodes changes during iteration (though traverse shouldn't change structure of *siblings*)
        Array.from(el.childNodes).forEach(child => childEngine.traverse(child));

        // Track the child element instance
        this.childElements.set(el, instance);

        return true;
    }
}
