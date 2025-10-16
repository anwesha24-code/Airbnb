const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");//for error handling

const Listing = require("../models/listing");
const { isLoggedIn, isOwner, validateListing} = require("../middleware.js");


const listingController=require("../controllers/listings.js");

//for image upload
const multer  = require('multer');
const { storage } = require("../cloudConfig.js");//cloud storage
const upload = multer({ storage });//folder where images will be stored or storage for storing in cloudinary


router
.route("/")
//main page calling along with allListings passed                                                           //DISPLAY PAGE
.get(wrapAsync(listingController.index))
//after clicking on submit for new creation of listing it saves it in DB and redirects to display page   //NEW PAGE FORM --SUBMIT-->SAVE IN DB---> DISPLAY PAGE
//Create Route
.post(isLoggedIn, 
    validateListing,
    upload.single('listing[image]'),//calls schema checking as it is a middleware
    wrapAsync(listingController.createListing));
// .post((req,res)=>{
//     res.send(req.file);//req.file contains info about uploaded file
// });



//make sure to keep this get above the get with /:id becoz otherwise it thinks new is the id              //DISPLAY PAGE --CREATE NEW LISTING--> NEW PAGE
//opens when create new llisting button is created
//New Route
router.get("/new",isLoggedIn, listingController.renderNewForm);


                                                                                                        // SEARCH Route — filter listings by title or location
router.get("/search", wrapAsync(async (req, res) => {
    // taking out the searched text
  const query = req.query.q?.trim();
  if (!query) {
    // if empty search, just show all listings
    const allListings = await Listing.find({});
    return res.render("listings/index", { allListings });
  }

  // Case-insensitive search in title OR location
  const allListings = await Listing.find({
    // we use $or because either title or location matches will be displayed
    $or: [
        // syntax
      { title: { $regex: query, $options: "i" } },
      { location: { $regex: query, $options: "i" } },
    ],
  });

// rendering the filtered out search matches
  res.render("listings/index", { allListings });
}));

router
.route("/:id")
//after /.... so that .... is not thought to be the id                                                   //DISPLAY PAGE --LINK OF LISTING--> SHOW PAGE FOR SPECIFIC LISTING 
//Show Route
.get(wrapAsync(listingController.showListing))

//after clicking submission of edit finds by id(extracted from curr url)                            //EDIT PAGE --SAVE EDIT BUTTON-->UPDATES IN DB--> SHOW PAGE
// and updates("where id=id given",{all the new values entered})
//Update Route

.post(isLoggedIn,
    validateListing,//checking schema validation before putting data in db 
    isOwner, 
    upload.single('listing[image]'),//calls schema checking as it is a middleware
    wrapAsync(listingController.createListing))
//on clicking delete for a listing the id is fround in DB and data is removed                      //SHOW PAGE --DELETE BUTTON-->DELETES FROM DB-->DISPLAY PAGE
//Delete Route
.delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));



//goes to the edit page that has the form                                                             //SHOW PAGE --EDIT BUTTON--> EDIT PAGE
//Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm))

module.exports = router;