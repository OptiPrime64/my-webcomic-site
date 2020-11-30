const path = require("path");
const express = require('express');
const bodyParser = require('body-parser');//NEED npm install
const mongoose = require('mongoose');// NEED npm install

const comicpostsRoutes = require("./routes/comicposts");
const userRoutes = require("./routes/user");

const app = express(); //NEED npm install

mongoose.connect('mongodb+srv://harold:ehc9HSAwaG28o8kI@cluster0.hzaam.mongodb.net/node-angular?retryWrites=true&w=majority')
  .then(() => {
    console.log('Connected to database!')
  })
  .catch(() => {
    console.log('Connection failed!')
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));

app.get('/favicon.ico', (req, res) => res.status(204));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  next();
});

// app.use((req, res, next) => {
//   console.log('First middleware');
//   next(); Call next if not sending a response or will crash
// });

app.use("/api/posts", comicpostsRoutes);
app.use("/api/user", userRoutes);

module.exports = app;
