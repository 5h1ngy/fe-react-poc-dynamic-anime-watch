'use strict';

const fs = require('fs');

const paths = require('../shared/paths');
const utils = require('./utils');
const Shared = require('./Shared');

class Cache {
    get config() {
        return {
            type: 'filesystem',
            version: utils.createEnvironmentHash(Shared.env.raw),
            cacheDirectory: paths.appWebpackCache,
            store: 'pack',
            buildDependencies: {
                defaultWebpack: ['webpack/lib/'],
                config: [__filename],
                tsconfig: [paths.appTsConfig, paths.appJsConfig].filter(f => fs.existsSync(f)),
            },
        }
    }
}

module.exports = Cache