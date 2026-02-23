import { acReactive } from './reactive';
import { AcTemplateEngine } from './template-engine';
import { acElementRegistry } from './element-registry';
// Re-export decorators for convenience
export { AcInputElement, AcOutput, AcViewChild, AcEventEmitter, getAcInputMetadata, getAcOutputMetadata, getAcViewChildMetadata } from './decorators';
import { getAcViewChildMetadata } from './decorators';
export { acElementRegistry } from './element-registry';

export interface AcElementMetadata {
    selector: string;
    template?: string;
    templateUrl?: string;
    styles?: string[];
    styleUrls?: string[];
}

const ELEMENT_METADATA_KEY = Symbol('element_metadata');

export function AcElement(metadata: AcElementMetadata) {
    return function (constructor: Function) {
        (constructor as any)[ELEMENT_METADATA_KEY] = metadata;

        // Auto-register element in global registry
        acElementRegistry.register(metadata.selector, constructor, metadata);
    };
}

export function getAcElementMetadata(target: any): AcElementMetadata {
    // Handle both constructor and instance
    const constructor = target.prototype ? target : target.constructor;
    return (constructor as any)[ELEMENT_METADATA_KEY];
}

export class AcElementManager {
    private element!: HTMLElement;
    private metadata: AcElementMetadata;
    private instance: any;
    private templateEngine!: AcTemplateEngine;

    constructor(instance: any, element?: HTMLElement) {
        this.instance = instance;
        this.metadata = (instance.constructor as any)[ELEMENT_METADATA_KEY];
        if (!this.metadata) {
            throw new Error(`No metadata found for ${instance.constructor.name}. Did you forget @AcElement decorator?`);
        }
        if (element) {
            this.element = element;
        }
    }

    public async bootstrap() {
        if (!this.element) {
            this.element = document.querySelector(this.metadata.selector) as HTMLElement;
            if (!this.element) {
                // For now, if auto-bootstrap logic calls this without an element, it might mean selector not found.
                // But manual bootstrapAcElement(Component) relies on this.
                throw new Error(`Selector ${this.metadata.selector} not found for element ${this.instance.constructor.name}`);
            }
        }

        // Initialize reactivity
        this.instance = acReactive(this.instance);

        // Initialize template engine with reactive instance
        this.templateEngine = new AcTemplateEngine(this.instance);

        if (this.metadata.templateUrl) {
            const response = await fetch(this.metadata.templateUrl);
            this.metadata.template = await response.text();
        }

        // Inject host element reference if the component class has 'element' property
        // This allows components (like Router) to manipulate their own DOM
        (this.instance as any).element = this.element;

        if (this.metadata.styles) {
            this.applyStyles(this.metadata.styles);
        }

        if (this.metadata.styleUrls) {
            await this.loadStyleUrls(this.metadata.styleUrls);
        }

        if (typeof this.instance.onInit === 'function') {
            this.instance.onInit();
        }

        this.render();

        // Resolve ViewChild references
        const viewChildMetadata = getAcViewChildMetadata(this.instance.constructor);
        if (Object.keys(viewChildMetadata).length > 0) {
            // We need access to child elements from the template engine
            // This assumes render() has completed and children are instantiated
            const childElements = this.templateEngine.getChildElements();

            for (const [propertyKey, selector] of Object.entries(viewChildMetadata)) {
                // Find matching child element instance
                for (const [el, instance] of childElements.entries()) {
                    // Check if selector matches (simple tag name check for now)
                    if (el.tagName.toLowerCase() === selector.toLowerCase()) {
                        this.instance[propertyKey] = instance;
                        break;
                    }

                    // Check if selector matches attribute
                    if (el.hasAttribute(selector)) {
                        this.instance[propertyKey] = instance;
                        break;
                    }
                }
            }
        }
    }

    private applyStyles(styles: string[]) {
        const styleId = `ac-style-${(this.metadata.selector as string).replace(/[^a-zA-Z0-9]/g, '-')}`;
        if (document.getElementById(styleId)) return;

        const styleEl = document.createElement('style');
        styleEl.id = styleId;
        styleEl.textContent = styles.join('\n');
        document.head.appendChild(styleEl);
    }

    private async loadStyleUrls(urls: string[]) {
        const promises = urls.map(async (url) => {
            const response = await fetch(url);
            return await response.text();
        });
        const styles = await Promise.all(promises);
        this.applyStyles(styles);
    }

    private render(): void {
        this.element.innerHTML = this.metadata.template || '';

        // this.instance is already a reactive proxy with auto-bound methods
        const engine = new AcTemplateEngine(this.instance);
        engine.compile(this.element);
    }
}

export async function bootstrapAcElement(component: any) {
    const manager = new AcElementManager(new component());
    await manager.bootstrap();
}

/**
 * Automatically bootstraps all registered components found in the DOM.
 * Call this once after importing your components.
 */
export async function acBootstrapElements() {
    const components = acElementRegistry.getAllElements();

    for (const registration of components) {
        let elements: Element[] = [];

        if (registration.selector.startsWith('#')) {
            const el = document.getElementById(registration.selector.substring(1));
            elements = el ? [el] : [];
        } else if (registration.selector.startsWith('.')) {
            elements = Array.from(document.querySelectorAll(registration.selector));
        } else {
            // Tag name
            elements = Array.from(document.getElementsByTagName(registration.selector));
        }

        // Also check if selector matches via querySelectorAll for safety (e.g. strict attribute selectors)
        // But for auto-bootstrap we prefer explicit ID/Tag matches for roots
        if (elements.length === 0) {
            const strictMatches = document.querySelectorAll(registration.selector);
            if (strictMatches.length > 0) {
                elements = Array.from(strictMatches);
            }
        }

        for (const el of elements) {
            // We want to instantiate a NEW component for EACH match
            const instance = new registration.constructor();

            // Pass the specific element to manage
            const manager = new AcElementManager(instance, el as HTMLElement);
            await manager.bootstrap();
        }
    }
    console.log(`[AcFrontend] Application bootstrapped.`);
}
