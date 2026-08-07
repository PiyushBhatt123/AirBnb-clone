const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing=require("../models/listing.js");
console.log(initData);
main().
then((res)=>{
    console.log("databse is connectede")
})
.catch((err)=>{
    console.log(err)
})
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlist')
};
const database=async ()=>{
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({...obj,owner:'6a07529d295cfbffac02a464'}))
    await Listing.insertMany(initData.data);
    console.log("data is initilize")
};
database();



