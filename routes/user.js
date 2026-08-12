const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync");
const passport=require("passport");
const{saveRedirectUrl}=require("../middleware");
const controllers=require("../controllers/users.js");
router.route("/signup")
.get(controllers.renderSignUp)
.post(wrapAsync(controllers.signup));
router.route("/login")
.get(controllers.renderLoginForm)
.post(saveRedirectUrl,passport.authenticate("local",{
    failureRedirect:"/login",
    failureFlash:true,
}),saveRedirectUrl,controllers.login)
router.get("/logout",controllers.logout);
module.exports=router;