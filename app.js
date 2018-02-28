var express = require("express");
var bodyParser= require("body-parser");
var mongoose = require("mongoose");
var locus = require("locus");
var moment = require("moment");

//eval(locus);

var app=express();

// app config
mongoose.connect(process.env.DATABASEURL);
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

// mongoose model config
var wordSchema = new mongoose.Schema({
    title: {type: String, unique: true,required: true},
    meaning: {type: String,required: true},
    created: {type: Date, default:Date.now}
});

var Word = mongoose.model("Word",wordSchema);

// // test data
// Word.create({
//     title: "word",
//     meaning: "A single distinct meaningful element of speech or writing, used with others (or sometimes alone) to form a sentence and typically shown with a space on either side when written or printed."
// });

//RESTful routes
app.get("/", function(req,res){
    res.redirect("/words");
});

app.get("/words",function(req,res){
    Word.find({},function(err,words){
        if(err){
            console.log("Error!");
        } else {
            res.render("index",{words: words});
        }
    });
});

//new word route
app.get("/words/new",function(req,res){
    res.render("new");
});

// crearte word route
app.post("/words",function(req,res){
    
    console.log(req.body.word);
    Word.create(req.body.word,function(err,newWord){
        if(err){
            console.log("Error!");
            res.render("new");
        } else {
            res.redirect("/words");
        }
    });
});

// show route
app.get("/words/:id",function(req,res){
    Word.findById(req.params.id,function(err,foundWord){
        if(err){
            res.redirect("/words");
        } else {
            foundWord.dateTime=moment(foundWord.created).format("dddd, MMMM Do YYYY");  //Format cretaed datetime
            res.render("show",{word: foundWord});
            //eval(locus);
        }
    });
});


app.listen(process.env.PORT,process.env.IP,function(){
    console.log("wordoftheday Server is RUNNING !!!");
});

