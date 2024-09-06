// backend/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'user'
  },
  tokens: [{ token: { type: String, required: true } }],
  orderedFoods: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Food',
    },
  ],
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;
