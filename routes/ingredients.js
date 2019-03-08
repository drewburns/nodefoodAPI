var express = require("express");
// var router = express.Router();
var ingredients = require("express-promise-router")();
const mongoose = require('mongoose');
const passport = require('passport');
// require("../models/User");
// var User = mongoose.model("User");
var bodyParser = require("body-parser");
// const Auth = require("../middleware/auth");
const IngredientsController = require("../controllers/ingredientsController");
const passportJWT = passport.authenticate("jwt",{session: false});


// get all ingredients
ingredients.get("/", IngredientsController.getAllIngredients);


ingredients.get("/search/:term", IngredientsController.searchIngredients);

// lets make sure these all have the correct user that is associated with the meal
// get specific recipe
ingredients.get("/show/:id", IngredientsController.getIngredient);

// create ingredients
ingredients.post("/create",passportJWT, IngredientsController.createIngredient);

// update ingredients
ingredients.put("/update",passportJWT, IngredientsController.updateIngredient);

// delete ingredients
ingredients.delete("/delete",passportJWT, IngredientsController.deleteIngredient);



module.exports = ingredients;