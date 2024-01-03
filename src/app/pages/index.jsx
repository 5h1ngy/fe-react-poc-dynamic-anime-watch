import { createBrowserRouter } from 'react-router-dom';

import template from 'data/layout.template';
import Template from 'lib-react-glayouts/Template';

import newest from './newest';
import favorites from './favorites';
import toWatch from './toWatch';

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
            toWatch,
        ]
    }
];

const BrowserRouter = createBrowserRouter(routes);

export default BrowserRouter;
