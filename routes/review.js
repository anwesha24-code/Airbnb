const express = require("express");
const router = express.Router({mergeParams:true});//merge params is for this file to be able to access the id which was there in app.js file
const wrapAsync = require("../utils/wrapAsync");//for error handling

const Listing = require("../models/listing");
const Review=require("../models/review.js");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");

const reviewController=require("../controllers/reviews");
//reviews shows up on the same page as individual listing
router.post("/",isLoggedIn, validateReview,wrapAsync(reviewController.createReview));

//deleting reviews of a specific listing
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.destroyReview))

module.exports=router;