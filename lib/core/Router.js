export class Router {
    constructor(app) {
        this.app = app;
        this.routes = [];
        this.hashChange = this.hashChange.bind(this);
        window.addEventListener('hashchange', this.hashChange);
        window.addEventListener('DOMContentLoaded', this.hashChange);
    }
    addRoute(kelas, name, method, path) {
        this.routes.push({
            kelas,
            name,
            method,
            path
        })
    }
    hashChange() {
        const { hash } = window.location;
        let route = this.routes.find(route => {
            return hash.match(new RegExp(route.path))
        });
        if (route) {
            let params = new RegExp(route.path).exec(hash)[1];
            if (params) {
                params = params.split('/');
            }

            this.app.showComponent(route.kelas, route.name, route.method, params)
        }
    }
}