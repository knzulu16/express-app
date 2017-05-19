var express = require('express');
// const SubjectRoutes=require('/subjects');
// const subjectRoutes=SubjectsRoutes();
var app = express();

var count = 0;
var greeted=[];

app.get('/', function(req, res){
    res.send("Hello, Kala!")
});

app.get('/Greetings/:id', function(req, res){
  greeted.push({'name':req.params.id});
  res.send("Greetings: " + req.params.id)
});

app.get('/Greeted', function(req, res){
  res.send(greeted);
});

app.get('/Counter', function(req, res){
  count++;
  res.send("Greeted"+count+"times");
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
// });
