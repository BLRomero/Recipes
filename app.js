/* eslint-disable no-undef */
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongodb = require('./db/connect');
const app = express();
const port = process.env.PORT || 8080;
const { auth } = require('express-openid-connect');

// Load environment variables from .env file
require('dotenv').config();

const secret = process.env.AUTH_SECRET ;
const clientId = process.env.AUTH_CLIENT_ID ;
const baseURL = process.env.BASE_URL;
const issuerBaseURL = process.env.ISSUER_BASE_URL

// Set up session middleware
app.use(
  session({
    secret: secret,
    resave: false,
    saveUninitialized: false
  })
);

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: secret,
  baseURL: baseURL,
  clientID: clientId ,
  issuerBaseURL: issuerBaseURL
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

// req.isAuthenticated is provided from the auth router
app.get("/", (req, res) => {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
}); 

// Handle callback from Auth0 after authentication
app.get('/callback', (req, res) => {
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

