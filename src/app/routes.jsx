import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import template from 'data/page.template.json';

import Template from 'app/pages/Template';
import Newest from 'app/containers/Newest';

/**
 * Definition of application routes using react-router-dom's createBrowserRouter.
 *
 * @typedef {object} Route
 * @property {string} id - Unique identifier for the route.
 * @property {string} path - URL path for the route.
 * @property {React.ReactNode} element - React component to render for the route.
 * @property {React.ReactNode} errorElement - React component to render in case of an error.
 * @property {Function} loader - Function to load data for the route.
 * @property {Array<Route>} children - Child routes nested under the current route.
 */

/**
 * Main configuration for the application routes.
 *
 * @type {Array<Route>}
 */
const routes = [
    {
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
];

/**
 * Create the browser router with the specified routes configuration.
 *
 * @type {Function}
 * @returns {React.ComponentType} The configured browser router component.
 */
const BrowserRouter = createBrowserRouter(routes);

export default BrowserRouter;
