import React from "react";

import { Provider } from 'react-redux'
import { RouterProvider } from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react'

import { store } from 'store';
import routes from 'routes';


const App = () => (
  <Provider store={store}>
    <ChakraProvider>
      {/** Router Provider */}
      <RouterProvider router={routes} />
    </ChakraProvider>
  </Provider>
);

export default App;