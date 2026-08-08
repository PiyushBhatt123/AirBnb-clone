if(process.env.NODE_ENV!="production"){
    require("dotenv").config();
}
const express=require("express");
const app=express();
const cors = require("cors");
const path=require("path");
const mongoose=require("mongoose");
const wrapAsync=require("./utils/wrapAsync.js");
const methodOverride=require("method-override");
const session=require("express-session");
const flash=require("connect-flash");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");
const mongoStore=require("connect-mongo").default;
app.use(methodOverride("_method"));
const{listingSchema,reviewSchema}=require("./schema.js");
const Review=require("./models/reviews.js");
const ejsMate=require("ejs-mate");
app.engine("ejs",ejsMate);
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
let dbUrl=process.env.ATLASDB_URL

// SESSION AND FLASH MIDDLEWARE (CORRECT ORDER)
const store=mongoStore.create({
    mongoUrl:dbUrl,
    crypto:{
      secret:process.env.SECRET
    },
    touchAfter:24*3600,
})
store.on("error",()=>{
    console.log("error in mongo session store",err);
})
const sessionOptions={
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true,
    }
}
app.use(session(sessionOptions));
app.use(flash());

// PASSPORT MIDDLEWARE
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const listingRouter=require("./routes/listing.js");
const reviewRouter=require("./routes/review.js");
const userRouter=require("./routes/user.js");
const Listing = require("./models/listing.js");


app.use(express.static(path.join(__dirname,"/public")));
main().
then((res)=>{
    console.log("databse is connectede");
})
.catch((err)=>{
    console.log(err)
})
async function main(){
    await mongoose.connect(dbUrl);
}
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

// Flash middleware setup
app.use((req,res,next)=>{ 
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;
    next();
})

// app.get("/",(req,res)=>{
//     res.send("app is listening at port 8080")
// });

// app.get("/demouser",(req,res,next)=>{
//     let fakeUser=new User({
//         email:"student@gmail.com",
//         username:"delta-student"
//     })
//    User.register(fakeUser,"helloword",(err,user)=>{
//        if(err){
//            return next(err);
//        }
//        res.send(user);
//    });
// })

app.use("/listings/:id/reviews",reviewRouter);
app.use("/listings",listingRouter);
app.use("/",userRouter);

// DELETE ROUTE

// app.all("*",(req,res,next)=>{
//     next(new expressError(404,"page not found"));
// });
// app.use("/listings",(err,req,res,next)=>{
//   let{statusCode=500,message="something went wrong"}=err;
//   req.flash("error",message);
//   res.redirect("/listings");
// })
app.listen("8080",()=>{
  console.log("app is listneanig at port 8080");
});


