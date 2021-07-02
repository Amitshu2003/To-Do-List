const express = require("express");
const bodyParser = require("body-parser");

const items = ["Buy Food","Cook Food","Eat Food"];
const workItems = [];
const app = express();

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.get("/",function(req,res){
  const today = new Date();

const options = {
  day : "numeric",
  weekday : "long",
  month : "long"

};

const day = today.toLocaleDateString("en-US",options);

res.render("list",{
  listTitle : day,
  newListItem : items
});

})

app.get("/work",function(req,res){
  res.render("list",{
    listTitle : "Work List",
    newListItem : workItems
  });
});


app.post("/",function(req,res){
if(req.body.list === "Work"){
  workItems.push(req.body.newItem);
  res.redirect("/work");
}else{
items.push(req.body.newItem);
res.redirect("/");
}
})


app.post("/work",function(req,res){
  const item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
})

app.get("/about",function(req,res){
  res.render("about");
});

app.listen(3000,function(){
  console.log("server is running on port 3000");
})
