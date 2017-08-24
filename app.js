var express = require('express');
var exphbs =require ("express-handlebars");
var app = express();

//var bodyParser = require('body-parser');

// Register handlebars
app.engine("handlebars", exphbs({
  defaultLayout:"main",
  extname:"handlebars"
}));

app.set("view engine","handlebars");

// make Handlebars extention for views

app.get("/", function (req,res) {
  res.render("greetings")
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
