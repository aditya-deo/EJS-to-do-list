const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/todolistDB");



const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));



const itemSchema = new mongoose.Schema({
    name: String
});

const Item = mongoose.model('item', itemSchema);



app.get("/", function(req, res){
    // noOfItems = listOfItems.length;

    Item.find(function(err,items){
        if(err){
            console.log(err);
        }
        else{
            res.render('list', {typeOfDay : "Today", listOfItems1 : items});
        }
    })
    
    
});



app.post("/", function(req,res){
    const itemToAdd = new Item({
        name: req.body.listItem
    })
    itemToAdd.save();
    
    res.redirect("/");
})


app.post("/clear", function(req, res){
    Item.deleteMany(function(err){
        if(err){
            console.log("Couldn't clear the To-do List. Sorry.")
        }
    });  
    res.redirect('/');
});


app.listen(3000, function(){
    console.log("Server started at port 3000.");
});


