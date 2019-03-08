var Ingredient = require("../models/ingredient");
var Recipe = require("../models/recipe");
var ObjectId = require('mongoose').Types.ObjectId; 
var User = require("../models/user");
var cloudinary = require('cloudinary');
cloudinary.config({ 
  cloud_name: 'andrewburns', 
  api_key: '638539191971878', 
  api_secret: 'lS08u6wf40N_yJSlXfc8EOx9kDM' 
});
// function addIngredientToRecipe(ingredName,recipeId, callback) {
// 	Ingredient.find({name: ingredName}, (err, doc) =>{
// 		callback(doc);
// 	});
// }


module.exports = {
	getAllRecipes: async (req, res, next) => {
		console.log("Getting all ");
	},
	getRecipe: async (req, res, next) => {
		console.log("Getting one");
	},
	createRecipe: async (req, res, next) => {
		try {
			const {title, instructions, ingredients, image} = req.body;
			const user = req.user;
			console.log(req.body);
			console.log(ingredients);
			const newRecipe = new Recipe({
				title: title,
				instructions: instructions,
				author: user._id
			});
			var imageResult = await cloudinary.v2.uploader.upload(image, { resource_type: "image"});
			// handle the recipe image and upload
			newRecipe.imageUrl = imageResult.url;

			var savedRecipe = await newRecipe.save();
			await User.update({_id: user._id}, {$push: {recipes: savedRecipe._id}});
			// console.log("Did recipe svve????");
			// console.log(savedRecipe);

			var promises = []
			ingredients.forEach( (item) => {
				var query = { name: item },
			    update = {$push: {recipes: savedRecipe._id }},
			    options = { upsert: true , new: true, setDefaultsOnInsert: true};
			    var p = Ingredient.findOneAndUpdate(query, update, options);
			    // var p = Recipe.find({});
				promises.push(p);
			});
			
			Promise.all(promises).then((values) => {
				console.log("--------------");
				console.log(values);

				var ids = values.map(item => {return item._id});
				Recipe.update({_id: savedRecipe._id}, {$push: {ingredients: {$each: ids }}}, {upsert:true}, function(err, doc){
					console.log(err);
					Recipe.findById(savedRecipe._id).populate("ingredients", "name _id").populate("author", "google").exec((err2,doc2) => {
						console.log(err2);
						res.status(200).json(doc2);
					});
				});
			});


		} catch(error) {
			res.status(500).json(error);
		}

	},
	updateRecipe: async (req, res, next) => {
		// make sure the correct user probably
		var {recipeId, title, instructions} = req.body;
		recipeId = new ObjectId(recipeId.toString());
		Recipe.update({_id: recipeId}, {title,instructions}, (err,doc) => {
			// handle some sort of error
			console.log(err);
			console.log(doc);
			Recipe.findById(recipeId).populate("ingredients", "_id name").exec( (err2,recipe) => {
				console.log(err2);
				console.log(recipe);
				res.status(200).json(recipe);
			});
		});

	},
	deleteRecipe: async (req, res, next) => {
		// make sure the correct user probably
		// console.log(req);
		var recipeId = req.body.recipeId;
		recipeId = new ObjectId(recipeId.toString());

		Recipe.remove({_id: recipeId}, (err,doc) => {
			res.status(200).json(doc);
		});
	},
	searchRecipes: async (req,res, next) => {
		const search = req.body.search;
		Recipe.find({'title' : new RegExp(search, 'i')}, (err, docs) =>{
   			res.json(docs);
		});
	},
	addIngredient: async (req,res,next) => {
		const {recipeId, ingredientName} = req.body;
		// check if ingredient name is null
		// if (!ingredientName || ingredientName != "" || ingredientName != " ") { res.json("error")};
		var query = { name: ingredientName },
	    update = {$push: {recipes: recipeId }},
	    options = { upsert: true , new: true, setDefaultsOnInsert: true};
	    Ingredient.findOneAndUpdate(query, update, options, (err,ingredient) => {
	    	Recipe.update({_id: recipeId}, {$addToSet: {ingredients: ingredient._id}}, {upsert:true}, function(err, doc){
				Recipe.findById(recipeId).populate("ingredients", "_id name").exec( (err2,recipe) => {
					console.log(err2);
					console.log(recipe);
					res.status(200).json(recipe);
				});
	    	});
	    });
	},
	removeIngredient: async (req,res,next) => {
		var {recipeId, ingredientId} = req.body;
		recipeId = new ObjectId(recipeId.toString());
		ingredientId = new ObjectId(ingredientId.toString());

		const update = { $pull: {recipes: recipeId } }
		Ingredient.findOneAndUpdate({_id: ingredientId}, update, {}, (err, ingredient) => {
			Recipe.findOneAndUpdate({_id: recipeId}, {$pull: {ingredients: ingredientId}}, {}, (err, recipe) => {
				Recipe.findById(req.body.recipeId).populate("ingredients", "name _id").exec( (err,recipe2) => {
					res.status(200).json(recipe2);
				});
			});
		});
	}
	// Favorite.update( {cn: req.params.name}, { $pullAll: {uid: [req.params.deleteUid] } } )
// 

}



// recipes.get("/", recipeController.getAllRecipes);


// // lets make sure these all have the correct user that is associated with the recipe
// // get specific recipe
// recipes.get("/show/:id", recipeController.getRecipe);

// // create recipe
// recipes.post("/create",passportJWT, recipeController.createRecipe);

// // update recipe
// recipes.put("/update",passportJWT, recipeController.updateRecipe);

// // delete recipe
// recipes.delete("/delete",passportJWT, recipeController.deleteRecipe);

// // recipes for user
// recipes.get("/user/:id",passportJWT, recipeController.userRecipes);
