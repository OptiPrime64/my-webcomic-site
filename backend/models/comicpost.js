const mongoose = require('mongoose');

const comicpostSchema = mongoose.Schema({
  title: { type: String, required: true },
  issue: { type: Number, required: true },
  // imagePath: { type: String, required: false } optional img post
  about: { type: String, required: true }
});

module.exports = mongoose.model('Comicpost', comicpostSchema);
