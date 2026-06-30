const express = require('express');
const router = express.Router();

const Restaurant = require('../models/restaurant.model');

// ✅ GET all restaurants
router.get('/', async (req, res) => {
  try {
    const data = await Restaurant.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET single restaurant
router.get('/:id', async (req, res) => {
  try {
    const data = await Restaurant.findById(req.params.id);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ ADD review
router.post('/:id/review', async (req, res) => {
  try {
    const { user, comment, rating } = req.body;

    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    restaurant.reviews.push({ user, comment, rating });

    await restaurant.save();

    res.json({ message: "Review added successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;