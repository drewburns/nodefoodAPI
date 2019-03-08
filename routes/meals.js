var express = require("express");
// var router = express.Router();
var meals = require("express-promise-router")();
const mongoose = require('mongoose');
const passport = require('passport');
// require("../models/User");
// var User = mongoose.model("User");
var bodyParser = require("body-parser");
// const Auth = require("../middleware/auth");
const MealController = require("../controllers/mealsController");
const passportJWT = passport.authenticate("jwt",{session: false});


// get all recipes
meals.get("/", MealController.getAllMeals);


// lets make sure these all have the correct user that is associated with the meal
// get specific recipe
meals.get("/show/:id", MealController.getMeal);

// create recipe
meals.post("/create",passportJWT, MealController.createMeal);

// update recipe
meals.put("/update",passportJWT, MealController.updateMeal);

// delete recipe
meals.delete("/delete",passportJWT, MealController.deleteMeal);

// meals for user
meals.get("/user",passportJWT, MealController.userMeals);


module.exports = meals;