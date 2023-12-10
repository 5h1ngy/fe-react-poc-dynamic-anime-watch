import React from "react";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { ChakraProvider } from '@chakra-ui/react'

import routes from 'app/routes';
import store from 'app/store';

const App = () => (
  <ChakraProvider>
    <Provider store={store}>
      <RouterProvider router={routes} />
    </Provider>
  </ChakraProvider>
);

export default App;
