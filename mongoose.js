var mongoose=require('mongoose');
var Schema = mongoose.Schema;

const mongoURL = process.env.MONGO_DB_URL || "mongodb://localhost/Greetings";

mongoose.connect(mongoURL, {
  useMongoClient:true
});

exports.storeData=mongoose.model('storeData',{
  greetingsCount:Number,
  name: {
    type:String,
    unique:true
  }
});
