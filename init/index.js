//to require and enter the sample data into the db once
const mongoose=require("mongoose");
const initData=require("./data");
const Listing=require("../models/listing");

const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";

main()
.then(()=>{
    console.log("connected to DB");
})
.catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(MONGO_URL);
}
const initDB=async () =>{
    await Listing.deleteMany({});
    //we add owner property after creating the initData object and run this file node index.js once to add the data to db
    initData.data=initData.data.map((obj)=>({...obj,owner:new mongoose.Types.ObjectId("68cce90c33d99dbdb2a367ce"),}));
    await Listing.insertMany(initData.data);
    console.log("data was initialised");
}
initDB();