var express = require("express");
// var router = express.Router();
var recipes = require("express-promise-router")();
const mongoose = require('mongoose');
const passport = require('passport');
// require("../models/User");
// var User = mongoose.model("User");
var bodyParser = require("body-parser");
// const Auth = require("../middleware/auth");
const recipeController = require("../controllers/recipesController");
const passportJWT = passport.authenticate("jwt",{session: false});


// get all recipes
recipes.get("/", recipeController.getAllRecipes);
recipes.get("/search/:term", recipeController.searchRecipes);

// lets make sure these all have the correct user that is associated with the recipe
// get specific recipe
recipes.get("/show/:id", recipeController.getRecipe);

// create recipe
recipes.post("/create",passportJWT, recipeController.createRecipe);

// update recipe
recipes.put("/update",passportJWT, recipeController.updateRecipe);

// delete recipe
recipes.delete("/delete",passportJWT, recipeController.deleteRecipe);

// recipes for user

recipes.post("/ingredient/add", passportJWT, recipeController.addIngredient)
recipes.delete("/ingredient/remove", passportJWT, recipeController.removeIngredient)


module.exports = recipes;