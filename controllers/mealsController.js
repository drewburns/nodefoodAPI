module.exports = {
	getAllMeals: async (req, res, next) => {
		console.log("Getting all ");
	},
	getMeal: async (req, res, next) => {
		console.log("Getting one");
	},
	createMeal: async (req, res, next) => {
		console.log("Create");
	},
	updateMeal: async (req, res, next) => {
		console.log("updating");
	},
	deleteMeal: async (req, res, next) => {
		console.log("deleting ");
	},
	userMeals: async (req, res, next) => {
		console.log("Getting all for user");
	}

}

// get all Meals
// meals.get("/", MealController.getAllMeals);


// // lets make sure these all have the correct user that is associated with the meal
// // get specific meals
// meals.get("/show/:id", MealController.getMeal);

// // create meals
// meals.post("/create",passportJWT, MealController.createMeal);

// // update meals
// meals.put("/update",passportJWT, MealController.updateMeal);

// // delete meals
// meals.delete("/delete",passportJWT, MealController.deleteMeal):

// // meals for user
// meals.get("/user",passportJWT, MealController.userMeals);


// module.exports = meals;