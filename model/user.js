// model/user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    default: "Normal"
  },
  password: {
    type: String,
    required: true
  },
},    { timestamps: true});

const User = mongoose.model('User_detail', userSchema);

module.exports = { User };
