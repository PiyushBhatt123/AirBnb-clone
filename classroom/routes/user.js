const express=require("express");
const router=express.Router();
router.get("/",(req,res)=>{
    res.send("get data for the users");
})
// show -user
router.get("/:id",(req,res)=>{
    res.send("get data for the users");
})
// post -user
router.post("/users",(req,res)=>{
    res.send("post data for the users");
})
// delete user
router.delete("/:id",(req,res)=>{
    res.send("delete for posts");
});
module.exports=router;