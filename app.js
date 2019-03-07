
var express = require("express");
var app = express();
var port = process.env.PORT || 3000;
var path = require("path");
const mongoose = require('mongoose');
var passport = require('passport');
const bcrypt = require("bcrypt");
const GooglePlusTokenStrategy = require("passport-google-plus-token");
var bodyParser = require("body-parser");
const JwtStrategy = require("passport-jwt").Strategy;
const {ExtractJwt} = require("passport-jwt");
var User = require("./models/user");



// logger
const logger = (req,res,next) => {
	console.log(`${req.protocol}://${req.get("host")}${req.originalUrl}`);
	next();
};


// connect Mongo
var prodString = ""
var localString = "mongodb://localhost/recipesAPI"
var mongoString =  (process.env.NODE_ENV == "production") ? prodString : localString;
mongoose.connect(mongoString, { useNewUrlParser: true }, (err) => {
	if (err) throw err;
	console.log("Database connected: " + mongoString);
});


app.use(passport.initialize()); // Used to initialize passport
app.use(passport.session()); // Used to persist login sessions

// jwt strat
passport.use(new JwtStrategy({
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	secretOrKey: "secret"
}, async (payload, done) => {
	try {
		// payload.sub will be user id (not google but object id)
		// check to see if the user exists that is passed from this token
		var userId = payload.sub;
		const theUser = await User.findById(payload.sub)
		if (!user) { 
			console.log("User doesn't exist");
			return done(null, false)
		}
		done(null,theUser);

	}catch(error){done(error,false);}
}));

// Strategy config
var notSoSecretClientId = "738278161582-m8j8i20n044ijtajph5r8ukomedepnst.apps.googleusercontent.com";
var notSoSecretSecret = "OtWHEMN7EwXKWjnotqRW0j9C";
passport.use("googleToken", new GooglePlusTokenStrategy({
	clientID: notSoSecretClientId,
	clientSecret: notSoSecretSecret
},async (accessToken, refreshToken, profile,done) =>{
	try {
		const existingUser = await User.findOne({"google.id": profile.id });
		if (existingUser) {
			return done(null, existingUser);
		}
		const newUser = new User({
			method: "google",
			google: {
				id: profile.id,
				email: profile.emails[0].value,
				name: profile.displayName
			}
		});

		await newUser.save();
		console.log("User saved!")
		console.log(newUser);
		done(null, newUser);
	} catch(error) {
		done(error, false, error.message);
	}
	// done(null, "test");
}));


// assorted express and parsing
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(logger);
app.use(express.json());
app.use(express.urlencoded({extened: false}));
app.use(express.static(__dirname + '/public'));


var recipeRouter = require("./routes/recipes");
// var userRouter = require("./routes/users")(passport);
var userRouter = require("./routes/users");
app.use('/recipes', recipeRouter);
app.use('/users', userRouter);



// 404 
app.use((req,res,next) => {

	var err = new Error("Not Found");
	err.status = 404;
	res.json({"error" : 404});
	next(err);
});




// server
app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});



module.exports = app;