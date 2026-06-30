const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

// Serve images
app.use('/images', express.static('public/images'));

// MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/foodDB')
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// ✅ IMPORT ROUTES
const foodRoutes = require('./routes/food');

// ✅ USE ROUTES
app.use('/api/restaurants', foodRoutes);

// Server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});