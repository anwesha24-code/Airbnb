const express = require("express");
const router = express.Router();//merge params is for this file to be able to access the id which was there in app.js file
const User = require("../models/user.js");//since Db is going to be accessed to store user info
const wrapAsync = require("../utils/wrapAsync");//for error handling
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/users.js");


router
.route("/signup")
.get((req, res) => {
    res.render("users/signup.ejs")
})
.post(wrapAsync(userController.createUser));



router
.route("/login")
.get( (req, res) => { //goes to login page
    res.render("users/login.ejs");
})
//adds middleware passport to check if user exists and if password is correct if fails then redirects to /login again
//saveRedirectUrl is used to save the url where user left off before being redirected to login page so that now it gets redirected to that page
.post(saveRedirectUrl, 
    passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }), 
    wrapAsync(userController.loginUser));

    

//logout route using passport
router.get("/logout", userController.logoutUser);

module.exports = router;