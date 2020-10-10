import { Controller } from '../core/Controller.js';
export class Home extends Controller {
    constructor(app) {
        super()
        this.name = app.name;
        this.params = app.params;
        this.appElement = app.appElement;
    }
    async indexView() {
        this.models = {
            [this.name]: {}
        }
        this.models[this.name].template = await this.apiTemplate(`../lib/views/${this.name}/index.html`);
        this.models[this.name].data = {
            text: 'hai bro'
        }
        this.appElement.innerHTML = this.updateView(this.models[this.name]);

    }
}