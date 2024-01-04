'use strict';

const path = require('path');
const paths = require('../shared/paths');
const Shared = require('./Shared');

class Output {
    get config() {
        return {
            // The build folder.
            path: paths.appBuild,
            // Add /* filename */ comments to generated require()s in the output.
            pathinfo: Shared.isEnvDevelopment,
            // There will be one main bundle, and one file per asynchronous chunk.
            // In development, it does not produce real files.
            filename: Shared.isEnvProduction
                ? 'static/js/[name].[contenthash:8].js'
                : Shared.isEnvDevelopment && 'static/js/bundle.js',
            // There are also additional JS chunk files if you use code splitting.
            chunkFilename: Shared.isEnvProduction
                ? 'static/js/[name].[contenthash:8].chunk.js'
                : Shared.isEnvDevelopment && 'static/js/[name].chunk.js',
            assetModuleFilename: 'static/media/[name].[hash][ext]',
            // webpack uses `publicPath` to determine where the app is being served from.
            // It requires a trailing slash, or the file assets will get an incorrect path.
            // We inferred the "public path" (such as / or /my-project) from homepage.
            publicPath: paths.publicUrlOrPath,
            // Point sourcemap entries to original disk location (format as URL on Windows)
            devtoolModuleFilenameTemplate: Shared.isEnvProduction
                ? info => path.relative(paths.appSrc, info.absoluteResourcePath).replace(/\\/g, '/')
                : Shared.isEnvDevelopment && (info => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')),
        }
    }
}

module.exports = Output