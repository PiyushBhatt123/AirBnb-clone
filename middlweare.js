const Listing=require("./models/listing");
const Review=require("./models/reviews");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");
 module.exports.isLoggedIn= (req,res,next)=>{
    console.log(req.path,"...",req.originalUrl);
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","you must be loged in to register listing!");
        return res.redirect("/login");
    }
    next();
 }
 module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
 }
 module.exports.isOwner=async (req,res,next)=>{
    let{id}=req.params;
    let listing=await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser.id)){
       req.flash("error","you don't have permission to edit");
       return res.redirect(`/listings/${id}`);
    }
    next();
 }
 module.exports.validateListing=(req,res,next)=>{
       let {error}=listingSchema.validate(req.body)
        console.log(error)
        if(error){
            throw new ExpressError(error);
            // 400,result.error
        }
        else{
            next();
        }
}
module.exports.validateReview=(req,res,next)=>{
        // console.log(req.body)
       let { error } = reviewSchema.validate(req.body);
        if(error){
            let errMsg=error.details.map((el)=>el.message).join(",")
            // res.send(errMsg);
            throw new ExpressError(404,errMsg);
        }
        else{
              next();
        }
}
module.exports.isReviewAuthor=async(req,res,next)=>{
    let{id,reviewid}=req.params;
    let review=await Review.findById(reviewid);
    console.log(review);
    if(!review.author.equals(res.locals.currUser._id)){
       req.flash("error","you are not the author of this review");
       return res.redirect(`/listings/${id}`);
    }
    next();
 }

