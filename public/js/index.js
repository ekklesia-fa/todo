import { App } from '../../lib/core/App.js';
import { Router } from '../../lib/core/Router.js';

import { Home } from '../../lib/components/Home.js';
import { Todo } from '../../lib/components/Todo.js';

const app = new App({
    app: '#app',
    msg: '#msg'
});
const router = new Router(app);

router.addRoute(Home, 'home', 'indexView', '^#/$');
router.addRoute(Todo, 'todo', 'indexView', '^#/todo$');
router.addRoute(Todo, 'todo', 'indexView', '^#/todos/([/a-zA-Z0-9]+)$');
router.addRoute(Todo, 'todo', 'addView', '^#/todo/add$');