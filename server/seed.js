const mongoose = require('mongoose');
const Restaurant = require('./models/restaurant.model');

mongoose.connect('mongodb://127.0.0.1:27017/foodDB');

const data = {
  name: "Pizza Hut",
  location: "Chennai",
  rating: 4.2,
  image: "http://localhost:3000/images/pizza.jpg",
  cuisines: ["Italian", "Fast Food"],
  costForTwo: 500,
  menu: [
    {
      name: "Margherita Pizza",
      price: 250,
      description: "Cheese pizza",
      category: "Pizza",
      isVeg: true
    },
    {
      name: "Veg Pasta",
      price: 200,
      description: "Creamy pasta",
      category: "Pasta",
      isVeg: true
    }
  ],
  reviews: []
};

async function insertData() {
  try {
    await Restaurant.create(data);
    console.log("✅ Data inserted successfully");
  } catch (err) {
    console.log(err);
  } finally {
    mongoose.disconnect();
  }
}

insertData();