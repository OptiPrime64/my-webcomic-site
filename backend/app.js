const express = require('express');
const bodyParser = require('body-parser');//NEED npm install
const mongoose = require('mongoose');// NEED npm install

const Comicpost = require('./models/comicpost');
const comicpost = require('./models/comicpost');

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
  const comicposts = new Comicpost({
    title: req.body.title,
    issue: req.body.issue,
    about: req.body.about
  });
  // console.log(comicposts);
  // res.status(201).json({
  //   message: 'Post created successfully!'
  // })
  comicposts.save().then(createdComicpost => {
    res.status(201).json({
      comicpost: {
        title: createdComicpost.title,
        issue: createdComicpost.issue,
        about: createdComicpost.about
        // ...createdComicpost,
        // id: createdComicpost._id
      }
    });
  }).catch(error => {
    res.status(500).json({
      message: 'Creating post failed!'
    });
  });
});

app.get('/api/posts', (req, res, next) => {
  Comicpost.find().then(fetchedComicposts => {
    res.status(200).json({
      message: 'Posts fetched successfully!',
      comicposts: fetchedComicposts
    });
  })
    .catch(error => {
      res.status(500).json({
        message: 'Fetching posts failed!'
      })
    })

});

app.get('/api/posts/:id', (req, res, next)=>{
  Comicpost.findById(req.params.id).then(comicpost => {
    if (comicpost){
      res.status(200).json(comicpost);
    }else{
      res.status(404).json({message: 'Post not found!'})
    }
  })
  .catch(error => {
    res.status(500).json({
      message: "Fetching post failed!"
    });
  });
})

app.put('/api/posts/:id', (req, res, next) => {

  const comicpost = new Comicpost({
    _id: req.body._id,
    title: req.body.title,
    issue: req.body.issue,
    about: req.body.about
  });
  console.log('HERE2!');
  console.log(comicpost);
  Comicpost.updateOne({
    _id: req.params.id
  }, comicpost).then(() => {
    res.status(200).json({
      message: 'Update successful!'
    })
  }).catch(error => {
    res.status(500).json({
      message: 'Could not update post!'
    });
  });
})

app.delete('/api/posts/:id', (req, res, next) => {
  Comicpost.deleteOne({
    _id: req.params.id
  }).then(result => {
    res.status(200).json({
      message: "Deletion successful!"
    })
    console.log(result);
  })
})

module.exports = app;
