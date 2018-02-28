var express = require("express");
var bodyParser= require("body-parser");
var mongoose = require("mongoose");

var app=express();

mongoose.connect("mongodb://localhost/db_wordoftheday")
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("wordoftheday server is RUNNING !!!")
});