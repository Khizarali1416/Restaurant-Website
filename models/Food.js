// backend/models/Food.js
const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true,
  },
  foodName: {
    type: String,
    required: true,
    maxlength: 20,
  },
  description: {
    type: String,
    maxlength: 50,
  },
  percentageOff: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: true,
  },
  hasOffer: {
    type: Boolean,
    default: false,
  },
  freeItemIncluded: {
    type: Boolean,
    default: false,
  },
  paidRelatedProducts: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Food',
      },
      additionalPrice: {
        type: Number,
        required: true,
      },
    },
  ],
  orderedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
}, { timestamps: true });

const Food = mongoose.model('Food', foodSchema);
module.exports = Food;
