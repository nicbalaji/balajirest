const express = require("express");
const router = express.Router();

const restaurants = require("../data/restaurants.json");

router.get("/", (req,res)=>{

res.json(restaurants);

});

module.exports = router;
