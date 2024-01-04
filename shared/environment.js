'use strict';

const fs = require('fs');
const path = require('path');
const paths = require('./paths');

// Make sure that including paths.js after env.js will read .env variables.
// Cancella la cache del modulo di paths.js per assicurarsi che la lettura delle variabili .env avvenga correttamente.
delete require.cache[require.resolve('./paths')];

// Ottiene il valore della variabile d'ambiente NODE_ENV e lancia un errore se non è definito.
const NODE_ENV = process.env.NODE_ENV;
if (!NODE_ENV) throw new Error('The NODE_ENV environment variable is required but was not specified.');

// Lista di file .env* da considerare in ordine.
const DOT_ENV_FILES = [
  // Non includere `.env.local` per l'ambiente `test`
  // poiché normalmente ci si aspetta che i test producano gli stessi
  // risultati per tutti
  NODE_ENV !== 'test' && path.resolve(paths.dotenv, `local`),
  path.resolve(paths.dotenv, `.env.${NODE_ENV}`),
].filter(Boolean);

// Carica le variabili d'ambiente dai file .env*.
DOT_ENV_FILES.forEach(dotenvFile => {
  if (fs.existsSync(dotenvFile)) require('dotenv-expand').expand(require('dotenv').config({ path: dotenvFile }));
});

// Supporta la risoluzione dei moduli in base a `NODE_PATH`.
// Questo consente l'uso di percorsi assoluti negli import all'interno di grandi monorepos:
// https://github.com/facebook/create-react-app/issues/253.
// Funziona in modo simile a `NODE_PATH` in Node stesso:
// https://nodejs.org/api/modules.html#modules_loading_from_the_global_folders
// Nota che, a differenza di Node, sono onorati solo i percorsi *relativi* da `NODE_PATH`.
// Altrimenti, rischiamo di importare moduli core di Node.js in un'applicazione invece che shim di webpack.
// https://github.com/facebook/create-react-app/issues/1023#issuecomment-265344421
// Li risolviamo anche per assicurarci che tutti gli strumenti che li utilizzano funzionino in modo coerente.
process.env.NODE_PATH = (process.env.NODE_PATH || '')
  .split(path.delimiter)
  .filter(folder => folder && !path.isAbsolute(folder))
  .map(folder => path.resolve(paths.appPath, folder))
  .join(path.delimiter);

/**
 * Ottiene le variabili d'ambiente da esporre nell'applicazione.
 * @param {string} publicUrl - URL pubblico dell'applicazione.
 * @returns {Object} - Oggetto contenente le variabili d'ambiente grezze e stringificate.
 */
module.exports = function getClientEnvironment(publicUrl) {
  // Grab NODE_ENV and REACT_APP_* environment variables and prepare them to be
  // injected into the application via DefinePlugin in webpack configuration.
  const REACT_APP = /^REACT_APP_/i;

  // Variabili grezze iniziali.
  const rawInitial = {
    // Utile per determinare se stiamo eseguendo in modalità di produzione.
    // In particolare, imposta React nella modalità corretta.
    NODE_ENV: process.env.NODE_ENV || 'development',
    // Utile per risolvere il percorso corretto degli asset statici in `public`.
    // Ad esempio, <img src={process.env.PUBLIC_URL + '/img/logo.png'} />.
    // Dovrebbe essere utilizzato solo come via di fuga. Normalmente si mettono
    // le immagini in `src` e le si importano nel codice per ottenere i loro percorsi.
    PUBLIC_URL: publicUrl,
    // Supporta la configurazione del percorso sockjs durante lo sviluppo.
    // Queste impostazioni permettono a un sviluppatore di eseguire progetti multipli simultaneamente.
    // Sono utilizzati come `hostname`, `pathname` e `port` di connessione in webpackHotDevClient.
    // Sono utilizzati come opzioni `sockHost`, `sockPath`
    // e `sockPort` in webpack-dev-server.
    WDS_SOCKET_HOST: process.env.WDS_SOCKET_HOST,
    WDS_SOCKET_PATH: process.env.WDS_SOCKET_PATH,
    WDS_SOCKET_PORT: process.env.WDS_SOCKET_PORT,
    // Se react-refresh è abilitato o meno.
    // Viene definito qui in modo che sia disponibile in webpackHotDevClient.
    FAST_REFRESH: process.env.FAST_REFRESH !== 'false',
  };

  // Variabili grezze ottenute dalle variabili d'ambiente con prefisso REACT_APP_.
  const raw = Object.keys(process.env)
    .filter(key => REACT_APP.test(key))
    .reduce((env, key) => {
      env[key] = process.env[key];
      return env;
    }, rawInitial);

  // Stringifica tutti i valori in modo che possano essere inseriti in webpack DefinePlugin.
  const stringified = {
    'process.env': Object.keys(raw).reduce((env, key) => {
      env[key] = JSON.stringify(raw[key]);
      return env;
    }, {}),
  };

  return { raw, stringified };
};
