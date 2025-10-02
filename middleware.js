const Listing=require("./models/listing");
const review = require("./models/review.js");
const { listingSchema, reviewSchema } = require("./schema.js");//for listing db and review db schema 
const ExpressError = require("./utils/ExpressError.js");
const Review=require("./models/review.js");

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {//allow only logged in user to make new listing
        req.session.redirectUrl = req.originalUrl;//stores curr page then sends for login in diff page
        req.flash("error", "You must be signed in to create a listing");
        return res.redirect("/login");
    }
    next();//so that if user logged in it goes to next page whatever is predefined
}

module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    //checking if the user logged in is the one who created the listing
    if (!req.user._id.equals(listing.owner)) {
        req.flash("error", "You are not the owner of this listing");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }
    else next();
}

module.exports.validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }
    else next();
}

module.exports.isReviewAuthor= async (req, res, next) => {
    let {id, reviewId } = req.params;
    let review = await Review.findById(reviewId);
    //checking if the user logged in is the one who created the listing
    if (!review.author.equals(req.user._id)) {
        req.flash("error", "You are not the author of this review");
        return res.redirect(`/listings/${id}`);
    }
    next();
}