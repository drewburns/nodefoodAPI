const JWT = require("jsonwebtoken");
const JWT_SECRET = "secret";
var User = require("../models/user");
var Recipe = require("../models/recipe");

signToken = user => {
	return JWT.sign({
		iss: "recipe",
		sub: user._id, // will be user id
		iat: new Date().getTime(),
		exp: new Date().setDate(new Date().getDate() + 1)
	}, JWT_SECRET);
}

module.exports = {
	signUp: async (req, res, next) => {
		console.log("We got here!");
		console.log(req.user);
		const token = signToken(req.user);
		res.status(200).json({token});
	},
	getAll: async (req, res, next) => {
		try {
			const users = await User.find({})
			res.status(200).json(users);
		} catch(error) {
			res.status(500).json(error);
		}
	},	
	getUser: async (req, res, next) => {
		try {
			const theUser = await User.findById(req.params.id).populate("recipes", "title instruction");
			if (!theUser) { res.status(404).json({error: "User does not exist"})}
			res.status(200).json(theUser);
		} catch(error) {
			res.status(404).json(error);
		}

	},	
	updateUser: async (req, res, next) => {
		// req.user will be our user that we get from the token
		// then lets just update the user, in this case probably just updating their name
		try {
			const newName = req.body.name;
			console.log(req.body);
			console.log(req.user._id);
			const status = await User.update({ _id: req.user._id}, {$set: {"google.name": newName}});
			// handle it not updating
			console.log(status.nModified);
			const updatedUser = await User.findById(req.user._id);
			res.status(200).json(updatedUser);
		} catch(error) {
			res.status(500).json(error);
		}
	},	
	deleteUser: async (req, res, next) => {
		// req.user will be our user that we get from the token
		// then lets just delete the user
	}

}

// router.post("/oauth/google", passport.authenticate('googleToken', { session: false }), UserController.signUp);
// router.get("/protected", passportJWT, UserController.protected)
// router.get("/", UserController.getAll);
// router.get("/show/:id", UserController.getUser);
// router.put("/update/:id",passportJWT, UserController.updateUser);
// router.delete("/delete/:id", passportJWT, UserController.deleteUser);
