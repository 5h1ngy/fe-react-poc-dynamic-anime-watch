import { createBrowserRouter } from 'react-router-dom';

import template from 'data/layout.template';
import Template from 'app/layouts/Template';

import newest from './newest';
import favorites from './favorites';

const routes = [
    {
        id: "root",
        path: "/",
        element: <Template />,
        errorElement: <></>,
        loader: () => ({ template }),
        children: [
            newest,
            favorites,
        ]
    }
];

const BrowserRouter = createBrowserRouter(routes);

export default BrowserRouter;
