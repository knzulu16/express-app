var mongoose=require('mongoose');
mongoose.connect("mongodb://localhost/Greetings",
{
  useMongoClient:true
});

exports.storeData=mongoose.model('storeData',{
  greetingsCount:Number,
  name:String
});
