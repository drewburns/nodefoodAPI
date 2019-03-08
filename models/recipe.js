var mongoose = require("mongoose");
var Schema = mongoose.Schema;


const recipeSchema = new Schema({
  title: {type: String, required: "Please enter a title"},
  instructions: {type: String, required: "Please enter instructions"},
  imageUrl: {type: String},
  author: {type: mongoose.Schema.Types.ObjectId, ref: "user"},
  ingredients: [{type: mongoose.Schema.Types.ObjectId, ref: "ingredient"}],
  created : { type : Date, default: Date.now }
});

const Recipe = mongoose.model("recipe", recipeSchema);
module.exports = Recipe;