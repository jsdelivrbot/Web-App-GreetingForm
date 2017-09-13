//require global scope
var express = require('express');
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var app = express();
var data = require("./database");
var app = express();
// var mongoose = require('mongoose');
// mongoose.connection.on("error", function (err) {
//   console.log(err);
// });
//
// mongoose.connect(mongoURL,{useMongoClient:true})
//body Parser middleware////////////
app.use(bodyParser.urlencoded({
    extended: false
}));
////////////////////////////////////
//expose express static folder
app.use(express.static('public'));

// Register handlebars///////////////
app.engine("handlebars", exphbs({
    defaultLayout: "main",
    extname: "handlebars"
}));
/////////////////////////////////////
//set engine and make Handlebars extention for views/////
app.set("view engine", "handlebars");
////////////////////////////////////////////////////////////

//create get request in root directory////////////////////////////
app.get("/", function(req, res) {
    data.count(function(err, counter) {
        console.log("Counter Value:" + counter);
        res.render("greetings", {
            textVal: greetedUser,
            count: counter
        });
    })
});

// //display textbox input////////////////////////
var greetedUser = "";

//create post request for greeted users//////////////////
app.post("/", function(req, res) {
    var language = req.body.language;
    var textVal = req.body.textbox;

    var greeted = [];
    greeted.push(textVal);
    data.findOne({
        name: textVal
    }, function(err, results) {
        if (err)
            console.log(err);
        else if (results) {
            data.update({
                name: textVal
            }, {
                $inc: {
                    count: 1
                }
            }, function(err, results) {
                if (err)
                    console.log(err);
                data.count(function(err, results) {
                    res.render("greetings", {
                        count: results
                    });
                });
            })

        } else {

            var newUser = new data({
                name: textVal,
                count: 1
            });



            newUser.save(function(err, results) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(results);
                }
                data.count(function(err, counter) {
                    console.log("Counter Value:" + counter);
                    res.render("greetings", {
                        textVal: greetedUser,
                        count: counter

                    });

                })
            });


            ///different greeting languages////////////////////////
            if (language === "isiXhosa") {
                greetedUser = "Molo " + textVal;
            } else if (language === "English") {
                greetedUser = "Hello " + textVal;
            } else if (language === "Afrikaans") {
                greetedUser = "Halo " + textVal;
            }
        }
    })
});
////////////////////////////////////////////////////////

//////Clear data/////////////////
app.get("/reset", function(req, res) {
    data.remove({}, function(err) {
        if (err)
            console.log(err);
        data.count(function(err, counter) {
            res.render("greetings", {
                count: counter
            });
        })
    })

})

app.get("/greeted/:name", function(req, res) {
    data.findOne({
        name: req.params.name
    }, function(err, result) {
        res.render("greeted", {
            name: result.name,
            count: result.count
        });
    })
})
app.get("/greeted", function(req, res) {
    data.find({}, function(err, results) {
        if (err)
            console.log(err);

        else {
            res.render("greetedUsers", {
                greetednames: results
            })
        }
    })

});




app.set("port", (process.env.PORT || 5000));
app.listen(app.get("port"), function(err) {
    console.log('node app is running on port', app.get('port'));

});
