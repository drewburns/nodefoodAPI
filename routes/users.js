var express = require("express");
// var router = express.Router();
var router = require("express-promise-router")();
const mongoose = require('mongoose');
const passport = require('passport');
// require("../models/User");
// var User = mongoose.model("User");
var bodyParser = require("body-parser");
// const Auth = require("../middleware/auth");
const UserController = require("../controllers/usersController");
const passportJWT = passport.authenticate("jwt",{session: false});


router.post("/oauth/google", passport.authenticate('googleToken', { session: false }), UserController.signUp);
router.get("/protected", passportJWT, UserController.protected)
router.get("/", UserController.getAll);
router.get("/show/:id", UserController.getUser);
router.put("/update/:id",passportJWT, UserController.updateUser);
router.delete("/delete/:id", passportJWT, UserController.deleteUser);



module.exports = router;
