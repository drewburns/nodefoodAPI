const JWT = require("jsonwebtoken");
const JWT_SECRET = "secret";

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
	protected: async (req, res,next) => {
		console.log("Protected!");
		console.log(req.user);
		res.status(200).json("Yo!");
	},
	getAll: async (req, res, next) => {

	},	
	getUser: async (req, res, next) => {

	},	
	updateUser: async (req, res, next) => {

	},	
	deleteUser: async (req, res, next) => {

	},

}

// router.post("/oauth/google", passport.authenticate('googleToken', { session: false }), UserController.signUp);
// router.get("/protected", passportJWT, UserController.protected)
// router.get("/", UserController.getAll);
// router.get("/show/:id", UserController.getUser);
// router.put("/update/:id",passportJWT, UserController.updateUser);
// router.delete("/delete/:id", passportJWT, UserController.deleteUser);
