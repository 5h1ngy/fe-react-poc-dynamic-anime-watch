'use strict';

const fs = require('fs');
const paths = require('../shared/paths');
const getClientEnvironment = require('../shared/environment');

class Shared {
    static isEnvDevelopment;
    static isEnvProduction;
    static isEnvProductionProfile;
    // Source maps are resource heavy and can cause out of memory issue for large source files.
    static shouldUseSourceMap;


    // Check if TypeScript is setup
    static useTypeScript;

    // We will provide `paths.publicUrlOrPath` to our app
    // as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
    // Omit trailing slash as %PUBLIC_URL%/xyz looks better than %PUBLIC_URL%xyz.
    // Get environment variables to inject into our app.
    static env;
    static shouldUseReactRefresh;

    static emitErrorsAsWarnings;

    static hasJsxRuntime = (() => {
        if (process.env.DISABLE_NEW_JSX_TRANSFORM === 'true') return false;

        try {
            require.resolve('react/jsx-runtime');
            return true;
        } catch (error) {
            return false;
        }
    })();

    static init(webpackEnv) {
        Shared.isEnvDevelopment = webpackEnv === 'development';
        Shared.isEnvProduction = webpackEnv === 'production';
        Shared.isEnvProductionProfile = Shared.isEnvProduction && process.argv.includes('--profile');
        // Source maps are resource heavy and can cause out of memory issue for large source files.
        Shared.shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';
        // Check if TypeScript is setup
        Shared.useTypeScript = fs.existsSync(paths.appTsConfig);
        Shared.env = getClientEnvironment(paths.publicUrlOrPath.slice(0, -1));
        Shared.shouldUseReactRefresh = Shared.env.raw.FAST_REFRESH;
        Shared.emitErrorsAsWarnings = process.env.ESLINT_NO_DEV_ERRORS === 'true';
    }
}

module.exports = Shared;