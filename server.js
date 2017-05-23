var express = require('express');
var greetingsCount = 0;

var app = express();
var namesGreeted='';
var greeted=[];


app.get('/', function(req, res){
    res.send("Hello, Kala!")
});

app.get('/Greetings/:names', function(req, res){
  greeted.push(req.params.names);
  res.send("Greetings: " + req.params.names);
});

app.get('/Greeted', function(req, res){
  var name = req.params.name;
  var uniqueNames= [];

  for(var i=0;i<greeted.length;i++){
    if(uniqueNames.indexOf(greeted[i]) ===-1){
      uniqueNames.push(greeted[i]);
    //  Greetings[greetedNames]=0;
  }
}
  res.send(uniqueNames);
});


app.get('/Counter/:names', function(req, res){
var name = req.params.names;
var greetingsCount = 0;
for(var i=0;i<greeted.length;i++){
  if(greeted[i] === name){
    greetingsCount++;
}

  }
  res.send("Has been greeted" +' '+ greetingsCount +' ' +"time(s)");

});

const port=8000;
app.listen(port, function(){
console.log('web app started on port:'+port);

});
