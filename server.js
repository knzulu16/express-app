var express = require('express');
// const SubjectRoutes=require('/subjects');
// const subjectRoutes=SubjectsRoutes();
var nameCounts={};
var app = express();
var namesGreeted='';
var greeted=[];


app.get('/', function(req, res){
    res.send("Hello, Kala!")
});

app.get('/Greetings/:names', function(req, res){
  greeted.push({'name':req.params.names});
  res.send("Greetings: " + req.params.names);
});

app.get('/Greeted', function(req, res){
  res.send(greeted);
});

app.get('/Counter/:name', function(req, res){
var name = req.params.name;
var greetingsCount = 0;

for(var i=0;i<greeted.length;i++){
  if(greeted[i].name === name){
    greetingsCount++;
}
  // greeted.forEach(function(nam
  }
    // console.log(nameCounts);
    res.send("Has been greeted"+""+greetingsCount+""+"times");
    // res.send(greeted.length);
});

const port=8000;
app.listen(port, function(){
console.log('web app started on port:'+port);

});




//
//  var host = server.address().address;
//  var port = server.address().port;
//
//  console.log('Example app listening at http://%s:%s', host, port);
//
