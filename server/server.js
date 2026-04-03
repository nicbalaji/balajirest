const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); // ✅ NEW

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Serve images
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/foodDB')
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Model
const Restaurant = mongoose.model('foods', {
  name: String,
  location: String,
  rating: Number,
  image: String
});

// API
app.get('/api/restaurants', async (req, res) => {
  const data = await Restaurant.find();
  res.json(data);
});

// Server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});