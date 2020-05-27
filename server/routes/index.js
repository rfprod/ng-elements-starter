'use strict';

const handlers = require('../../functions/handlers/index');

/**
 * Server Routes module
 * @module server/routes/index
 * @param {object} app Express application
 */
module.exports = app => {
  /**
   * Login endpoint.
   */
  app.post('/login', handlers.login);

  /**
   * Signup endpoint.
   */
  app.post('/signup', handlers.signup);

  /**
   * Balance endpoint.
   */
  app.get('/balance', handlers.balance);

  /**
   * Catalogue endpoint.
   */
  app.get('/catalog', handlers.catalog);

  /**
   * Orders endpoint.
   */
  app.get('/orders', handlers.orders);

  /**
   * Widget metadata endopoint.
   */
  app.get('/widget', handlers.widget);
};
