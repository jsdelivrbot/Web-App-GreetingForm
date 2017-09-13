
const mongoURL = process.env.MONGO_DB_URL || "'mongodb://localhost/database'";

mongoose.connect(mongoURL);






// getting-started.js
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/database',function(err,result){
  if (err) {
    console.log(err);
  }
  else {
    console.log("Connected");
  }
});

var UserSchema = mongoose.Schema({
    name: String,
    count: Number

});



var user = mongoose.model('greeting', UserSchema);
module.exports = user;
