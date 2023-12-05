import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import dynamicTable from "./home";

const routes = [];

routes.push({
    path: "/",
    element: <Navigate to={'/home'} />,
    errorElement: <></>,
})

routes.push(dynamicTable())

export default createBrowserRouter(routes);