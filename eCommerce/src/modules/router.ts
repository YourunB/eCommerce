type Route = {
  path: string;
  handler: () => void;
};

class Router {
  private routes: Route[] = [];

  constructor() {
    window.addEventListener('popstate', () => {
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