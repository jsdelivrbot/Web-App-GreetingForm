
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/greeted');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {

console.log("we are connected!");
useMongoClient: true;
//Create a Schema
var Workshop = mongoose.model('greeted', {
    name: String,

});
//Compile schema into a model
var database= new Workshop({name:"Thabiso"});
 database.save(function (err){
   if(err){
console.log(err);

   }
   else{
     console.log(database);
   }
 })
});
