const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: String,
  username: String,
  email: { type: String, unique: true },
  phone: String,
  password: String,
  bio: String
});

module.exports = mongoose.model('User', userSchema);
