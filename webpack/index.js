'use strict';

const paths = require('../shared/paths');

const Shared = require('./Shared');
const Output = require('./Output');
const Cache = require('./Cache');
const Optimization = require('./Optimization');
const Plugins = require('./Plugins');
const Module = require('./Module');
const Resolve = require('./Resolve');

// This is the production and development configuration.
// It is focused on developer experience, fast rebuilds, and a minimal bundle.
class Webpack {

  constructor(webpackEnv) {
    Shared.init(webpackEnv)
  }

  compile() {
    return {
      target: ['browserslist'],
      // Webpack noise constrained to errors and warnings
      stats: 'errors-warnings',
      mode: Shared.isEnvProduction
        ? 'production'
        : Shared.isEnvDevelopment && 'development',
      // Stop compilation early in production
      bail: Shared.isEnvProduction,
      devtool: Shared.isEnvProduction
        ? Shared.shouldUseSourceMap ? 'source-map' : false
        : Shared.isEnvDevelopment && 'cheap-module-source-map',
      // These are the "entry points" to our application.
      // This means they will be the "root" imports that are included in JS bundle.
      entry: paths.appIndexJs,
      output: new Output().config,
      cache: new Cache().config,
      infrastructureLogging: { level: 'none' },
      optimization: new Optimization().config,
      resolve: new Resolve().config,
      module: new Module().config,
      plugins: new Plugins().config,
      // Turn off performance processing because we utilize
      // our own hints via the FileSizeReporter
      performance: false,
    }
  }
}

module.exports = (webpackEnv) => {
  return new Webpack(webpackEnv);
}