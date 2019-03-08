var mongoose = require("mongoose");
var Schema = mongoose.Schema;


const mealSchema = new Schema({
	recipe: {type: mongoose.Schema.Types.ObjectId, ref: "recipe"},
	user: {type: mongoose.Schema.Types.ObjectId, ref: "user"},
	forDate: {type: Date, required: "Need a date"},
	created : { type : Date, default: Date.now }
});

const Meal = mongoose.model("recipe", recipeSchema);
module.exports = Meal;