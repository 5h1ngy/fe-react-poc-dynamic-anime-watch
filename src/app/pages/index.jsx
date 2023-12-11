import { createBrowserRouter } from 'react-router-dom';

import template from 'data/layout.template.json';
import Template from 'app/layouts/Template';

import newest from './newest';

const routes = [
    {
        id: "root",
        path: "/",
        element: <Template />,
        errorElement: <></>,
        loader: () => ({ template }),
        children: [
            newest,
        ]
    }
];

const BrowserRouter = createBrowserRouter(routes);

export default BrowserRouter;
