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
    res.sendFile(path.join(__dirname + '../../../client/pages/create.html'));
     });
     
app.get('/lookup', function (req, res) {
    res.sendFile(path.join(__dirname + '../../../client/pages/lookup.html'));
     });

app.get('/manage', function (req, res) {
    res.sendFile(path.join(__dirname + '../../../client/pages/manage.html'));
     });

app.get('/guide', function (req, res) {
    res.sendFile(path.join(__dirname + '../../../client/pages/guide.html'));
     });

app.get('/addrec', function (req, res) {
    res.sendFile(path.join(__dirname + '../../../client/pages/addrec.html'));
     });
     
app.get('/uprec', function (req, res) {
    res.sendFile(path.join(__dirname + '../../../client/pages/uprec.html'));
     });

app.get('/delrec', function (req, res) {
    res.sendFile(path.join(__dirname + '../../../client/pages/delrec.html'));
     });

  app.all('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '../../../client/index.html'));
  });
  return app;
};  