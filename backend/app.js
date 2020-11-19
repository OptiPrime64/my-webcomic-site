const express = require('express');

const app = express(); //NEED npm install

app.get('/favicon.ico', (req, res) => res.status(204));

app.use((req, res, next) => {
  console.log('First middleware');
  next(); //Call next if not sending a response or will crash
});

app.use((req, res, next) => {
  res.send('Hello from express!');
});

module.exports = app;
