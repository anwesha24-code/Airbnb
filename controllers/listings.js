const Listing = require("../models/listing");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAPBOX_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });


module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});//dont use then when u r already using await
    res.render("listings/index.ejs", { allListings });
    // console.log(allListings);
}

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
}

module.exports.showListing = async (req, res, next) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({
            path: "reviews",     //every listing has author
            populate: { path: "author" }
        }) //every review has its author
        .populate("owner");//not just id of reviews but also the content inside reviews is passed using populate
    if (!listing) {
        req.flash("error", "Listing you searched doesnt exist");
        return res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs", { listing });
}

module.exports.createListing = async (req, res, next) => {
    let response=await geocodingClient.forwardGeocode({
        query: req.body.listing.location,//storing the entered location
        limit: 1 //must be 1 as we want only one result
    })
        .send()
        
        
    let url = req.file.path;
    let filename = req.file.filename;
    console.log(url, "..", filename);
    // let {title,description,image,price,country,location}=req.body;
    //we have used listing[] so this shorter system can be used instead of the above one

    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;//stored the id of the user who created the listing
    newListing.image = { url, filename };

    newListing.geometry=response.body.features[0].geometry;//storing the coordinates of the location from mapbox
   
    let savedListing=await newListing.save();
    console.log(savedListing);
    req.flash("success", "new listing created");//gives flash after new listing has been added
    res.redirect("/listings");
}
module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing you searched doesnt exist");
        return res.redirect("/listings");//make sure you use return here so that it doesnt go to next line which will give error as listing is null
    }
    let original = listing.image.url;
    let changedImage = original.replace("/upload", "/upload/h_300,w_250/");//to resize the image to fit in the edit form
    res.render("listings/edit.ejs", { listing, changedImage });
}
module.exports.updateListing = async (req, res) => {

    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });//req.body.listing returns an object containing paramenters:values

    if (typeof req.file !== undefined) {//incase user doesnt upload new image then req.file will be undefined
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
        await listing.save();          //new image gets saved only if it is present in form otherwise no updation in data
    }


    req.flash("success", "Listing updated");//gives flash after new review has been added
    // console.log(...Object.values(req.body.listing));//... separates then out of a single object and passes them as paramter:value separated by commas
    // console.log(req.body.listing);
    req.flash("success", "Listing updated");
    res.redirect(`/listings/${id}`);
}
module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);//when findByIdAndDelete executes it calls 
    req.flash("success", "Listing deleted");//gives flash after new listing has been added
    console.log(deletedListing);//the middleware to delete the reviews of that listings as well
    res.redirect("/listings");
}