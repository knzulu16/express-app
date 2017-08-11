"use strict";
var express = require('express');
var exphbs = require('express-handlebars');

var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// var greetingsCount = 0;
var namesGreeted = {};
var access = require('./mangoose');

app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

const mongoURL = process.env.MONGO_DB_URL || "'mongodb://localhost/Greetings'";

mongoose.connect(mongoURL);
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}))

// parse application/json
app.use(bodyParser.json())

function storing(nameParam, cb) {
  var takesNames = new access.storeData({
    name: nameParam,
    greetingsCount: 1
  });
  takesNames.save(cb)
}


var greeted = [];


app.get('/', function(req,res){
  res.redirect('/Greetings');
})


app.get('/Greetings', function(req, res) {
  res.render('index');

});



app.post('/Greetings', function(req, res) {
  var name = req.body.person;
  var language = req.body.language;
  var greetNames = "";
  greeted.push(name);

  if (language === 'IsiXhosa') {
    greetNames = 'Molo ' + name

  } else if (language === 'English') {
    greetNames = 'Hello ' + name

  } else if (language === 'Afrikaans') {
    greetNames = "Goeie dag " + name

  }

  console.log(greetNames);





  storing(name, function() {
    access.storeData.count({}, function(err, greetingsCount) {
      if (err) {
        return err;
      } else {
        res.render('index', {
          output: greetingsCount,
          msg: greetNames

        })
      }
    });

  })

})

app.get('/Greeted', function(req, res) {
  res.render('index.form.handlebars', {
    names: greeted
  });
});

// app.get('/greeted', function(req, res) {
//   res.render("greeted.handlebars",{
//     greeted
//   });


// app.post('/Greeted',function(req,res){
//   var name=req.body.view;
//   var uniqueNames=[];
//   for(var i=0;i<greeted.length;i++){
//     if(uniqueNames.indexOf(greeted[i])===-1){
//       uniqueNames.push(greeted[i]);
//     }
//     console.log(uniqueNames);
//     res.render('index.handlebars',{
//       output:uniqueNames
//     });
//   }
//
// });

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
app.get('/Counter', function(req, res) {
  res.render('index.handlebars', {
    names: greeted
  });
});


app.post('/Counter/:names', function(req, res) {


});

const port = process.env.PORT || 8000;
app.listen(port, function() {
  console.log('web app started on port:' + port);

});
