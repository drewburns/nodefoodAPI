var mongoose = require("mongoose");
var Schema = mongoose.Schema;


const userSchema = new Schema({
  method: {
    type: String,
    enum: ['google'],
    required: true
  },
  google: {
    id: {
      type: String
    },
    email: {
      type: String,
      lowercase: true
    },
    name: {
    	type: String
    }
  },
  recipes: [{type: mongoose.Schema.Types.ObjectId, ref: "recipe"}],
  meals: [{type: mongoose.Schema.Types.ObjectId, ref: "meal"}],
  created : { type : Date, default: Date.now }
});

const User = mongoose.model("user", userSchema);
module.exports = User;