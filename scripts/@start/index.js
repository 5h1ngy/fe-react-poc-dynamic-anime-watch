'use strict';
// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

const chalk = require('react-dev-utils/chalk');
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');
const { choosePort } = require('react-dev-utils/WebpackDevServerUtils');
// We require that you explicitly set browsers and do not fall back to
// browserslist defaults.
const { checkBrowsers } = require('react-dev-utils/browsersHelper');
require('module-alias/register');

// const moduleAlias = require('module-alias')
// Or multiple aliases
// moduleAlias.addAliases({
//   '@root'  : __dirname,
//   '@client': __dirname + '/src/client',
// })

const paths = require('@shared/paths');
const middleware = require('./middleware');
const { HOST, IS_INTERACTIVE } = require('./utils');

// Tools like Cloud9 rely on this.
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => { throw err });

// Warn and crash if required files are missing
if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) process.exit(1);

if (process.env.HOST) {
  console.log(chalk.cyan(`Attempting to bind to HOST environment variable: ${chalk.yellow(chalk.bold(process.env.HOST))}`));
  console.log(`If this was unintentional, check that you haven't mistakenly set it in your shell.`);
  console.log(`Learn more here: ${chalk.yellow('https://cra.link/advanced-config')}`);
  console.log('\n');
}

checkBrowsers(paths.appPath, IS_INTERACTIVE)
  // We attempt to use the default port but if it is busy, we offer the user to
  // run on a different port. `choosePort()` Promise resolves to the next free port.
  .then(() => choosePort(HOST, DEFAULT_PORT))
  .then(middleware.callbackRun)
  .catch(middleware.handleError);
