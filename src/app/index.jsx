import React from "react";
import { RouterProvider } from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react'

import routes from 'app/routes';

/**
 * Main application component.
 *
 * This component sets up the ChakraProvider for styling and
 * the RouterProvider for managing application routes.
 *
 * @component
 * @returns {React.ReactNode} The JSX for the main application.
 */
const App = () => (
  // Wrap the entire application with ChakraProvider for styling.
  <ChakraProvider>
    {/** Router Provider */}
    {/* Use RouterProvider to manage application routes with the specified routes object. */}
    <RouterProvider router={routes} />
  </ChakraProvider>
);

export default App;
