var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const mongoURL = process.env.MONGO_DB_URL || "mongodb://localhost/Greetings";

console.log("mongoURL");
console.log(mongoURL);
mongoose.connection.on("error", function(err){
  console.log("err");
})
mongoose.connect(mongoURL, {
  useMongoClient: true
});

exports.storeData = mongoose.model('storeData', {
  greetingsCount: Number,
  name: {
    type: String,
    unique: true
  }
});
