import template from 'data/page.template.json';
import Template from 'app/layouts/Template';

import Newest from "./containers/NewestContainer.js";
import store from './store.js';

const route = {
    id: "root",
    path: "/",
    element: <Template />,
    errorElement: <></>,
    loader: () => ({ template }),
    children: [
        {
            id: "newest",
            path: 'newest',
            element: <Newest />,
            errorElement: <></>,
        }
    ]
}

export { store }
export default route;