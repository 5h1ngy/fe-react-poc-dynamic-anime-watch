/**
 * A function for reporting web vital metrics.
 *
 * @param {function} onPerfEntry - Callback function to receive web vital data.
 */
const reportWebVitals = onPerfEntry => {
  // Check if onPerfEntry is a function before importing web-vitals
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // Dynamically import web-vitals to reduce initial bundle size
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      // Call the appropriate functions from web-vitals and pass the callback
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
