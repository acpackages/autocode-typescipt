import { AcEventEmitter } from './decorators';

export interface AcRoute {
    path: string;
    element?: any;
    redirectTo?: string;
    pathMatch?: 'full' | 'prefix';
    outlet?: string; // default: 'primary'
    data?: any;
}

export interface IAcRouteSnapshot {
    path: string;
    element: any;
    params: Record<string, string>;
    data: any;
    outlet: string;
}

class AcRouter {
    private routes: AcRoute[] = [];
    public routeChange = new AcEventEmitter<IAcRouteSnapshot>();
    private isPaused: boolean = false;
    lastSnapshot?:IAcRouteSnapshot;

    constructor() {
        window.addEventListener('hashchange', () => this.handleHashChange());
        window.addEventListener('load', () => this.handleHashChange());
    }

    pause() {
        this.isPaused = true;
    }

    resume() {
        this.isPaused = false;
    }

    registerRoutes(routes: AcRoute[]) {
        this.routes = routes;
        // Trigger initial check if loaded
        if (document.readyState === 'complete' && !this.isPaused) {
            this.handleHashChange();
        }
    }

    navigateTo(path: string) {
        window.location.hash = path;
    }

    private handleHashChange() {
        if (this.isPaused) return;

        const hash = window.location.hash.slice(1) || '/'; // Default to '/' if empty
        // Remove query params for matching (basic support)
        const [path] = hash.split('?');

        this.matchRoute(path);
    }

    private matchRoute(url: string) {
        // Standardize URL: ensure it's without leading slash for matching
        const normalizedUrl = url.startsWith('/') ? url.slice(1) : url;

        let matchedRoutes = this.routes.filter(route => {
            if (route.path === '**' || route.path === '*') return false;

            const normalizedPath = route.path.startsWith('/') ? route.path.slice(1) : route.path;
            const pathMatch = route.pathMatch || (route.redirectTo ? 'full' : 'prefix');

            // Convert route path to regex: users/:id -> users/([^/]+)
            const regexPath = normalizedPath.replace(/:([^\/]+)/g, '([^/]+)');
            
            // Build regex based on pathMatch
            const regex = new RegExp(`^${regexPath}${pathMatch === 'full' ? '$' : '(/.*)?$'}`);
            
            return regex.test(normalizedUrl);
        });

        if (matchedRoutes.length === 0) {
            // Try fallback
            matchedRoutes = this.routes.filter(route => route.path === '**' || route.path === '*');
            if (matchedRoutes.length === 0) {
                console.warn(`No route found for ${url}`);
                return;
            }
        }

        // Check for redirects
        // If any of the matched routes is a redirect, we take the first one and navigate
        const redirectRoute = matchedRoutes.find(r => r.redirectTo !== undefined);
        if (redirectRoute) {
            this.navigateTo(redirectRoute.redirectTo!);
            return;
        }

        // For each matched route, emit an event
        matchedRoutes.forEach(route => {
            let params: Record<string, string> = {};

            if (route.path !== '**' && route.path !== '*') {
                const normalizedPath = route.path.startsWith('/') ? route.path.slice(1) : route.path;
                const regexPath = normalizedPath.replace(/:([^\/]+)/g, '([^/]+)');
                const regex = new RegExp(`^${regexPath}`);
                const match = normalizedUrl.match(regex);

                if (match) {
                    // Extract param names
                    const paramNames = (normalizedPath.match(/:([^\/]+)/g) || []).map(s => s.slice(1));
                    paramNames.forEach((name, index) => {
                        params[name] = match[index + 1];
                    });
                }
            }

            const snapshot: IAcRouteSnapshot = {
                path: url,
                element: route.element,
                params: params,
                data: route.data || {},
                outlet: route.outlet || 'primary'
            };
            this.lastSnapshot = snapshot;
            this.routeChange.emit(snapshot);
        });
    }
}

export const acRouter = new AcRouter();
