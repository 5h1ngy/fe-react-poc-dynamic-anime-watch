import { createBrowserRouter } from 'react-router-dom';

import template from 'data/layout.template.json';
import Template from 'app/layouts/Template';

import newest from './newest';
import favorties from './favorties';

const routes = [
    {
        id: "root",
        path: "/",
        element: <Template />,
        errorElement: <></>,
        loader: () => ({ template }),
        children: [
            newest,
            favorties,
        ]
    }
];

const BrowserRouter = createBrowserRouter(routes);

export default BrowserRouter;
