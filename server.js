"use strict";
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var app = express();

var greetingsCount = 0;
var namesGreeted = {};


app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

var greeted = [];

app.get('/Greetings', function(req, res) {
  res.render('index');

});



app.post('/Greetings', function(req, res){
  var name = req.body.person;
  var language = req.body.language;

  greeted.push(name);

  if (language === 'IsiXhosa') {
    greetingsCount++;
    res.render('index', {
      msg: 'Molo ' + name,
      output:"Has been greeted" + ' ' + greetingsCount + ' ' + "time(s)"


    });

  } else if (language === 'English'){
    greetingsCount++;
    res.render('index',{
      msg: 'Hello ' + name,
      output:"Has been greeted" + ' ' + greetingsCount + ' ' + "time(s)"

    });
  } else if (language === 'Afrikaans'){
    greetingsCount++;
    res.render('index', {
      msg: "Goeie dag " + name,
      output:"Has been greeted" + ' ' + greetingsCount + ' ' + "time(s)"
    });
}else if
(namesGreeted[name]==undefined){
  greetingsCount++;
  res.render("index",{
    output:"Has been greeted" + ' ' + greetingsCount + ' ' + "time(s)"

  });


}

//     for (var i = 0; i < greeted.length; i++){
//       if (greeted[i] === name){
//         greetingsCount++;
//         console.log(greetingsCount);
//
//       res.render("index",{
//         output:"Has been greeted" + ' ' + greetingsCount + ' ' + "time(s)"
//
//       });
//     }
// }


});


app.get('/Greeted',function(req, res){
res.render('index.form.handlebars',{names:greeted});
});

// app.get('/greeted', function(req, res) {
//   res.render("greeted.handlebars",{
//     greeted
//   });


app.post('/Greeted',function(req,res){
  var name=req.body.view;
  var uniqueNames=[];
  for(var i=0;i<greeted.length;i++){
    if(uniqueNames.indexOf(greeted[i])===-1){
      uniqueNames.push(greeted[i]);
    }
    console.log(uniqueNames);
    res.render('index.handlebars',{
      output:uniqueNames
    });
  }

});

// app.post('/Greetings', function(req, res) {
//   res.render('index', {
//     output: msg
//   });
// });
// app.get('/', function(req, res){
//     res.send("Hello, Kala!")
// });



// app.get('/Greeted', function(req, res) {
//   var name = req.params.name;
//   var uniqueNames = [];
//
//   for (var i = 0; i < greeted.length; i++) {
//     if (uniqueNames.indexOf(greeted[i]) === -1) {
//       uniqueNames.push(greeted[i]);
//       //  Greetings[greetedNames]=0;
//     }
//   }
//   res.send(uniqueNames);
// });
app.get('/Counter',function(req, res){
res.render('index.handlebars',{names:greeted});
});


app.post('/Counter/:names', function(req, res){


});

const port = 8000;
app.listen(port, function() {
  console.log('web app started on port:' + port);

});
