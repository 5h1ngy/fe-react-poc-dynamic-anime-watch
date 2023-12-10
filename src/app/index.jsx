import React from "react";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { ChakraProvider } from '@chakra-ui/react'

import routes from 'app/pages/routes.js';
import store from 'app/store.js';

const App = () => (
  <ChakraProvider>
    <Provider store={store}>
      <RouterProvider router={routes} />
    </Provider>
  </ChakraProvider>
);

export default App;
