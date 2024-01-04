import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from 'app';
import reportWebVitals from './reportWebVitals';

localStorage.setItem('chakra-ui-color-mode', 'dark');

/**
 * The root DOM element where the React application will be mounted.
 *
 * @type {HTMLElement}
 */
const rootElement = document.getElementById('root');

/**
 * Create a root for ReactDOM to render the React application.
 *
 * @type {ReactDOM.Root}
 */
const root = ReactDOM.createRoot(rootElement);

/**
 * Render the main application component inside the created root.
 *
 * @param {React.ReactElement} element - The React element to be rendered.
 */
const renderApp = (element) => {
  root.render(element);
};

// Render the main application component (App) inside the created root.
renderApp(<App />);

/**
 * If you want to start measuring performance in your app, pass a function
 * to log results (for example: reportWebVitals(console.log))
 * or send to an analytics endpoint.
 * Learn more: https://bit.ly/CRA-vitals
 */
reportWebVitals();
