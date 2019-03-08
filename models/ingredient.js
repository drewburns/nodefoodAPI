var mongoose = require("mongoose");
var Schema = mongoose.Schema;


const ingredientSchema = new Schema({
	name: {type: String, required: "Please enter a name"},
	recipes: [{type: mongoose.Schema.Types.ObjectId, ref: "recipe"}],
	created : { type : Date, default: Date.now }
	
});

var Ingredient = mongoose.model("ingredient", ingredientSchema);
module.exports = Ingredient;
