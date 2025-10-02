const User = require("../models/user");
const passport = require("passport");


module.exports.createUser = async (req, res,next) => {
    //we put them in try catch so that f error like duplicate username occurs it gets redirected to signup page after showing username exists
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ username, email });
        const registeredUser = await User.register(newUser, password);//register method is added by passport-local-mongoose
        console.log(registeredUser);

        req.login(registeredUser, err => {//to login the user immediately after signup instead of asking to login again)
            if (err) return next(err);
            req.flash("success", "Welcome to Wanderlust");
            res.redirect("/listings");
        });


    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/signup");
    }

}

module.exports.loginUser = async (req, res) => {
    req.flash("success", "Welcome back");
    let redirectUrl=res.locals.redirectUrl || "/listings";//if redirectUrl is not there then it goes to /listings
    delete req.session.redirectUrl; // clear it after using
    res.redirect(redirectUrl);//gets redirected to page where it left off
}

module.exports.logoutUser = (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "Logged out successfully");
        res.redirect("/listings");
    });
}