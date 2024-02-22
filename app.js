/* eslint-disable no-undef */
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongodb = require('./db/connect');
// eslint-disable-next-line no-undef
const port = process.env.PORT || 8080;
const app = express();
const { auth } = require('express-openid-connect');

// Load environment variables from .env file
require('dotenv').config();

const secret = process.env.AUTH_SECRET;
const clientId = process.env.AUTH_CLIENT_ID;

// Set up session middleware
app.use(
  session({
    secret: 'your-secret-key', // Change this to a random string
    resave: false,
    saveUninitialized: false
  })
);

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: secret,
  baseURL: 'http://localhost:8080',
  clientID: clientId,
  issuerBaseURL: 'https://dev-8qtdanvxriykr2k2.us.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// Route handlers for managing user sessions
app.get('/', (req, res) => {
  if (req.session.user) {
    res.send(`Welcome back, ${req.session.user.name}!`);
  } else {
    res.send('Welcome!');
  }
});

app.get('/login', (req, res) => {
  // Perform authentication logic
  req.session.user = { name: 'John' }; // Store user information in the session
  res.redirect('/');
});

app.get('/logout', (req, res) => {
  req.session.destroy(); // Destroy the session
  res.redirect('/');
});

// Handle callback from Auth0 after authentication
app.get('/callback', (req, res, next) => {
  // Handle callback logic here, such as setting up the user session
  res.redirect('/'); // Redirect to the home page or any other desired route
});

app.use(bodyParser.json()).use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.use('/', require('./routes'));

process.on('uncaughtException', (err, origin) => {
  console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});
