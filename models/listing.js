const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    image: {

        url: String,
        filename: String,
        
        // type: String,
        // //if image couldnt be fetched or doesnt exist
        // default: "https://media.istockphoto.com/id/1046313926/photo/indian-bikers-travel-on-national-highway-with-scenic-landscape-at-ladakh-india.jpg?s=1024x1024&w=is&k=20&c=jqebX6oasipVv0rq0VWuovc_to67_TaXVx4efTwfHkw=",
        // //if the user doesnt enter any url the default value image url is given 
        // set: (v) =>
        //     v === "" ?
        //         "https://media.istockphoto.com/id/1046313926/photo/indian-bikers-travel-on-national-highway-with-scenic-landscape-at-ladakh-india.jpg?s=1024x1024&w=is&k=20&c=jqebX6oasipVv0rq0VWuovc_to67_TaXVx4efTwfHkw="
        //         : v,
    },
    price: {
        type: Number,
    },
    location: {
        type: String,
    },
    country: {
        type: String,
    },
    reviews: [//each listing will have multiple reviews that will be stores in lists as objects
        {
            type: Schema.Types.ObjectId,//to connect listing to review
            ref: "Review",
        }
    ],
    owner:{//listing authorisation references user
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    //this type of data is called geojson data
    geometry:{//to store the coordinates of the location entered
        type:{
            type:String,
            enum:["Point"],//geometry type must be point
            required:true,
        },
        coordinates:{
            type:[Number],//array of numbers
            required:true,
        }
    }
});

//whenever a listing is deleted the reviews are automatically deleted
listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } })

    }
})

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;