const mongoose = require('mongoose');

const schema = mongoose.Schema({
  title: String,
  content: String,
  img_url: String,
});

const Post = mongoose.model('Post', schema);

module.exports = Post;
