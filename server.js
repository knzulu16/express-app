var express = require('express');
// const SubjectRoutes=require('/subjects');
// const subjectRoutes=SubjectsRoutes();
var app = express();
var storedNames='';
var greeted=[];

app.get('/', function(req, res){
    res.send("Hello, Kala!")
});

app.get('/Greetings/:id', function(req, res){
  console.log(req.params.id);
  greeted.push(req);
  res.send("Greetings: " + req.params.id)
});



// req.get('/urls/:param_one/url_part2/:param_two', function(req, res){
//
//     for(var i=0;i<storedNames.length;i++){
//       greeted.push(storedNames[i]);
//     }
// });


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
