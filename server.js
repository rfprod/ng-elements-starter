'use strict';

/**
 * Server module
 * @module server
 */

/**
 * @name bodyParser
 * @constant
 * @summary Body parser
 * @description Body parser for Express server
 */
const bodyParser = require('body-parser');
/**
 * @name compression
 * @constant
 * @summary Compression for Express server
 * @description Compression for Express server
 */
const compression = require('compression');
/**
 * @name express
 * @constant
 * @summary Express server
 * @description Express server
 */
const express = require('express');
/**
 * @name app
 * @constant
 * @summary Express application
 * @description Express application
 */
const app = express();

/**
 * Set process title so that it's easier to indentify process and kill it.
 */
process.title = 'ng2elements';

/**
 * @name cwd
 * @constant
 * @summary Current directory of the main Server script - server.js
 * @description Correct root path for all setups, it should be used for all file references for the server and its modules like filePath: cwd + '/actual/file.extension'. Built Electron app contains actual app in resources/app(.asar) subdirectory, so it is essential to prefer __dirname usage over process.cwd() to get the value.
 */
const cwd = __dirname;

/**
 * @name routes
 * @constant
 * @summary Express server Routes
 * @description Express server Routes
 * @see {@link module:server/routes/index}
 */
const routes = require(`${cwd}/server/routes/index.js`);

/**
 * Use compression for all responses.
 */
app.use(
  compression({
    threshold: 0,
    level: -1,
  }),
);

const devServer = process.argv[2] === 'dev';

if (!devServer) {
  console.log('server started in production mode, without "dev" argument , serving dists');
  /**
   * Serve ngd graphs.
   */
  app.use('/', express.static(cwd + '/dist'));
  console.log('serving ngd dist\n - webapp path: /ngd\n - dist path: /ngd\n');

  /**
   * Elements' dists.
   */
  const elements = ['app', 'passport', 'balance', 'catalogue', 'orders'];
  for (const [index, value] of elements.entries()) {
    const webappPath = value === 'app' ? '/' : `/ng-elements-${value}`;
    const distPath = `/dist/ng-elements-${value}`;
    console.log(
      `serving dist ${index}. ${value}:\n - webapp path: ${webappPath}\n - dist path: ${distPath}\n`,
    );
    app.use(webappPath, express.static(cwd + distPath));
  }

  /**
   * Paths regex object that should be passed by the server as is, without path substitution.
   */
  const regX = {
    filesAndFolders: /(assets|txt|ico|html|css|js)/,
    coverage: /(coverage)/,
    documentation: /(documentation)/,
    api: /(auth|register|balance|catalogue|graphql)/,
  };

  /**
   * Serving paths.
   */
  const pathRegX = {
    passport: /ng-elements-passport/,
    balance: /ng-elements-balance/,
    catalogue: /ng-elements-catalogue/,
    orders: /ng-elements-orders/,
  };

  /**
   * Serving conditions.
   */
  const serve = {
    next: req =>
      regX.filesAndFolders.test(req.path) ||
      regX.api.test(req.path) ||
      regX.coverage.test(req.path) ||
      regX.documentation.test(req.path),
    passport: req => pathRegX.passport.test(req.path),
    balance: req => pathRegX.balance.test(req.path),
    catalogue: req => pathRegX.catalogue.test(req.path),
    orders: req => pathRegX.orders.test(req.path),
  };

  /**
   * Serve app index file for paths excluding provided in regX object (see above).
   */
  app.use((req, res, next) => {
    if (serve.next(req)) {
      return next();
    } else if (serve.passport(req)) {
      res.sendFile(cwd + '/dist/ng-elements-passport/index.html');
    } else if (serve.balance(req)) {
      res.sendFile(cwd + '/dist/ng-elements-balance/index.html');
    } else if (serve.catalogue(req)) {
      res.sendFile(cwd + '/dist/ng-elements-catalogue/index.html');
    } else if (serve.orders(req)) {
      res.sendFile(cwd + '/dist/ng-elements-orders/index.html');
    } else {
      res.sendFile(cwd + '/dist/ng-elements-app/index.html');
    }
  });
} else {
  console.log('server started with "dev" argument, not serving dists');
}

/**
 * Request parameters middleware.
 */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**
 * Headers config for all Express routes.
 */
app.all('/*', function (req, res, next) {
  // CORS headers
  res.header('Access-Control-Allow-Origin', '*'); // restrict it to the required domain if needed
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  // add headers to be exposed
  res.header('Access-Control-Expose-Headers', 'Views');
  // cache control
  res.header('Cache-Control', 'public, no-cache, no-store, must-ravalidate, max-age=0');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  // handle OPTIONS method
  if (req.method == 'OPTIONS') res.status(200).end();
  else next();
});

/** Call app routes. */
routes(app);

/**
 * @function terminator
 * @summary Terminator function
 * @description Terminates application
 */
function terminator(sig) {
  if (typeof sig === 'string') {
    console.log(`\n${Date(Date.now())}: Received signal ${sig} - terminating app...\n`);
    process.exit(0);
    console.log(`${Date(Date.now())}: Node server stopped`);
  }
}

/**
 * Termination handlers.
 */
(() => {
  process.on('exit', () => {
    terminator('exit');
  });
  [
    'SIGHUP',
    'SIGINT',
    'SIGQUIT',
    'SIGILL',
    'SIGTRAP',
    'SIGABRT',
    'SIGBUS',
    'SIGFPE',
    'SIGUSR1',
    'SIGSEGV',
    'SIGUSR2',
    'SIGTERM',
  ].forEach(element => {
    process.on(element, () => {
      terminator(element);
    });
  });
})();

/**
 * @name port
 * @summary Application port
 * @description Application port
 */
const port = 8080;

/**
 * Start application without explicit definition of ip address it should use.
 */
app.listen(port, () => {
  console.log(`\n# > START > Node.js listening on port ${port}...\n`);
});
