import { acEffect, acMakeReactive } from './reactive';
import { acPipeRegistry } from '@autocode-ts/ac-pipes';
import { acElementRegistry } from './element-registry';
import { getAcInputMetadata, getAcOutputMetadata, getAcViewChildMetadata } from './decorators';
import { AcElementManager, acInitRuntimeElementInstance, acSetEngineElementEngineUUID, acSetEngineElementStyles } from './element.base';
import { AC_RUNTIME_CONFIG } from '../consts/ac-runtime-config.const';

export class AcTemplateEngine {
    private childElements = new Map<HTMLElement, any>(); // Track child element instances
    private templates = new Map<string, HTMLTemplateElement>();
    private references = new Map<string, any>();
    private parent?: AcTemplateEngine;

    constructor(private context: any, parent?: AcTemplateEngine) {
        this.parent = parent;
    }

    public compile(element: HTMLElement) {
        this.findAndRegisterTemplates(element);
        this.traverse(element);
    }

    // Get child element instances for ViewChild resolution
    public getChildElements(): Map<HTMLElement, any> {
        return this.childElements;
    }

    // Get registered templates for ViewChild resolution
    public getTemplates(): Map<string, HTMLTemplateElement> {
        return this.templates;
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
        } else if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
            Array.from(node.childNodes).forEach(child => this.traverse(child));
        }
    }

    private processTextNode(node: Text) {
        const originalText = node.textContent || '';
        const regex = /\{\{\s*(.*?)\s*\}\}/g;

        if (regex.test(originalText)) {
            acEffect(() => {
                let newText = originalText;
                let match;
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
        // Skip processing if this is the host element of the current component
        // This prevents the component from incorrectly processing its own attributes
        // (like #ref placed by a parent) and overwriting its own properties.
        if (this.context && this.context.element === el) {
            return false;
        }

        const tagName = el.tagName.toLowerCase();

        // 1. Structural Directives (handle first)
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

        // 2. Identification of Child Element for ViewChild & Template References
        const attrs = Array.from(el.attributes);
        attrs.forEach(attr => {
            if (attr.name.startsWith('#')) {
                const refName = attr.name.slice(1).toLowerCase();
                this.references.set(refName, el);
                if (!this.childElements.has(el)) {
                    this.childElements.set(el, el);
                }
            }
        });

        // 3. Directive, Model, Style, Class Binding (Run for ALL elements, including custom ones)
        for (const attr of attrs) {
            const name = attr.name;
            const value = attr.value;

            try {
                if (name === 'ac:model') {
                    const isCheckbox = (el as HTMLInputElement).type === 'checkbox';
                    const isSelect = el.tagName === 'SELECT';

                    acEffect(() => {
                        const val = this.evaluateExpression(value);
                        if (isCheckbox) (el as HTMLInputElement).checked = !!val;
                        else if (isSelect) (el as HTMLSelectElement).value = val !== undefined ? val : '';
                        else (el as HTMLInputElement).value = val !== undefined ? val : '';
                    });

                    const listenerFun = () => {
                        const target = el as HTMLInputElement | HTMLSelectElement;
                        const val = isCheckbox ? (target as HTMLInputElement).checked : target.value;
                        this.setExpressionValue(value, val);
                    };
                    el.addEventListener('input',listenerFun );
                    el.addEventListener('change',listenerFun );
                    el.removeAttribute(name);
                }
                else if (name === 'ac:template:outlet' || name === 'ac:template-outlet' || name === '[acTemplateOutlet]' || name === '*ngTemplateOutlet' || name === '[ngTemplateOutlet]') {
                    acEffect(() => {
                        let templateExpr = value;
                        let contextExpr: string | null = null;
                        if (value.includes(';')) {
                            const parts = value.split(';').map(p => p.trim());
                            templateExpr = parts[0];
                            const contextPart = parts.find(p => p.startsWith('context:'));
                            if (contextPart) contextExpr = contextPart.replace('context:', '').trim();
                        }
                        const template = this.evaluateExpression(templateExpr);
                        if (template && (template instanceof HTMLTemplateElement || (template instanceof HTMLElement && template.tagName.toLowerCase() === 'ac-template'))) {
                            el.innerHTML = '';

                            const fragment = document.createDocumentFragment();
                            const nodesToClone = (template instanceof HTMLTemplateElement) ? template.content.childNodes : template.childNodes;
                            Array.from(nodesToClone).forEach(child => fragment.appendChild(child.cloneNode(true)));

                            // Lexical Scoping: Use the context where the template was defined
                            const definitionContext = (template as any)._acContext || this.context;
                            const definingEngine = (template as any)._acEngine || this;
                            let renderContext = definitionContext;

                            if (contextExpr) {
                                // Evaluate context expression against the OUTLET's context (current context)
                                const extraContext = this.evaluateExpression(contextExpr);
                                // Merge extra context into the definition context
                                renderContext = Object.create(definitionContext);
                                Object.assign(renderContext, extraContext);
                            }

                            const engine = new AcTemplateEngine(renderContext, definingEngine);

                            // If host is an ac-container, render into its parent before the placeholder
                            const placeholder = (el as any)._acPlaceholder;
                            if (placeholder && placeholder.parentNode) {
                                placeholder.parentNode.insertBefore(fragment, placeholder);
                                Array.from(fragment.childNodes).forEach(child => engine.traverse(child));
                            } else {
                                el.appendChild(fragment);
                                Array.from(el.childNodes).forEach(child => engine.traverse(child));
                            }
                        }
                    });
                    el.removeAttribute(name);
                }
                else if (name.startsWith('ac:bind:')) {
                    const attrToBind = name.replace('ac:bind:', '');
                    acEffect(() => {
                        const val = this.evaluateExpression(value);
                        if (val === null || val === undefined) {
                            el.removeAttribute(attrToBind);
                            if (attrToBind in el) {
                                (el as any)[attrToBind] = (typeof (el as any)[attrToBind] === 'boolean') ? false : '';
                            }
                        } else {
                            const stringValue = String(val);
                            // Escape double quotes in the attribute value string for safe HTML rendering
                            const escapedValue = stringValue.includes('"') ? stringValue.replace(/"/g, '\"') : stringValue;

                            if (attrToBind in el) {
                                (el as any)[attrToBind] = val;
                            }
                            if (attrToBind == 'innerhtml') {
                                el.innerHTML = stringValue;
                            }
                            else if (attrToBind == 'innertext') {
                                el.innerText = stringValue;
                            }
                            else {
                                el.setAttribute(attrToBind, escapedValue);
                            }
                        }
                    });
                    el.removeAttribute(name);
                }
                else if (name.startsWith('ac:class:')) {
                    const className = name.split(':')[2];
                    acEffect(() => {
                        const val = this.evaluateExpression(value);
                        if (val) {
                            el.classList.add(className);
                        }
                        else {
                            el.classList.remove(className);
                        }
                    });
                    el.removeAttribute(name);
                }
            } catch (e) {
                AC_RUNTIME_CONFIG.logError(`Error processing attribute ${name} on ${el.tagName}:`, e);
            }
        }

        // 4. Custom Elements
        const customElement = this.detectAndInstantiateCustomElement(el);
        if (customElement) {
            return true;
        }

        // 5. Component Ref and Attribute Mapping (Standard Elements)
        if (tagName === 'ac-template') {
            this.handleTemplateDefinition(el);
            return true;
        }

        if (tagName === 'ac-container') {
            this.handleContainer(el);
            return true;
        }

        // Selective Reference Assignment (only if ViewChild exists)
        this.applyReferenceToInstance(this.context, el, el);

        // Universal Attribute to Property Mapping
        this.applyAttributesToInstance(el, el);

        // 6. Event Binding (Standard Elements)
        for (const attr of Array.from(el.attributes)) {
            const name = attr.name;
            const value = attr.value;

            try {
                if (name.startsWith('(') && name.endsWith(')')) {
                    const eventName = name.slice(1, -1);
                    el.addEventListener(eventName, (event) => {
                        this.evaluateExpression(value, { '$event': event });
                    });
                    el.removeAttribute(name);
                }
            } catch (e) {
                AC_RUNTIME_CONFIG.logError(`Error processing event ${name} on ${el.tagName}:`, e);
            }
        }

        return false;
    }

    private applyAttributesToInstance(instance: any, el: HTMLElement, registration?: any) {
        const attrs = Array.from(el.attributes);
        const inputMetadata = registration ? getAcInputMetadata(registration.constructor) : {};

        for (const attr of attrs) {
            try {
                const attrName = attr.name;
                let attrValue = attr.value;

                if (attrName.startsWith('ac:') || (attrName.startsWith('(') && attrName.endsWith(')')) || attrName.startsWith('#')) {
                    continue;
                }

                let propName = attrName;
                let isBound = false;

                if (attrName.startsWith('[') && attrName.endsWith(']')) {
                    propName = attrName.slice(1, -1);
                    isBound = true;
                }
                else {
                    for (const [_, alias] of Object.entries(inputMetadata)) {
                        if (alias.toLowerCase() === propName.toLowerCase()) {
                            if (!attrName.startsWith('[') && !attrName.endsWith(']')) {
                                attrValue = `'${attrValue.replaceAll("'", "/'")}'`;
                            }
                            isBound = true;
                            break;
                        }
                    }
                }
                let targetProp: string | undefined;

                if (registration) {
                    for (const [key, alias] of Object.entries(inputMetadata)) {
                        if (alias.toLowerCase() === propName.toLowerCase()) {
                            targetProp = key;
                            break;
                        }
                    }
                }

                if (!targetProp) {
                    targetProp = this.findCorrectPropertyCasing(instance, propName);
                }

                if (targetProp) {
                    if (isBound) {
                        acEffect(() => {
                            try {
                                const reactiveVal = this.evaluateExpression(attrValue);
                                instance[targetProp!] = reactiveVal;
                                if (typeof instance.acOnChanges === 'function') {
                                    instance.acOnChanges({ [targetProp!]: reactiveVal });
                                }
                            } catch (e) {
                                AC_RUNTIME_CONFIG.logError(`Error in reactive input binding [${propName}] for ${el.tagName}:`, e);
                            }
                        });
                    } else {
                        // instance[targetProp] = attrValue;
                    }
                }
            } catch (e) {
                AC_RUNTIME_CONFIG.logError(`Error mapping attribute ${attr.name} to instance:`, e);
            }
        }
    }

    private applyReferenceToInstance(instance: any, el: HTMLElement, refValue: any) {
        if (!instance || !instance.constructor) return;

        const viewChildMetadata = getAcViewChildMetadata(instance.constructor);
        if (Object.keys(viewChildMetadata).length === 0) return;

        const attrs = Array.from(el.attributes);
        for (const attr of attrs) {
            if (attr.name.startsWith('#')) {
                const refName = attr.name.slice(1).toLowerCase();

                // Match case-insensitively against @AcViewChild metadata
                for (const [propertyKey, selector] of Object.entries(viewChildMetadata)) {
                    const targetRef = selector.startsWith('#') ? selector.slice(1).toLowerCase() : selector.toLowerCase();
                    if (refName === targetRef) {
                        instance[propertyKey] = (el as any).acInstance || refValue;
                        // Keep #ref attribute for others but don't re-assign to instance blinded
                    }
                }
            }
        }
    }

    private findCorrectPropertyCasing(instance: any, lowerProp: string): string | undefined {
        const lower = lowerProp.toLowerCase();
        let curr = instance;
        while (curr) {
            const props = Object.getOwnPropertyNames(curr);
            const found = props.find(p => p.toLowerCase() === lower);
            if (found) return found;
            curr = Object.getPrototypeOf(curr);
        }
        return undefined;
    }

    private detectAndInstantiateCustomElement(el: HTMLElement): boolean {
        const tagName = el.tagName.toLowerCase();
        let registration = acElementRegistry.getByTagName(tagName);

        if (!registration) {
            for (const attr of Array.from(el.attributes)) {
                const attrRegistration = acElementRegistry.getByAttribute(attr.name);
                if (attrRegistration) {
                    registration = attrRegistration;
                    break;
                }
            }
        }

        if (!registration) return false;

        // Prevent self-instantiation if this element is already the host for the current context
        if (this.context && this.context.element === el) {
            return false;
        }

        const outputs: Record<string, string> = {};
        for (const attr of Array.from(el.attributes)) {
            if (attr.name.startsWith('(') && attr.name.endsWith(')')) {
                outputs[attr.name.slice(1, -1).toLowerCase()] = attr.value;
                el.removeAttribute(attr.name);
            }
        }

        const ElementClass = registration.constructor;
        let instance = (el as any).acInstance;
        let isNew = false;

        if (!instance) {
            instance = acMakeReactive(new ElementClass());
            (instance as any).element = el;
            acSetEngineElementEngineUUID(el, instance);
            isNew = true;
        }

        // Apply References (Selective & Template Scope)
        this.applyReferenceToInstance(this.context, el, instance);
        for (const attr of Array.from(el.attributes)) {
            if (attr.name.startsWith('#')) {
                const refName = attr.name.slice(1).toLowerCase();
                this.references.set(refName, instance);
            }
        }

        // Apply Inputs/Attributes
        this.applyAttributesToInstance(instance, el, registration);

        const outputMetadata = getAcOutputMetadata(ElementClass);
        const registeredOutputNames = new Set(Object.values(outputMetadata).map(o => o.toLowerCase()));

        for (const [propKey, outputName] of Object.entries(outputMetadata)) {
            try {
                const handler = outputs[outputName.toLowerCase()];
                if (handler) {
                    const eventEmitter = instance[propKey];
                    if (eventEmitter && typeof eventEmitter.subscribe === 'function') {
                        eventEmitter.subscribe((value: any) => {
                            try {
                                this.evaluateExpression(handler, { '$event': value });
                            } catch (e) {
                                AC_RUNTIME_CONFIG.logError(`Error in output handler for (${outputName}) on ${tagName}:`, e);
                            }
                        });
                    }
                }
            } catch (e) {
                AC_RUNTIME_CONFIG.logError(`Error setting up output (${outputName}) on ${tagName}:`, e);
            }
        }

        // Bind any remaining events in outputs that are not @AcOutputs as native DOM events
        for (const [eventName, handler] of Object.entries(outputs)) {
            if (!registeredOutputNames.has(eventName)) {
                el.addEventListener(eventName, (event) => {
                    try {
                        this.evaluateExpression(handler, { '$event': event });
                    } catch (e) {
                        AC_RUNTIME_CONFIG.logError(`Error in native event handler (${eventName}) on ${tagName}:`, e);
                    }
                });
            }
        }

        if (registration.metadata.template && isNew) el.innerHTML = registration.metadata.template;

        const uuid = el.getAttribute('ac-engine-element');
        if (registration.metadata.styles && registration.metadata.styles.length > 0 && uuid && isNew) {
            acSetEngineElementStyles(registration.metadata.styles, uuid);
        }

        if (isNew) {
            const childEngine = new AcTemplateEngine(instance, this);
            this.registerContentTemplates(el, instance);
            childEngine.compile(el);

            AcElementManager.resolveViewChild(instance, childEngine);
            this.childElements.set(el, instance);

            acInitRuntimeElementInstance(instance);
        }

        return true;
    }

    private handleIfDirective(el: HTMLElement, expression: string) {
        const branchChain: { el: HTMLElement, expression: string | null }[] = [];
        branchChain.push({ el, expression });

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
                break;
            }
            break;
        }

        el.removeAttribute('ac:if');
        el.removeAttribute('ac-if');
        const placeholder = document.createComment('ac:condition-chain');
        el.parentNode?.replaceChild(placeholder, el);

        let currentActiveNodes: Node[] = [];
        acEffect(() => {
            if (currentActiveNodes.length > 0) {
                currentActiveNodes.forEach(node => {
                    if (node instanceof HTMLElement) {
                        this.destroyInstances(node);
                    }
                    if (node.parentNode) {
                        node.parentNode.removeChild(node);
                    }
                });
                currentActiveNodes = [];
            }
            for (const branch of branchChain) {
                const condition = branch.expression === null ? true : this.evaluateExpression(branch.expression);
                if (condition) {
                    const clone = branch.el.cloneNode(true) as HTMLElement;
                    const parent = placeholder.parentNode;
                    if (parent) {
                        if (clone.tagName.toLowerCase() === 'ac-container') {
                            const fragment = this.createFragmentFromContainer(clone);
                            const nodes = Array.from(fragment.childNodes);
                            parent.insertBefore(fragment, placeholder);
                            nodes.forEach(node => this.traverse(node));
                            currentActiveNodes = nodes;
                        } else {
                            parent.insertBefore(clone, placeholder);
                            this.traverse(clone);
                            currentActiveNodes = [clone];
                        }
                    }
                    break;
                }
            }
        });
    }

    private handleForDirective(el: HTMLElement, expression: string) {
        // Split on semicolons to separate the main `let item of list` from extra variable declarations
        const parts = expression.split(';').map(p => p.trim()).filter(p => p.length > 0);
        const mainPart = parts[0];
        const extraParts = parts.slice(1);

        const match = mainPart.match(/let\s+(\w+)\s+of\s+(.+)/);
        if (!match) return;

        const itemName = match[1];
        const listExpression = match[2].trim();

        // Parse extra variable declarations like `let index = index`, `let first = first`, etc.
        // Maps local variable name -> keyword ('index', 'first', 'last', 'even', 'odd', 'count')
        const extraVars: { localName: string; keyword: string }[] = [];
        for (const part of extraParts) {
            const varMatch = part.match(/let\s+(\w+)\s*=\s*(\w+)/);
            if (varMatch) {
                extraVars.push({ localName: varMatch[1], keyword: varMatch[2] });
            }
        }

        el.removeAttribute('ac:for');
        el.removeAttribute('ac-for');
        const template = el.cloneNode(true) as HTMLElement;
        const placeholder = document.createComment(`ac:for ${expression}`);
        el.parentNode?.replaceChild(placeholder, el);

        const instances: { nodes: Node[] }[] = [];
        acEffect(() => {
            const list = this.evaluateExpression(listExpression);
            if (Array.isArray(list)) {
                instances.forEach(ins => {
                    ins.nodes.forEach(node => {
                        if (node instanceof HTMLElement) {
                            this.destroyInstances(node);
                        }
                        if (node.parentNode) {
                            node.parentNode.removeChild(node);
                        }
                    });
                });
                instances.length = 0;
                const count = list.length;
                list.forEach((item, i) => {
                    const instance = template.cloneNode(true) as HTMLElement;
                    const subContext = Object.create(this.context);
                    subContext[itemName] = item;
                    subContext['$index'] = i;

                    // Expose extra loop variables by their declared local name
                    for (const { localName, keyword } of extraVars) {
                        switch (keyword) {
                            case 'index': subContext[localName] = i; break;
                            case 'first': subContext[localName] = i === 0; break;
                            case 'last': subContext[localName] = i === count - 1; break;
                            case 'even': subContext[localName] = i % 2 === 0; break;
                            case 'odd': subContext[localName] = i % 2 !== 0; break;
                            case 'count': subContext[localName] = count; break;
                            default: subContext[localName] = undefined; break;
                        }
                    }

                    const engine = new AcTemplateEngine(subContext, this);
                    const parent = placeholder.parentNode;
                    if (parent) {
                        if (instance.tagName.toLowerCase() === 'ac-container') {
                            const fragment = this.createFragmentFromContainer(instance);
                            const nodes = Array.from(fragment.childNodes);
                            engine.compile(fragment as any);
                            parent.insertBefore(fragment, placeholder);
                            instances.push({ nodes });
                        } else {
                            engine.compile(instance);
                            parent.insertBefore(instance, placeholder);
                            instances.push({ nodes: [instance] });
                        }
                    }
                });
            }
        });
    }

    private handleTemplateDefinition(el: HTMLElement) {
        const refAttr = Array.from(el.attributes).find(attr => attr.name.startsWith('#'));
        if (refAttr) {
            const refName = refAttr.name.slice(1).toLowerCase();
            const template = document.createElement('template');
            template.innerHTML = el.innerHTML;
            (template as any)._acContext = this.context; // Store definition context
            (template as any)._acEngine = this; // Store definition engine
            this.templates.set(refName, template);
            if (this.context) {
                this.applyReferenceToInstance(this.context, el, template);
            }
        }
        el.remove();
    }

    private handleContainer(el: HTMLElement) {
        const parent = el.parentNode;
        if (!parent) return;
        const acIf = el.getAttribute('ac:if');
        const acFor = el.getAttribute('ac:for');
        if (acIf !== null || acFor !== null) {
            if (acIf !== null) this.handleIfDirective(el, acIf);
            else if (acFor !== null) this.handleForDirective(el, acFor);
            return;
        }
        const fragment = document.createDocumentFragment();
        while (el.firstChild) fragment.appendChild(el.firstChild);
        const placeholder = document.createComment('ac-container');
        (el as any)._acPlaceholder = placeholder;
        parent.replaceChild(placeholder, el);
        Array.from(fragment.childNodes).forEach(child => this.traverse(child));
        parent.insertBefore(fragment, placeholder);
    }

    private findAndRegisterTemplates(root: HTMLElement) {
        root.querySelectorAll('ac-template').forEach(el => {
            let parent = el.parentElement;
            let isOwned = true;
            while (parent && parent !== root) {
                if (acElementRegistry.getByTagName(parent.tagName)) {
                    isOwned = false;
                    break;
                }
                parent = parent.parentElement;
            }
            if (isOwned) {
                this.handleTemplateDefinition(el as HTMLElement);
            }
        });
    }

    private registerContentTemplates(el: HTMLElement, instance: any) {
        // Use direct children only to avoid stealing templates from nested components
        Array.from(el.children).filter(child => child.tagName.toLowerCase() === 'ac-template').forEach(tpl => {
            const refAttr = Array.from(tpl.attributes).find(attr => attr.name.startsWith('#'));
            if (refAttr) {
                const refName = refAttr.name.slice(1).toLowerCase();
                (tpl as any)._acContext = this.context; // Store definition context for transcluded templates
                (tpl as any)._acEngine = this; // Store definition engine
                instance[refName] = tpl;
            }
            tpl.remove();
        });
    }

    private createFragmentFromContainer(el: HTMLElement): DocumentFragment {
        const fragment = document.createDocumentFragment();
        const clone = el.cloneNode(true) as HTMLElement;
        while (clone.firstChild) fragment.appendChild(clone.firstChild);
        return fragment;
    }

    private destroyInstances(el: HTMLElement) {
        const instance = this.childElements.get(el);
        if (instance && typeof instance.onDestroy === 'function') instance.onDestroy();
        this.childElements.delete(el);
        el.querySelectorAll('*').forEach(child => {
            const childInstance = this.childElements.get(child as HTMLElement);
            if (childInstance && typeof childInstance.onDestroy === 'function') childInstance.onDestroy();
            this.childElements.delete(child as HTMLElement);
        });
    }

    private evaluateExpression(expression: string, locals?: Record<string, any>): any {
        if (expression.includes('|')) {
            const parts: string[] = [];
            let currentPart = "";
            let inString: string | null = null;
            let j = 0;
            while (j < expression.length) {
                const char = expression[j];
                if (inString) {
                    if (char === inString && expression[j - 1] !== '\\') inString = null;
                    currentPart += char;
                } else if (char === "'" || char === '"' || char === '`') {
                    inString = char;
                    currentPart += char;
                } else if (char === '|' && expression[j + 1] === '|') {
                    currentPart += '||';
                    j++;
                } else if (char === '|') {
                    parts.push(currentPart.trim());
                    currentPart = "";
                } else {
                    currentPart += char;
                }
                j++;
            }
            parts.push(currentPart.trim());

            if (parts.length > 1) {
                let value = this.evaluateExpression(parts[0], locals);
                for (let i = 1; i < parts.length; i++) {
                    const pipeExpr = parts[i];
                    const pipeParts: string[] = [];
                    let currentPipePart = "";
                    let inPipeString: string | null = null;
                    let k = 0;
                    while (k < pipeExpr.length) {
                        const char = pipeExpr[k];
                        if (inPipeString) {
                            if (char === inPipeString && pipeExpr[k - 1] !== '\\') inPipeString = null;
                            currentPipePart += char;
                        } else if (char === "'" || char === '"' || char === '`') {
                            inPipeString = char;
                            currentPipePart += char;
                        } else if (char === ':') {
                            pipeParts.push(currentPipePart.trim());
                            currentPipePart = "";
                        } else {
                            currentPipePart += char;
                        }
                        k++;
                    }
                    pipeParts.push(currentPipePart.trim());

                    try {
                        const pipe = acPipeRegistry.getPipe(pipeParts[0]);
                        const args = pipeParts.slice(1).map(arg => this.evaluateExpression(arg, locals));
                        value = pipe.transform(value, ...args);
                    } catch (e) {
                        AC_RUNTIME_CONFIG.logError(expression);
                        AC_RUNTIME_CONFIG.logError(e);
                    }
                }
                return value;
            }
        }
        try {
            const scope = this.getScope(locals);
            const normalizedExpr = this.normalizeExprForScope(expression);

            // Use double 'with' to ensure methods are called with component context as 'this'
            // while still allowing locals/templates/refs to be resolved from the scope.
            const fn = new Function('scope', 'context', `with (context) { with (scope) { return ${normalizedExpr} } } `);
            const result = fn.call(this.context, scope, this.context);
            return result;
        } catch (e) {
            AC_RUNTIME_CONFIG.logError(`Error evaluating expression: ${expression} `, e);
            return undefined;
        }
    }


    private setExpressionValue(expression: string, value: any) {
        try {
            const scope = this.getScope();
            const normalizedExpr = this.normalizeExprForScope(expression);
            const fn = new Function('scope', 'context', 'value', `with (context) { with (scope) { ${normalizedExpr} = value } } `);
            fn.call(this.context, scope, this.context, value);
        } catch (e) {
            AC_RUNTIME_CONFIG.logError(`Error setting expression value: ${expression} `, e);
        }
    }

    /**
     * Normalizes an expression by lowercasing identifiers that match known template
     * or reference names. This replaces the Proxy's case-insensitive has/get traps:
     * HTML lowercases attribute names (e.g., #rowTemplate → key 'rowtemplate'),
     * but expression values preserve casing (e.g., 'rowTemplate'). This method
     * ensures they match without needing a Proxy.
     */
    private normalizeExprForScope(expression: string): string {
        // Collect all known scope names (templates + references) from hierarchy
        const knownNames = new Set<string>();
        let engine: AcTemplateEngine | undefined = this;
        while (engine) {
            engine.templates.forEach((_, name) => knownNames.add(name));
            engine.references.forEach((_, name) => knownNames.add(name));
            engine = engine.parent;
        }

        if (knownNames.size === 0) return expression;

        // Sort by length descending so longer names match first
        const sorted = Array.from(knownNames).sort((a, b) => b.length - a.length);
        const escaped = sorted.map(n => n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
        const pattern = escaped.join('|');
        const regex = new RegExp(`\\b(${pattern})\\b`, 'gi');

        return expression.replace(regex, (match) => match.toLowerCase());
    }

    private getScope(locals?: Record<string, any>): any {
        const scope = Object.create(null);
        if (locals) {
            Object.assign(scope, locals);
        }

        // Collect engine hierarchy from root to this
        const engines: AcTemplateEngine[] = [];
        let curr: AcTemplateEngine | undefined = this;
        while (curr) {
            engines.unshift(curr);
            curr = curr.parent;
        }

        // Merge templates and references into scope (local shadows parent)
        for (const engine of engines) {
            engine.templates.forEach((tpl, name) => {
                scope[name] = tpl;
            });
            engine.references.forEach((ref, name) => {
                scope[name] = ref;
            });
        }

        return scope;
    }
}
