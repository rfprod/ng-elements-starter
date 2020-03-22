const functions = require('firebase-functions');
const admin = require('firebase-admin');

const handlers = require('./handlers/index');

/*
 * Create and Deploy Cloud Functions
 * https://firebase.google.com/docs/functions/write-firebase-functions
 *
 * basic usage example
 *
 * exports.helloWorld = functions.https.onRequest((request, response) => {
 *  response.send('Hello from Firebase!');
 * });
 */

/**
 * Initialize admin SDK to access Firebase Realtime Database.
 */
admin.initializeApp(functions.config().firebase);

/**
 * Login endpoint mock.
 */
exports.login = functions.https.onRequest((req, res) => {
  if (req.method !== 'POST') {
    res.status(403).json({ error: 'Forbidden method' });
  }
  handlers.login(req, res);
});

/**
 * Signup endpoint mock.
 */
exports.signup = functions.https.onRequest((req, res) => {
  if (req.method !== 'POST') {
    res.status(403).json({ error: 'Forbidden method' });
  }
  handlers.signup(req, res);
});

/**
 * Balance endpoint mock.
 */
exports.balance = functions.https.onRequest((req, res) => {
  if (req.method !== 'GET') {
    res.status(403).json({ error: 'Forbidden method' });
  }
  handlers.balance(req, res);
});

/**
 * Catalogue endpoint mock.
 */
exports.catalogue = functions.https.onRequest((req, res) => {
  if (req.method !== 'GET') {
    res.status(403).json({ error: 'Forbidden method' });
  }
  handlers.catalogue(req, res);
});

/**
 * Orders endpoint mock.
 */
exports.orders = functions.https.onRequest((req, res) => {
  if (req.method !== 'GET') {
    res.status(403).json({ error: 'Forbidden method' });
  }
  handlers.orders(req, res);
});
