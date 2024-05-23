type Route = {
  path: string;
  handler: () => void;
};

class Router {
  private routes: Route[] = [];

  constructor() {
    window.addEventListener('popstate', () => {
      if (window.location.hash) return;
      this.route(window.location.pathname, false);
    });
    window.addEventListener('hashchange', () => {
      this.route(window.location.pathname, false);
    });
  }

  addRoute(route: Route) {
    this.routes.push(route);
  }

  route(pathname: string, pushState = true) {
    for (const route of this.routes) {
      if (route.path === pathname) {
        if (pushState) {
          window.history.pushState({}, '', pathname);
        }
        route.handler();
        return;
      }
    }
  }
}

const router = new Router();

export { router };
