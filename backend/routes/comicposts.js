const express = require("express");
const multer = require("multer");

const router = express.Router();

const Comicpost = require('../models/comicpost');

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    console.log(name);
    cb(null, name + "-" + Date.now() + "." + ext);
  }
});

router.post('', multer({ storage: storage }).single("image"), (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  const comicposts = new Comicpost({
    title: req.body.title,
    issue: +req.body.issue,
    about: req.body.about,
    imagePath: url + "/images/" + req.file.filename
  });
  // console.log(comicposts);
  // res.status(201).json({
  //   message: 'Post created successfully!'
  // })
  comicposts.save().then(createdComicpost => {
    res.status(201).json({
      message: "Comic posted successfully!"
      // {
        // title: createdComicpost.title,
        // issue: createdComicpost.issue,
        // about: createdComicpost.about
        // ...createdComicpost,
        // id: createdComicpost._id
      // }
    });
  }).catch(error => {
    res.status(500).json({
      message: 'Creating post failed!'
    });
  });
});

router.get('', (req, res, next) => {
  Comicpost.find().then(fetchedComicposts => {
    console.log(fetchedComicposts);
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

router.get('/:id', (req, res, next)=>{
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

router.put('/:id', (req, res, next) => {

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

router.delete('/:id', (req, res, next) => {
  Comicpost.deleteOne({
    _id: req.params.id
  }).then(result => {
    res.status(200).json({
      message: "Deletion successful!"
    });
    console.log(result);
  });
});

module.exports = router;
