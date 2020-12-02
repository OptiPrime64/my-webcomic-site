const express = require("express");
const multer = require("multer");

const Comicpost = require('../models/comicpost');
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

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
    cb(error, "images");

  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  }
});

router.post('', checkAuth, multer({ storage: storage }).single("image"), (req, res, next) => {
  console.log("Post clicked!")
  const url = req.protocol + "://" + req.get("host");
  const comicposts = new Comicpost({
    title: req.body.title,
    issue: +req.body.issue,
    about: req.body.about,
    imagePath: url + "/images/" + req.file.filename
  });
  comicposts.save().then(createdComicpost => {
    res.status(201).json({
      message: "Comic posted successfully!"
    });
  }).catch(error => {
    res.status(500).json({
      message: 'Creating post failed!'
    });
  });
});

router.get('', (req, res, next) => {
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

router.get('/:id', (req, res, next) => {
  Comicpost.findById(req.params.id).then(comicpost => {
    if (comicpost) {
      res.status(200).json(comicpost);
    } else {
      res.status(404).json({ message: 'Post not found!' })
    }
  })
    .catch(error => {
      res.status(500).json({
        message: "Fetching post failed!"
      });
    });
})

router.put('/:id', checkAuth, multer({ storage: storage }).single("image"), (req, res, next) => {
  let imagePath = req.body.imagePath;
  if (req.file){
    const url = req.protocol + "://" + req.get("host");
    imagePath = url + "/images/" + req.file.filename;
  }
  const comicpost = new Comicpost({
    _id: req.body._id,
    title: req.body.title,
    issue: req.body.issue,
    about: req.body.about,
    imagePath: imagePath
  });
  Comicpost.updateOne({
    _id: req.params.id
  }, comicpost).then(() => {
    res.status(200).json({
      message: 'Update successful!'
    })
  }).catch(error => {
    console.log(error)
    res.status(500).json({
      message: 'Could not update post!'
    });
  });
})

router.delete('/:id', checkAuth, (req, res, next) => {
  Comicpost.deleteOne({
    _id: req.params.id
  }).then(result => {
    res.status(200).json({
      message: "Deletion successful!"
    });
  });
});

module.exports = router;
