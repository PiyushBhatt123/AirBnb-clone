const express=require("express");
const router = express.Router();
const app = express();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const{isLoggedIn,isOwner,validateListing}=require("../middlweare.js");
const ExpressError=require("../utils/expressError");
const listingController=require("../controllers/listings.js");
const multer = require('multer')
const {storage}=require("../cloudConfig.js")
const upload = multer({storage})
const methodOverride=require("method-override");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// router.get("/",(req,res)=>{
//     res.send("hello app is working");
// })

router.route("/")
.get(wrapAsync(listingController.index))
.post(
    isLoggedIn,
    // validateListing,
    upload.single("listing[image][url]"),
    wrapAsync(listingController.createListings))
    
// .post(upload.single("listing[image][url]"),(req,res)=>{
//     res.send(req.file);
// })
router.get("/new",isLoggedIn,listingController.renderNewForm)
router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(
    isLoggedIn,
    upload.single("listing[image][url]"),
    isOwner,validateListing,
    wrapAsync(listingController.updateListings)
)
.delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListings));
router.get("/:id/update",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm))

// UPDATE ROUTE
module.exports = router;