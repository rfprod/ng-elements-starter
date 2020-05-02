'use strict';

const jwtMethods = require('../helpers/jwt-methods.js');

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
   * Handles items catalogue.
   */
  catalogue: (req, res) => {
    const token = req.query.token || '';
    if (token) {
      const catalogue = Array.apply(null, Array(5))
        .map(String.prototype.valueOf, 'catalogue item ')
        .map((item, index) => item + index);
      res.status(200).json(catalogue);
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
};
