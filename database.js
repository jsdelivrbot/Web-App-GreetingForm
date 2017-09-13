const mongoose = require('mongoose');
const mongoURL = process.env.MONGO_DB_URL || "mongodb://localhost/database";

mongoose.connect(mongoURL,function(err, result) {
  if (err) {
    console.log(err);
  }else {
    console.log("Connected to database.");
  }
});


var UserSchema = mongoose.Schema({
    name: String,
    count: Number

});



var user = mongoose.model('greeting', UserSchema);
module.exports = user;
