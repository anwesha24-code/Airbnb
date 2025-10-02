const Listing=require("../models/listing");
const Review=require("../models/review.js");

module.exports.createReview = async (req, res) => {//passing validateReview as a middleware before putting in review db
    console.log(req.params.id);
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;//storing the id of the user who created the review


    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();

    req.flash("success", "New Review created");//gives flash after new review has been added
    // console.log("new review saved");
    // res.send("new review saved");
    res.redirect(`/listings/${req.params.id}`);
}
module.exports.destroyReview = async (req, res) => {
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })//deleting the review from the array inside listing 
    await Review.findByIdAndDelete(reviewId);//deleting the review from review db
    req.flash("success", "Review deleted");//gives flash after new review has been added

    res.redirect(`/listings/${id}`);
}