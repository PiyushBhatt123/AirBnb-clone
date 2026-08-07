const Listing = require("../models/listing.js");
const Review=require("../models/reviews.js");
module.exports.createReview=async(req,res)=>{
    console.log(req.body.id);
    let listing=await Listing.findById(req.params.id);
    let newReview=new Review(req.body.review);
    newReview.author=req.user._id;
    listing.reviews.push(newReview);
    console.log(newReview);
    await newReview.save();
    await listing.save()
    req.flash("success","new review created");
    res.redirect("/listings");
}
module.exports.destroyReview=async(req,res)=>{
    let{id,reviewid}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewid}})
    await Review.findByIdAndDelete(reviewid);
    req.flash("success","listing deleted");
    res.redirect(`/listings/${id}`);
}