// Heroku Server
const express = require('express');
const proxy = require('http-proxy-middleware');

// Heroku Server
const path = require('path');

// setting up a logger - Heroku Server and Node Server
const log = require('debug')('api:logging');

// get the express application - Heroku Server & Node Server
const app = require('./app');

// set the port to either the one passed from the environment variables or 4000
// Heroku
const port = process.env.PORT || 5000;

// Heroku Server
app.use(proxy('/api/*', { target: 'http://localhost:5000/' }));

// Serve any static files
app.use(express.static(path.join(__dirname, '../reactjs/build')));

// Heroku Server
// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../reactjs/build', 'index.html'));
});

// spin up the server and log what port it is running on - Heroku Server and Node Server
app.listen(port, () => log(`API listening on port ${port}!`));
