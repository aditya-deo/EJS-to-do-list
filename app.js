const express = require('express');
const bodyParser = require('body-parser');


const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

var options = {
    weekday : "long",
    day : "numeric",
    month : "long"
};

var today = new Date();

var day = today.toLocaleDateString("en-US", options);

var listOfItems = [];
var noOfItems = 0;


app.get("/", function(req, res){
    // noOfItems = listOfItems.length;
    res.render('list', {typeOfDay : day, listOfItems1 : listOfItems});
});


app.post("/", function(req,res){
    listOfItems.push(req.body.listItem);
    res.redirect("/");
})


app.listen(3000, function(){
    console.log("Server started at port 3000.");
});


