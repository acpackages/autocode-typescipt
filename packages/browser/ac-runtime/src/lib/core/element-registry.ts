// Global registry for AC elements
interface ElementRegistration {
    selector: string;
    constructor: any;
    metadata: any;
}

class AcElementRegistry {
    private elements = new Map<string, ElementRegistration>();

    register(selector: string, constructor: any, metadata: any) {
        // Split by comma for multiple selectors
        const selectors = selector.split(',').map(s => s.trim());

        selectors.forEach(sel => {
            const normalizedSelector = this.normalizeSelector(sel);

            this.elements.set(normalizedSelector, {
                selector: normalizedSelector,
                constructor,
                metadata
            });

            console.log(`Registered element: ${normalizedSelector}`);
        });
    }

    get(selector: string): ElementRegistration | undefined {
        const normalizedSelector = this.normalizeSelector(selector);
        return this.elements.get(normalizedSelector);
    }

    getByTagName(tagName: string): ElementRegistration | undefined {
        // Convert tag name to selector format
        // e.g., "app-child-counter" -> "app-child-counter"
        return this.elements.get(tagName.toLowerCase());
    }

    getByAttribute(attrName: string): ElementRegistration | undefined {
        // Convert attribute to selector format
        // e.g., "app-child-counter" -> "app-child-counter"
        return this.elements.get(attrName.toLowerCase());
    }

    private normalizeSelector(selector: string): string {
        const trimmed = selector.trim();
        // Remove # for ID selectors, keep as-is for tag/attribute selectors
        if (trimmed.startsWith('#')) {
            return trimmed; // Keep ID selectors with #
        }
        // Remove brackets for attribute selectors: [app-child] -> app-child
        if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
            return trimmed.slice(1, -1).toLowerCase();
        }
        return trimmed.toLowerCase();
    }

    getAllElements(): ElementRegistration[] {
        return Array.from(this.elements.values());
    }
}

// Global singleton instance
export const acElementRegistry = new AcElementRegistry();
