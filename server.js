"use strict";
var express = require('express');
var exphbs = require('express-handlebars');
const flash = require('express-flash');
const session = require("express-session");
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// var greetingsCount = 0;
var namesGreeted = {};
var access = require('./mongoose');

app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

const mongoURL = process.env.MONGO_DB_URL || "mongodb://localhost/Greetings";
mongoose.connect(mongoURL);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}))



app.use(session({
  secret: 'keyboard cat',
  cookie: {
    maxAge: 60000 * 30
  }
}));
app.use(flash());
// parse application/json
app.use(bodyParser.json())





function storing(nameParam, cb) {

  access.storeData.findOne({
    name: nameParam
  }, function(err, results) {
    if (err) {
      return cb(err);
    } else if (results) {
      results.greetingsCount = results.greetingsCount + 1;
      results.save(cb);
      console.log('Update');

    } else {

      var takesNames = new access.storeData({
        name: nameParam,
        greetingsCount: 1
      });
      takesNames.save(cb);
      console.log("takesNames", takesNames);
      // console.log("saving...");
    }

    access.storeData.remove({
      greetingsCount: 0
    })

  })


}


var greeted = [];





app.get('/Greetings', function(req, res) {
  res.render('index');

});

app.get('/Greetings', function(req, res) {
  res.redirect('index');
});

var greetNames = "";
app.post('/Greetings', function(req, res, next) {
  var name = req.body.person;
  var language = req.body.language;
  greeted.push(name);

  // if (!name) {
  //   req.flash('error', 'name should not be blank');
  // } else if (language == undefined) {
  //   req.flash('error', 'language is not selected');
  // } else {
  //   req.flash('error', 'name already exists');
  // }

  if (language === 'IsiXhosa') {
    greetNames = 'Molo ' + name

  } else if (language === 'English') {
    greetNames = 'Hello ' + name

  } else if (language === 'Afrikaans') {
    greetNames = "Goeie dag " + name

  }


  console.log(greetNames);


  storing(name, function(err) {

    console.log("storing...");

    if (err) {
      return next(err);
    }

    access.storeData.count({}, function(err, greetingsCount) {
      console.log("counting...");
      if (err) {
        return next(err);
      } else {
        res.render('index', {
          output: greetingsCount,
          msg: greetNames
        })
      }
    });

  })






});
app.get('/Greeted', function(req, res) {
  // var name = req.body.names;

  access.storeData.find({}, function(err, results) {
    if (err) {
      return err;
    }
   else {
      res.render('index.form.handlebars', {
        names: results
      })
    }


  });
});




app.get('/Counter/:person', function(req, res) {
var name = req.params.person;
  access.storeData.findOne({
    name:name
  }, function(err, results) {
    if (err) {
      return err;

    }else {
      console.log(results.name);
      res.render('index.counter.handlebars', {

        names: req.params.person+''+"has been greeted"+''+results.greetingsCount+''+"time(s)"
      });

    }



});
});


app.post('/Reset',function(req, res){
  access.storeData.remove({},function(err,remove){
    if(err){
      return err;
    }else{
      remove.greetingsCount;
    }
      res.render('index',{

      });

    });
  });







app.use(function(err, req, res, next) {
  console.error(err.stack)
  res.status(500).send(err.stack)
})
const port = process.env.PORT || 8000;
app.listen(port, function() {
  console.log('web app started on port:' + port);

});
