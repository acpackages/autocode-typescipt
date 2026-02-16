import { AcEventEmitter } from './decorators';

export interface AcRoute {
    path: string;
    element: any;
    outlet?: string; // default: 'primary'
    data?: any;
}

export interface AcRouteSnapshot {
    path: string;
    element: any;
    params: Record<string, string>;
    data: any;
    outlet: string;
}

class AcRouter {
    private routes: AcRoute[] = [];
    public routeChange = new AcEventEmitter<AcRouteSnapshot>();
    private currentParams: Record<string, string> = {};

    constructor() {
        window.addEventListener('hashchange', () => this.handleHashChange());
        window.addEventListener('load', () => this.handleHashChange());
    }

    registerRoutes(routes: AcRoute[]) {
        this.routes = routes;
        // Trigger initial check if loaded
        if (document.readyState === 'complete') {
            this.handleHashChange();
        }
    }

    navigateTo(path: string) {
        window.location.hash = path;
    }

    private handleHashChange() {
        const hash = window.location.hash.slice(1) || '/'; // Default to '/' if empty
        // Remove query params for matching (basic support)
        const [path] = hash.split('?');

        this.matchRoute(path);
    }

    private matchRoute(url: string) {
        // Simple matching logic. 
        // We need to find ALL routes that match (if we support multiple outlets for same path? No, path is unique).
        // Actually, usually one URL matches one main component. 
        // Named outlets are usually for auxiliary routes or the route config defines multiple components for one path.
        // Standard Angular router: config has `component` OR `children`.
        // My plan: config has `component` and `outlet`.

        // Support for:
        // { path: '/home', component: HomeComponent } -> outlet: primary
        // { path: '/home', component: SidebarComponent, outlet: 'sidebar' } -> this implies TWO routes with same path?

        // Yes, if we want multiple outlets updating on same URL, we filter by path.

        // Let's iterate all routes and find ALL that match the current URL.

        const matchedRoutes = this.routes.filter(route => {
            // Simple exact match for now, or regex for params
            // Convert route path to regex: /users/:id -> /users/([^/]+)
            const regexPath = route.path.replace(/:([^\/]+)/g, '([^/]+)');
            const regex = new RegExp(`^${regexPath}$`);
            return regex.test(url);
        });

        if (matchedRoutes.length === 0) {
            console.warn(`No route found for ${url}`);
            return;
        }

        // For each matched route, emit an event (or one event with multiple snapshots)
        // Actually, `AcRouter` (the component) will subscribe and filter by outlet name.

        matchedRoutes.forEach(route => {
            const regexPath = route.path.replace(/:([^\/]+)/g, '([^/]+)');
            const regex = new RegExp(`^${regexPath}$`);
            const match = url.match(regex);

            const params: Record<string, string> = {};
            if (match) {
                // Extract param names
                const paramNames = (route.path.match(/:([^\/]+)/g) || []).map(s => s.slice(1));
                // match[0] is full string
                // match[1].. match[n] are groups
                paramNames.forEach((name, index) => {
                    params[name] = match[index + 1];
                });
            }

            const snapshot: AcRouteSnapshot = {
                path: url,
                element: route.element,
                params: params,
                data: route.data || {},
                outlet: route.outlet || 'primary'
            };

            this.routeChange.emit(snapshot);
        });
    }
}

export const acRouter = new AcRouter();
