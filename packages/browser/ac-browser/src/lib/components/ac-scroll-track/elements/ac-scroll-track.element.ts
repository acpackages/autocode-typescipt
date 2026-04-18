import { AcElementBase } from "../../../core/ac-element-base";
import { acRegisterCustomElement } from "../../../utils/ac-element-functions";
import { AC_SCROLL_TRACK_TAG } from "../_ac-scroll-track.export";

type ScrollTrackCallback = (activeId: string | null) => void;

export class AcScrollTrack extends AcElementBase{
    private sections: HTMLElement[] = [];
    // private callback: ScrollTrackCallback;
    private observer?: IntersectionObserver;


    /**
     * Registers the sections to be tracked by selector or direct HTMLElements
     */
    public registerSections(sections: string | HTMLElement[]): void {
        if (typeof sections === "string") {
            this.sections = Array.from(this.querySelectorAll<HTMLElement>(sections));
        } else {
            this.sections = sections;
        }

        if (this.sections.length === 0) {
            console.warn("No sections found for AcScrollTrack");
        }
    }

    /**
     * Start tracking scroll and triggering callback when section changes
     */
    public startTracking(): void {
        if (this.sections.length === 0) {
            console.warn("No sections registered to track");
            return;
        }

        const callback = (entries: IntersectionObserverEntry[]) => {
            // Sort by vertical position
            const visible = entries
                .filter(e => e.isIntersecting)
                .sort((a, b) => (a.boundingClientRect.top - b.boundingClientRect.top));

            if (visible.length > 0) {
                const activeId = visible[0].target.id || null;
                // this.callback(activeId);
            }
        };

        const options = {
            root: this,
            threshold: 0.5 // 50% visible means "active"
        };

        this.sections.forEach(section => {
            this.observeIntersectionManaged(section, callback, options);
        });
    }

    /**
     * Stop tracking and cleanup
     */
    public stopTracking(): void {
        // Managed by base class destroy() if the element is removed.
        // If they want to stop manually without destroying:
        // (Base class doesn't currently support manual stop of a single managed observer easily)
        // But for this component, startTracking is usually called once.
    }
}


acRegisterCustomElement({tag:AC_SCROLL_TRACK_TAG.scrollTrack,type:AcScrollTrack});
