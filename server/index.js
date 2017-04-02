/**
 * Module dependencies.
 */

const debug = require('debug')('app:server');
const config = require('./config');
const express = require('express');

const app = express();

app.set('configuration', config);
const configuration = app.get('configuration');
const env = process.env.NODE_ENV || 'development';

/**
 * Define Active Routes
 */

const apps = [
  'datahub',
];


/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }
  return false;
}


/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || configuration.api_port || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = app.listen(app.get('port'), '0.0.0.0', () => {
  /* eslint-disable no-console*/
  console.log(`API Server listening on port ${server.address().port}`);
  console.log(`MODE : ${env}`);
  /* eslint-enable no-console*/
  debug(`Express server listening on port ${server.address().port}`);
});

// register responses
require('./responses/index').forEach((response) => {
  app.use(response);
});

/**
 * Prepare to process routes
 */

// extend app for route object mapping
app.map = (a, route) => {
  const r = route || '';

  Object.keys(a).forEach((key) => {
    if (Array.isArray(a[key])) {
      app[key](r, a[key]);
    } else if (typeof a[key] === 'object') {
      app.map(a[key], r + key);
    } else if (typeof a[key] === 'function') {
      app[key](r, a[key]);
    }
  });
};

apps.forEach((application) => {
  debug('Importing app : ', application);
  /* eslint-disable import/no-dynamic-require*/
  /* eslint-disable global-require*/
  app.map(require(`./apps/${application}/routes.js`));
  /* eslint-enable import/no-dynamic-require*/
  /* eslint-enable global-require*/
  // passport.map(require('./apps/' + application + '/routes.js'));
  debug('Importing end app : ', application);
});


// catch 404
app.use((req, res) => {
  res.notFound();
});

// catch 5xx
app.use((err, req, res, next) => {
  debug(err);
  res.serverError();
});

// Export App for Testing purposes
module.exports = app;

