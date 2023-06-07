const express = require("express");
const app = express();
const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine", "ejs");
var items = ["Study"];
var workitems = [];
app.get("/", function(req, res){

   var today = new Date();
   var options =    {
    weekday:"long",
    day :"numeric",
    month:"long"
   };
   var day = today.toLocaleDateString("en-US", options)   
 
   
   res.render("list", {listtitle:day,newlistItems:items});
})
app.post("/", function(req, res){
    
   var item = req.body.newitem;
   if(req.body.list == "work")
   {
    workitems.push(item);
    res.redirect("/work");
   }
   else
   {
    items.push(item);
    res.redirect("/");
   }
   
})

app.get("/work", function(req, res)
{
    res.render("list", {listtitle:"work list",newlistItems:workitems })

})

app.post("/work", function(req, res)
{
    let item = req.body.newitem;
    workitems.push(item);
    res.redirect("/work")
})
app.listen(3000, function()
{
    console.log("server started on the port 3000");
}) 