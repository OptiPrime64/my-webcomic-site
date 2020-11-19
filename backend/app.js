const express = require('express');
const bodyParser = require('body-parser');

const app = express(); //NEED npm install

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/favicon.ico', (req, res) => res.status(204));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  next();
});

// app.use((req, res, next) => {
//   console.log('First middleware');
//   next(); Call next if not sending a response or will crash
// });

app.post('/api/posts', (req, res, next) => {
  const posts = req.body;
  console.log(posts);
  res.status(201).json({
    message: 'Post successful!'
  });
});

app.get('/api/posts', (req, res, next) => {
  const posts = [
    {
      title: 'Too Many Games',
      issue: 1,
      about: 'Too many games during lockdown.'
    },
    {
      title: 'Too Many Cats',
      issue: 2,
      about: 'Meow meow meow....'
    },
    {
      title: 'Oh no...',
      issue: 3,
      about: 'That wasn\'t water!'
    }
  ];
  res.status(200).json({
    message: 'Posts fetched successfully!',
    posts: posts
  });
});

module.exports = app;
