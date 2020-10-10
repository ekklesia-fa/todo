import DateTime from "./DateTime.js";

export class Controller {
    constructor() {
        this.BASE_URL = 'http://127.0.0.1:5500/public';
        this.models = {}
    }
    updateView(component) {
        try {
            return Mustache.render(component.template, component);
        } catch (error) {
            console.error(error);
        }
    }
    addList(name, data) {
        this.models[name].list.push(data);
        this.setLocalStorage(name);
    }
    async apiTemplate(url) {
        const response = await fetch(url);
        return response.text();
    }
    async apiData(url) {
        const response = await fetch(url);
        return response.json();
    }
    setModel(name) {
        this.models[name] = {}
    }
    setMessage(div, msg) {
        div.innerHTML = msg.map(msg => this.templateOfMessage(msg)).join('');
        setTimeout(() => {
            div.innerHTML = ''
        }, 5000);

    }
    templateOfMessage(msg) {
        let setColor = {
            success: 'w3-pale-green w3-border-green',
            danger: 'w3-pale-red w3-border-red',
            info: 'w3-pale-blue w3-border-blue',
            warning: 'w3-pale-yellow w3-border-yellow',
        }

        return `
            <div class="w3-panel">
                <div class="w3-padding-large w3-round-large w3-leftbar w3-display-container ${setColor[msg.type]}">
                    <button class="w3-button w3-text-red w3-display-topright w3-large" onclick="w3_close(this)">&times;</button>
                    <div class="w3-xlarge">${msg.title}</div>
                    <div class="w3-opacity-min">${msg.text}</div>
                </div>
            </div>
        `;
    }
    setLocalStorage(name) {
        let data = this.models[name].list;
        localStorage.setItem(name, JSON.stringify(data));
    }
    getLocalStorage(name) {
        let data = localStorage.getItem(name)
        if (data) {
            this.models[name].list = JSON.parse(data);
        } else {
            this.models[name].list = []
        }

    }
    getNewIdList(name) {
        if (this.models[name].list.length == 0) {
            return 1;
        } else {
            let max = 0;
            this.models[name].list.forEach(el => {
                if (el.id > max) {
                    max = el.id
                }
            });
            return max + 1;
        }
    }
}