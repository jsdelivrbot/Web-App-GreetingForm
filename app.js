var express = require('express');
var bodyParser = require("body-parser");
var exphbs =require ("express-handlebars");

var app = express();
//body Parser middleware
app.use(bodyParser.urlencoded({extended:false}));

//expose express static folder
app.use(express.static('public'));

// Register handlebars
app.engine("handlebars", exphbs({
  defaultLayout:"main",
  extname:"handlebars"
}));

app.set("view engine","handlebars");

// make Handlebars extention for views
app.get("/", function (req,res) {
  res.render("greetings");


});
// create an object


// //display textbox input
app.post("/greeted" ,function (req,res){

  var textVal =req.body.textbox;

  res.render("greetings", {
    textVal: textVal
  });
});

 var server = app.listen(3000, function () {
 var host = server.address().address;
var port = server.address().port;
 });

// var host = process.env.HOST || "http://localhost";
// var port = process.env.PORT || 3000;
//
//
//  console.log('Example app listening at %s:%s', host, port);
