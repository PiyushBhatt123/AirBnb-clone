const express=require("express");
const router=express.Router(mergeParams=true);
router.get("/",(req,res)=>{
    res.send("get data for the posts");
})
// show -posts
router.get("/:id",(req,res)=>{
    let{id}=req.params
    res.send(`get data for the posts ${id} `);
})
// post -posts
router.post("/posts",(req,res)=>{
    res.send("post data for the posts");
})
// delete posts
router.delete("/posts/:id",(req,res)=>{
    res.send("delete for posts");
})
module.exports=router;