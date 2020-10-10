import DateTime from '../core/DateTime.js';
import { Controller } from '../core/Controller.js';
export class Todo extends Controller {
    constructor(app) {
        super()
        this.name = app.name;
        this.params = app.params;
        this.appElement = app.appElement;
        this.msgElement = app.msgElement;
        this.setModel(this.name);
        this.getLocalStorage(this.name);
    }
    async indexView() {
        this.models[this.name].template = await this.apiTemplate(`../lib/views/${this.name}/index.html`);
        this.appElement.innerHTML = this.updateView(this.models[this.name]);

        // variable filter
        let filterSearch = document.querySelector('#filterSearch');
        let textFilterDiv = document.getElementById('textFilterDiv');
        let resultFilter = document.getElementById('resultFilter');


        let objFilter = {};
        objFilter.prior = ['low', 'middle', 'high'];
        objFilter.priorLow = true;
        objFilter.priorMiddle = true;
        objFilter.priorHigh = true;

        let cbPriorLow = document.getElementById('cbPriorLow');
        cbPriorLow.addEventListener('change', (e) => {
            objFilter.priorLow = e.target.checked;
            setFilterPrior(objFilter.priorLow, 'low');
        });

        let cbPriorMiddle = document.getElementById('cbPriorMiddle');
        cbPriorMiddle.addEventListener('change', (e) => {
            objFilter.priorMiddle = e.target.checked;
            setFilterPrior(objFilter.priorMiddle, 'middle');
        });

        let cbPriorHigh = document.getElementById('cbPriorHigh');
        cbPriorHigh.addEventListener('change', (e) => {
            objFilter.priorHigh = e.target.checked;
            setFilterPrior(objFilter.priorHigh, 'high');
        });

        function setFilterPrior(obj, val) {
            if (obj) {
                objFilter.prior.push(val);
            } else {
                const arr = objFilter.prior.filter(el => el != val)
                objFilter.prior = arr;
            }
            updateListTodoByValue(objFilter);
        }



        // filter

        filterSearch.addEventListener('keyup', (e) => {
            let keyword = e.target.value.toUpperCase();
            textFilterDiv.innerHTML = `<span>Filter : </span><span class="w3-tag w3-blue">${keyword}</span>`
            updateListTodo(keyword);
        });

        function updateListTodoByValue(objFilter) {
            let ul = document.getElementById('listTodo');
            let li = ul.getElementsByTagName('li');
            for (let i = 0; i < li.length; i++) {
                let value = li[i].dataset.prior == objFilter.prior[0] || li[i].dataset.prior == objFilter.prior[1] || li[i].dataset.prior == objFilter.prior[2]
                if (value) {
                    li[i].style.display = ''
                    li[i].setAttribute('data-found', '');
                } else {
                    li[i].removeAttribute('data-found', '');
                    li[i].style.display = 'none'
                }
            }
            let rowCount = ul.querySelectorAll('[data-found]');
            resultFilter.innerHTML = 'Result : <strong>' + rowCount.length + '</strong> from ' + li.length + ' rows';
        }

        function updateListTodo(keyword) {
            let ul = document.getElementById('listTodo');
            let li = ul.getElementsByTagName('li');
            for (let i = 0; i < li.length; i++) {
                let textValue = li[i].innerText.toUpperCase();
                if (textValue.indexOf(keyword) > -1) {
                    li[i].style.display = ''
                    li[i].setAttribute('data-found', '');
                } else {
                    li[i].removeAttribute('data-found', '');
                    li[i].style.display = 'none'
                }
            }
            let rowCount = ul.querySelectorAll('[data-found]');
            resultFilter.innerHTML = 'Result : <strong>' + rowCount.length + '</strong> from ' + li.length + ' rows';
        }


        const ulx = document.querySelectorAll('ul li');
        ulx.forEach(el => {
            el.classList.replace('low', 'w3-border-green');
            el.classList.replace('middle', 'w3-border-orange');
            el.classList.replace('high', 'w3-border-red');
        })

    }
    async addView() {
        this.models[this.name].template = await this.apiTemplate(`../lib/views/${this.name}/add.html`);
        this.appElement.innerHTML = this.updateView(this.models[this.name]);

        //form add
        const form = document.forms['formAdd'];
        // console.dir(form.elements);
        const d = new Date();
        form['deadline-date'].valueAsDate = d;
        form['deadline-date'].min = DateTime.dateMin();
        form['deadline-time'].value = DateTime.timeNow();

        form['looping'].addEventListener('change', (e) => {
            e.target.value = (e.target.checked) ? 'true' : 'false';
        });


        for (const i of form.elements) {
            i.addEventListener('blur', (e) => {
                let next = e.target.nextElementSibling;
                if (next.tagName == 'SMALL') {
                    next.className = '';
                    if (e.target.validity.valid) {
                        next.innerText = 'Ok !!!';
                        next.classList.add('w3-text-green');
                    } else {
                        next.innerText = e.target.validationMessage;
                        next.classList.add('w3-text-red');
                    }
                }
            });
        }
        let data = {}
        form.addEventListener('submit', e => {
            e.preventDefault();
            this.getLocalStorage(this.name);
            data.id = this.getNewIdList(this.name);
            for (const i of e.target) {
                (i.name != "") ? data[i.name] = i.value: '';
            }
            data.timestamp = new Date();
            this.addList(this.name, data);
            this.setMessage(this.msgElement, [{
                type: 'success',
                title: 'Congratullations !!!',
                text: 'Successfully adding new todo :)'
            }]);
            form.reset();
        })


    }
}