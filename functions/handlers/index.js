'use strict';

/**
 * @name jwt-methods
 * @constant
 * @summary JWT methods
 * @description Methods to work with json web tokens
 */
const jwtMethods = require('../helpers/jwt-methods.js');

/**
 * @name fs
 * @constant
 * @summary File system module
 * @description Provide file system access
 */
const fs = require('fs');

/**
 * @name cwd
 * @constant
 * @summary Current directory of the main Server script - server.js
 * @description Correct root path for all setups, it should be used for all file references for the server and its modules like filePath: cwd + '/actual/file.extension'. Built Electron app contains actual app in resources/app(.asar) subdirectory, so it is essential to prefer __dirname usage over process.cwd() to get the value.
 */
const cwd = __dirname;

/**
 * Returns token object with payload
 * @param {String} email user email
 * @param {String} name user name
 * @param {String} organization user organization
 */
function getTokenWithPayload(email, name, organization) {
  let expires = new Date();
  expires.setDate(expires.getDate() + 7); // expires in one week unless revoked
  const payload = { email, name, organization, expires };
  return jwtMethods.generateJWToken(payload);
}

/**
 * Returns random counter value.
 * @param {Number} from min value
 * @param {Number} to max value
 * @param {Number} fixedFactor fixed factor
 */
function getRandomCounterValue(from = 10, to = 99, fixedFactor = 0) {
  const num = (Math.random() * (to - from) + from).toFixed(fixedFactor) * 1;
  return num;
}

/**
 * Server http handlers module.
 * For usage in express server and in cloud functions.
 */
module.exports = {
  /**
   * Handles user login.
   */
  login: (req, res) => {
    const email = req.body.email || '';
    const name = 'dummy username';
    const organization = 'dummy organization';
    const password = req.body.password || '';
    if (email && password) {
      const tokenObject = getTokenWithPayload(email, name, organization);
      res.status(200).json({
        email,
        name,
        organization,
        token: tokenObject.token,
      });
    } else {
      let missingParams = email ? '' : 'email';
      missingParams += password ? '' : ', password';
      res.status(400).json({ error: `Missing mandatory request parameters: ${missingParams}` });
    }
  },

  /**
   * Handles user signup.
   */
  signup: (req, res) => {
    const email = req.body.email || '';
    const name = req.body.name || '';
    const organization = req.body.organization || '';
    const password = req.body.password || '';
    if (name === 'exists') {
      res.status(409).json({ error: 'User exists' });
    } else if (email && name && organization && password) {
      const tokenObject = getTokenWithPayload(email, name, organization);
      res.status(200).json({
        email,
        name,
        organization,
        token: tokenObject.token,
      });
    } else {
      let missingParams = email ? '' : 'email';
      missingParams += name ? '' : ', name';
      missingParams += password ? '' : ', password';
      res.status(400).json({ error: `Missing mandatory request parameters: ${missingParams}` });
    }
  },

  /**
   * Handles user balance.
   */
  balance: (req, res) => {
    const token = req.query.token || '';
    if (token) {
      res.status(200).json({
        organization: 'name',
        sum1: getRandomCounterValue(),
        sum2: getRandomCounterValue(),
        sum3: getRandomCounterValue(),
        sum4: getRandomCounterValue(),
      });
    } else {
      res.status(400).json({ error: 'Missing mandatory request parameters: token' });
    }
  },

  /**
   * Handles items catalog.
   */
  catalog: (req, res) => {
    const token = req.query.token || '';
    if (token) {
      const catalog = Array.apply(null, Array(5))
        .map(String.prototype.valueOf, 'catalog item ')
        .map((item, index) => item + index);
      res.status(200).json(catalog);
    } else {
      res.status(400).json({ error: 'Missing mandatory request parameters: token' });
    }
  },

  /**
   * Handles orders listing.
   */
  orders: (req, res) => {
    const token = req.query.token || '';
    if (token) {
      const orders = Array.apply(null, Array(5))
        .map(Object.prototype.valueOf, {
          id: 'ORDER-ID-',
          status: 'status-',
          date: new Date().toISOString(),
          goods: Array.apply(null, Array(2))
            .map(String.prototype.valueOf, 'goods item ')
            .map((item, index) => item + index),
          sum: 0,
        })
        .map((item, index) => {
          item.id += index;
          item.status += index;
          item.goods = Array.apply(null, Array(1 + index))
            .map(String.prototype.valueOf, 'goods item ')
            .map((item1, index1) => item1 + index1);
          item.sum = getRandomCounterValue();
          return item;
        });
      res.status(200).json(orders);
    } else {
      res.status(400).json({ error: 'Missing mandatory request parameters: token' });
    }
  },

  widget: (req, res) => {
    const name = req.query.name || '';

    let metadata = {
      name,
      environment: 'express',
      assets: {
        element: `<${name} class="mat-typography"></${name}>`,
        stylesheet: '',
        runtime: '',
        polyfills: '',
        scripts: '',
        venor: '',
        main: '',
      },
    };

    let widgetDistPath = `${cwd}/../../dist/${name}/`;
    let widgetDistIndexFilePath = `${cwd}/../../dist/${name}/index.html`;

    /**
     * Firebase configuration.
     */
    const firebaseConfig = process.env.FIREBASE_CONFIG;
    if (firebaseConfig) {
      metadata.environment = 'firebase';
      res
        .status(501)
        .json({ error: 'Getting widget metadata is not implemented in firebase yet.', metadata });
    } else {
      const distExists = fs.existsSync(widgetDistIndexFilePath);

      if (distExists) {
        const files = fs.readdirSync(widgetDistPath);
        const host = `${req.protocol}://${req.headers.host}`;
        const distServePath = `${host}/${name}`;
        const stylesheet = files.find(fileName => /styles\.[a-z0-9]+\.css/.test(fileName));
        metadata.assets.stylesheet = `${distServePath}/${stylesheet}`;
        const runtime = files.find(fileName => /runtime-es2015\.[a-z0-9]+\.js/.test(fileName));
        metadata.assets.runtime = `${distServePath}/${runtime}`;
        const polyfills = files.find(fileName => /polyfills-es2015\.[a-z0-9]+\.js/.test(fileName));
        metadata.assets.polyfills = `${distServePath}/${polyfills}`;
        const scripts = files.find(fileName => /scripts-es2015\.[a-z0-9]+\.js/.test(fileName));
        metadata.assets.scripts = `${distServePath}/${scripts}`;
        const vendor = files.find(fileName => /vendor-es2015\.[a-z0-9]+\.js/.test(fileName));
        metadata.assets.vendor = `${distServePath}/${vendor}`;
        const main = files.find(fileName => /main-es2015\.[a-z0-9]+\.js/.test(fileName));
        metadata.assets.main = `${distServePath}/${main}`;
        res.status(200).json(metadata);
      } else {
        res.status(404).json({ error: 'Widget dist not found' });
      }
    }
  },
};
