'use strict';

const path = require('path');
const fs = require('fs');
const getPublicUrlOrPath = require('react-dev-utils/getPublicUrlOrPath');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebook/create-react-app/issues/637
const APP_DIRECTORY = fs.realpathSync(process.cwd());

// Default build path or use the one specified in the environment variables.
const APP_BUILD_PATH = process.env.BUILD_PATH || 'build';

/**
 * Estensioni di file per i moduli.
 * @type {string[]}
 */
const MODULE_FILE_EXTENSION = ['web.mjs', 'mjs', 'web.js', 'js', 'web.ts', 'ts', 'web.tsx', 'tsx', 'json', 'web.jsx', 'jsx'];

/**
 * Ottiene il percorso reale dell'applicazione risolvendo eventuali symlink.
 * @param {string} relativePath - Percorso relativo da risolvere.
 * @returns {string} - Percorso reale risolto.
 */
function resolveApp(relativePath) {
  return path.resolve(APP_DIRECTORY, relativePath);
}

/**
 * Risolve i percorsi dei file nell'ordine in cui webpack li risolverebbe.
 * @param {Function} resolveFn - Funzione di risoluzione del percorso.
 * @param {string} filePath - Percorso del file da risolvere.
 * @returns {string} - Percorso reale risolto del file.
 */
function resolveModule(resolveFn, filePath) {
  const extension = MODULE_FILE_EXTENSION.find(extension =>
    fs.existsSync(resolveFn(`${filePath}.${extension}`))
  );

  if (extension) {
    return resolveFn(`${filePath}.${extension}`);
  }

  return resolveFn(`${filePath}.js`);
};

// Configurazione dopo l'eject: siamo in ./config/
module.exports = {
  dotenv: resolveApp('env'),
  appPath: resolveApp('.'),
  appEntry: resolveApp('src/app'),
  appData: resolveApp('src/data'),
  appPackageCommon: resolveApp('src/packages/common'),
  appPackageComponents: resolveApp('src/packages/components/src/components'),
  appPackageHocs: resolveApp('src/packages/hocs'),
  appPackageLayouts: resolveApp('src/packages/layouts'),
  appBuild: resolveApp(APP_BUILD_PATH),
  appPublic: resolveApp('src/public'),
  appHtml: resolveApp('src/public/index.html'),
  appIndexJs: resolveModule(resolveApp, 'src/index'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  appTsConfig: resolveApp('tsconfig.json'),
  appJsConfig: resolveApp('jsconfig.json'),
  yarnLockFile: resolveApp('yarn.lock'),
  testsSetup: resolveModule(resolveApp, 'src/setupTests'),
  proxySetup: resolveApp('src/setupProxy.js'),
  appNodeModules: resolveApp('node_modules'),
  appWebpackCache: resolveApp('node_modules/.cache'),
  appTsBuildInfoFile: resolveApp('node_modules/.cache/tsconfig.tsbuildinfo'),
  swSrc: resolveModule(resolveApp, 'src/service-worker'),
  // We use `PUBLIC_URL` environment variable or "homepage" field to infer
  // "public path" at which the app is served.
  // webpack needs to know it to put the right <script> hrefs into HTML even in
  // single-page apps that may serve index.html for nested URLs like /todos/42.
  // We can't use a relative path in HTML because we don't want to load something
  // like /todos/42/static/js/bundle.7289d.js. We have to know the root.
  publicUrlOrPath: getPublicUrlOrPath(
    process.env.NODE_ENV === 'development',
    require(resolveApp('package.json')).homepage,
    process.env.PUBLIC_URL
  ),
};

/**
 * Estensioni di file per i moduli.
 * @type {string[]}
 */
module.exports.moduleFileExtensions = MODULE_FILE_EXTENSION;
