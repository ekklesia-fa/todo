export class App {
    constructor(selector) {
        this.appElement = document.querySelector(selector.app);
        this.msgElement = document.querySelector(selector.msg);
        this.windowTitle = document.title;
    }
    showComponent(kelas, name, method, params) {
        document.title = name.toUpperCase() + ' | ' + this.windowTitle;
        this.currentComponent = new kelas({ appElement: this.appElement, msgElement: this.msgElement, name, params });
        this.currentComponent[method]();
    }
}