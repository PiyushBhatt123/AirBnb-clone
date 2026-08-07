const express=require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {  reviewSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
const Review=require("../models/reviews.js");
const {validateReview,isLoggedIn,isReviewAuthor}=require("../middlweare.js");
const reviewController=require("../controllers/reviews.js")
router.post("/",validateReview,isLoggedIn,wrapAsync(reviewController.createReview));
router.delete("/:reviewid",isReviewAuthor,wrapAsync(reviewController.destroyReview));
module.exports=router;