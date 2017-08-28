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

// //display textbox input
app.post("/greeted" ,function (req,res){
  var language = req.body.language;
  var textVal =req.body.textbox;
  var greetedUser = "";


//////Test counter
var greeted=[];
var textVal = req.params.textbox;

greeted.push(textVal);


var textVal = req.params.textbox;
greeted.forEach(function(textVal) {
if(greeted[textVal] === undefined) {
  greeted[textVal] = 0;
}
  greeted[textVal] = greeted[textVal] + 1;
});
console.log(greeted);


res.send(req.params.textbox  + " has been greeted " + greeted[textVal] + " time(s)");




//////////////////Test counter

if (language === "isiXhosa") {
   greetedUser = "Molo " + textVal;
}
else if (language === "English") {
  greetedUser = "Hello " + textVal;
}
else if (language === "Afrikaans") {
  greetedUser = "Halo " + textVal;
}
  res.render("greetings", {
    textVal: greetedUser

  });

});

app.set("port",(process.env.PORT || 5000));
app.listen(app.get("port"), function() {
  console.log('node app is running on port', app.get('port'));
});
