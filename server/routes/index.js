'use strict';

const handlers = require('../../functions/handlers/index');

/**
 * Server Routes module
 * @module server/routes/index
 * @param {object} app Express application
 */
module.exports = (app) => {

  /**
   * Login endpoint mock.
   */
  app.post('/login', handlers.login);

  /**
   * Signup endpoint mock.
   */
  app.post('/signup', handlers.signup);

  /**
   * Balance endpoint mock.
   */
  app.get('/balance', handlers.balance);

  /**
   * Catalogue endpoint mock.
   */
  app.get('/catalogue', handlers.catalogue);

  /**
   * Orders endpoint mock.
   */
  app.get('/orders', handlers.orders);

};
