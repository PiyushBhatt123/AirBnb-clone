const Listing=require("../models/listing");
const ExpressError = require("../utils/expressError.js");
module.exports.index=async (req,res)=>{
    let allListing=await Listing.find()
    res.render("index.ejs",{allListing});
}
module.exports.renderNewForm=(req,res)=>{
    res.render("new.ejs")
}
module.exports.showListing=async (req,res)=>{
    let {id}=req.params;
    const listing= await Listing.findById(id)
    .populate({path:"reviews",
        populate:{
            path:"author"
        },
    }).populate("owner");
    if(!listing){
        throw new ExpressError(404,"listing not found");
    }
    console.log(listing);
    res.render("show.ejs",{listing,mapToken:process.env.MAP_TOKEN});
}
module.exports.createListings=async (req,res,next)=>{
     let url=req.file.path;
     let filename=req.file.filename;
    //  console.log(url,filename);
     const newListing=new Listing(req.body.listing);
     newListing.owner=req.user._id;
     newListing.image={url,filename}
     await newListing.save();
    //  if(req.file){
    //      newListing.image={
    //          url:req.file.path,
    //          filename:req.file.filename
    //      };
    //  }
     
    //  console.log(newListing)
    //  await newListing.save();
     req.flash("success","new listing createded");
     res.redirect("/listings");
}
module.exports.renderEditForm=async (req,res)=>{
     let {id}=req.params;
     const listing=await Listing.findById(id);
     res.render("edit.ejs",{listing});
}
module.exports.updateListings=async(req,res)=>{
    let {id}=req.params;
    let listing=await Listing.findByIdAndUpdate(id, {...req.body.listing});
    if(typeof req.file !== "undefined"){
    let url=req.file.path;
    let filename=req.file.filename;
    listing.image={url,filename};
    await listing.save();
    }
    
    req.flash("success","listing updated")
    res.redirect(`/listings/${id}`);
}
module.exports.destroyListings=async (req,res)=>{
    let {id}=req.params;
    let deleteData=await Listing.findByIdAndDelete(id);  
    console.log(deleteData);
    req.flash("success","Listing Deleted");
    res.redirect("/listings");
}