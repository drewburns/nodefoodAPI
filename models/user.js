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
  }
});

const User = mongoose.model("user", userSchema);
module.exports = User;