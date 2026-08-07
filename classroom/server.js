const express=require("express");
const app=express();
const users=require("./routes/user.js");
const post=require("./routes/post.js");
const session=require("express-session");
const flash=require("connect-flash");
const path=require("path");
const sessionOptions= {
      secret:"mynewsecrate",
      resave:'false',
      saveUninitialized:true,
    }

app.use(session(sessionOptions));
app.use(flash());

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use((req,res,next)=>{
   req.locals.successMsg=req.flash("success");
    req.locals.errorMsg=req.flash("error");
    next();
})
app.get("/register",(req,res)=>{
    let {name="anoymous"}=req.query;
    if(name=="anoymous"){
       req.flash("error","please enter a valide name");
    }
    else{
        req.flash("success","user enterted succesfully");
    }
    req.session.name=name;
    res.redirect("/hello");
   
})
app.get("/hello",(req,res)=>{
    res.render( "page.ejs",{name:req.session.name});
})
app.get("/",(req,res)=>{
    res.send("app is listining at port 3000");
})
app.get("/test",(req,res)=>{
    res.send("test successful!");
})
app.get("/reqcount",(req,res)=>{
    console.log(req.session);
    if(req.session.count){
        req.session.count++;
    }
    else{
        req.session.count=1;
    }
    res.send(`you send the request ${req.session.count}  times`);
})
app.listen(3000,()=>{
    console.log("app is listen at port 3000");
})