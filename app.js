var express = require("express");
var bodyParser= require("body-parser");
var mongoose = require("mongoose");
var locus = require("locus");

//eval(locus);

var app=express();

// app config
mongoose.connect(process.env.DATABASEURL);
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

// mongoose model config
var wordSchema = new mongoose.Schema({
    title: {type: String, unique: true},
    description: String,
    created: {type: Date, default:Date.now}
});

var Word = mongoose.model("Word",wordSchema);

// // test data
// Word.create({
//     title: "word",
//     description: "A single distinct meaningful element of speech or writing, used with others (or sometimes alone) to form a sentence and typically shown with a space on either side when written or printed."
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


app.listen(process.env.PORT,process.env.IP,function(){
    console.log("wordoftheday Server is RUNNING !!!");
});

