const Listing = require("./models/listing");

if(process.env.NODE_ENV!=="production"){
    require('dotenv').config();
}
console.log(process.env.SECRET);
//---------------------universal------------------
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");//for frontend
const wrapAsync = require("./utils/wrapAsync");//for error handling
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema,reviewSchema } = require("./schema.js");//for listing db and review db schema 
const Review=require("./models/review.js")//for review db schema

const listingsRouter=require("./routes/listing.js");//express routing for clean structuring of app.js
const reviewsRouter=require("./routes/review.js");//express routing for clean structuring of app.js
const userRouter = require("./routes/user.js");

const session=require("express-session");
const MongoStore=require("connect-mongo");//to store session in db
const flash=require("connect-flash");//for connect-flash one time notification
//these 3 things to be used for authentication
const passport=require("passport");
const localStrategy=require("passport-local");
const User=require("./models/user.js");

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "/public")));//to use css file
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);//for frontend

// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

const dburl=process.env.ATLASDB_URL;//for atlas hosting

main()
    .then(() => {
        console.log("connected to DB");
    })
    .catch((err) => {
        console.log(err);
    })
async function main() {
    await mongoose.connect(dburl);//atlas hosting//name of database
}


//connect-mongodb for session store in db
const store=MongoStore.create({
    mongoUrl:dburl,
    crypto:{
        secret:process.env.SECRET,
    },
    touchAfter:24*60*60//in seconds
});

//if error in session store
store.on("error",()=>{
    console.log("session store error");
});

//session working
const sessionOptions={
    store:store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    //adding cookie options to set expiry date
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true,
    }
}


// app.get("/", (req, res) => {
//     res.send("root is working");
// })
//---------------------universal------------------

app.use(session(sessionOptions));
app.use(flash());//must be used before passing the routes

//these must be after session is used so that user doesnt have to login on every page
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));//authenticate method is added by passport-local-mongoose

passport.serializeUser(User.serializeUser());//how to store user in session
passport.deserializeUser(User.deserializeUser());//how to get user out of session

app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;//so that req,user can be used in navbar.ejs where we display login logout depending on whether user is logged in or not
    next();
});

// app.get("/demouser",async (req,res)=>{
//     let fakeUser=new User({username:"meeee",email:"student@gmail.com"});
//     let registeredUser=await User.register(fakeUser,"password123");//register method is added by passport-local-mongoose
//     res.send(registeredUser);
// });

app.use("/listings",listingsRouter);                        //searches every path starting with /listing to listing.js
app.use("/listings/:id/reviews",reviewsRouter);            //this id ends up staying in this file...it doesnt go to reviews file
                                                    //so we have to write like this in review.js const router = express.Router({mergeParams:true});
app.use("/",userRouter);            //this id ends up staying in this file...it doesnt go to reviews file

// app.get("/testListing",async (req,res)=>{
//     let sampleListing=new Listing({
//         title:"My New Villa",
//         description:"By roadtrips",
//         price:5000,
//         location:"Patagonia",
//         country:"India",
//     });
//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("successful testing");
// });



//for any other random route we call custom error
app.all(/.*/, (req, res) => {
    req.flash("error", "Page not found");
    res.redirect("/listings");
});

//middleware to handle data
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "some error occurred" } = err;
    // res.send(statusCode).send(message);
    res.status(statusCode).render("error.ejs", { message });
})

const port = 8000;
app.listen(port, () => {
    console.log("working");

})