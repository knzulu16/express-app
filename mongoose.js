var mongoose=require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/Greetings",
{
  useMongoClient:true
});

exports.storeData=mongoose.model('storeData',{
  greetingsCount:Number,
  name: {
    type:String,
    unique:true
  }
});
