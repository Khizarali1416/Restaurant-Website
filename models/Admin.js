// backend/models/Admin.js
const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
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
    default: 'admin',
  },
  tokens: [{
    token: {
      type: String,
      required: true,
    },
  }],
  managedFoods: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Food',
    },
  ],
}, { timestamps: true });

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
