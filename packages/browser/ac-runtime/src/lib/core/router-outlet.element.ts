import { AcElement, AcElementManager, AcInputElement, getAcElementMetadata } from './element.base';
import { acRouter, AcRouteSnapshot } from './router';

@AcElement({
    selector: 'ac-router',
    template: '', // Empty by default, content injected by router
})
export class AcRouterElement {
    @AcInputElement() name: string = 'primary';

    element!: HTMLElement; // Injected by ElementManager
    private currentComponentInstance: any = null;

    async onInit() {
        // Subscribe to router
        acRouter.routeChange.subscribe((snapshot: AcRouteSnapshot) => {
            this.handleRouteChange(snapshot);
        });
    }

    async handleRouteChange(snapshot: AcRouteSnapshot) {
        if (snapshot.outlet !== this.name) {
            return; // Not for this outlet
        }

        // Clear current content
        this.element.innerHTML = '';
        this.currentComponentInstance = null;

        const ComponentClass = snapshot.element;
        if (!ComponentClass) return;

        // 1. Instantiate the component container element based on its selector
        const metadata = getAcElementMetadata(ComponentClass);
        if (!metadata) {
            console.error(`[AcRouter] No metadata found for component ${ComponentClass.name}`);
            return;
        }

        // Determine the tag to create
        // Selectors can be 'my-tag', '[my-attr]', '.my-class', '#my-id'
        // or comma separated 'my-tag, [my-attr]'

        const selectors = metadata.selector.split(',').map(s => s.trim());
        let hostElement: HTMLElement | null = null;

        // Priority: Tag -> Attribute -> Class -> ID
        // We prefer creating a semantic custom element tag if available.

        // Check for tag (alphanumeric with dash usually, or just starts with char)
        const tagSelector = selectors.find(s => /^[a-z][a-z0-9-]*$/i.test(s));
        if (tagSelector) {
            hostElement = document.createElement(tagSelector);
        }

        // Check for attribute [attr]
        if (!hostElement) {
            const attrSelector = selectors.find(s => s.startsWith('[') && s.endsWith(']'));
            if (attrSelector) {
                hostElement = document.createElement('div');
                const attrName = attrSelector.slice(1, -1);
                hostElement.setAttribute(attrName, '');
            }
        }

        // Check for class .class
        if (!hostElement) {
            const classSelector = selectors.find(s => s.startsWith('.'));
            if (classSelector) {
                hostElement = document.createElement('div');
                hostElement.className = classSelector.slice(1);
            }
        }

        // Check for ID #id
        if (!hostElement) {
            const idSelector = selectors.find(s => s.startsWith('#'));
            if (idSelector) {
                // Creating an element with ID inside a router might duplicate IDs if router is reused?
                // But usually router outlet switches content.
                hostElement = document.createElement('div');
                hostElement.id = idSelector.slice(1);
            }
        }

        if (!hostElement) {
            console.error(`[AcRouter] Cloud not determine how to create element for selector: ${metadata.selector}`);
            return;
        }

        // 2. Append to router
        this.element.appendChild(hostElement);

        // 3. Create component instance and bootstrap
        const instance = new ComponentClass();
        const manager = new AcElementManager(instance, hostElement);
        await manager.bootstrap();

        this.currentComponentInstance = instance;
    }
}
