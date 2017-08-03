mongoose.connect('mongodb://localhost/server');
var storeData=mongoose.model('takes',{name:string,namesGreeted:Number});
