var express = require("express");
var recipes = express.Router();
const mongoose = require('mongoose');



// get all recipes
recipes.get("/", (req,res) => {
	res.json("Recipes");
});

// get specific recipe
recipes.get("/show/:id", (req,res) => {
	res.json("Recipe for Id");
});

// create recipe
recipes.post("/create", (req,res) => {
	res.json("Create?");
});

// update recipe
recipes.put("/update/:id", (req,res) => {
	res.json("Update?");
});

// delete recipe
recipes.delete("/destroy/:id", (req,res) => {
	res.json("Delete?");
});

// recipes for user
recipes.get("/user/:id", (req, res) => {
	res.json("Recipes for user");
});


module.exports = recipes;