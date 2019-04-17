var path = require('path'),  
    express = require('express'), 
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    config = require('./config'),
    recipeRouter = require('../routes/recipes.server.routes');
    

module.exports.init = function() {
  //connect to database
  mongoose.connect(config.db.uri);

  var app = express();

  app.use(morgan('dev'));

  app.use(bodyParser.json());

  app.use('/', express.static('client'));
  app.use('/api/recipes',recipeRouter);

app.get('/create', function (req, res) {
    res.sendFile(path.join(__dirname + '../../../client/components/create/create.html'));
     });
     
app.get('/lookup', function (req, res) {
    res.sendFile(path.join(__dirname + '../../../client/components/lookup/lookup.html'));
     });

app.get('/manage', function (req, res) {
    res.sendFile(path.join(__dirname + '../../../client/components/manage/manage.html'));
     });

app.get('/guide', function (req, res) {
    res.sendFile(path.join(__dirname + '../../../client/components/guide/guide.html'));
     });

app.get('/startcook', function (req, res) {
    res.sendFile(path.join(__dirname + '../../../client/components/startcook/startcook.html'));
     });

app.get('/addrec', function (req, res) {
    res.sendFile(path.join(__dirname + '../../../client/components/addrec/addrec.html'));
     });

app.get('/imprec', function (req, res) {
    res.sendFile(path.join(__dirname + '../../../client/components/imprec/imprec.html'));
     });
     
app.get('/delrec', function (req, res) {
    res.sendFile(path.join(__dirname + '../../../client/components/delrec/delrec.html'));
     });

  app.all('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '../../../client/index.html'));
  });
  return app;
};  