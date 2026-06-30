const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: String,
  location: String,
  rating: Number,
  image: String,

  cuisines: [String],
  costForTwo: Number,

  menu: [
    {
      name: String,
      price: Number,
      description: String,
      category: String,
      image: String,
      isVeg: Boolean
    }
  ],

  reviews: [
    {
      user: String,
      comment: String,
      rating: Number,
      date: { type: Date, default: Date.now }
    }
  ]
});

module.exports = mongoose.model('Restaurant', restaurantSchema);