module.exports = {
	getAllIngredients: async (req, res, next) => {
		console.log("Getting all ");
	},
	getIngredient: async (req, res, next) => {
		console.log("Getting one");
	},
	createIngredient: async (req, res, next) => {
		console.log("Create");
	},
	updateIngredient: async (req, res, next) => {
		console.log("updating");
	},
	deleteIngredient: async (req, res, next) => {
		console.log("deleting ");
	},
	searchIngredients: async (req,res,next) => {
		console.log("Search!");
	}

}

// ingredients.get("/", IngredientsController.getAllIngredients);


// // lets make sure these all have the correct user that is associated with the meal
// // get specific recipe
// ingredients.get("/show/:id", IngredientsController.getIngredient);

// // create ingredients
// ingredients.post("/create",passportJWT, IngredientsController.createIngredient);

// // update ingredients
// ingredients.put("/update",passportJWT, IngredientsController.updateIngredient);

// // delete ingredients
// ingredients.delete("/delete",passportJWT, IngredientsController.deleteIngredient):
