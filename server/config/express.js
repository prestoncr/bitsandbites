var path = require('path'),  
    express = require('express'), 
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    config = require('./config'),
    recipieRouter = require('../routes/recipies.server.routes');
    

module.exports.init = function() {
  //connect to database
  mongoose.connect(config.db.uri);

  var app = express();

  app.use(morgan('dev'));

  app.use(bodyParser.json());

  app.use('/', express.static('client'));
  app.use('/api/recipies',recipieRouter);

  app.get('/create', function (req, res) {
    res.sendFile(path.join(__dirname + '../../../client/create.html'));
     });
     app.get('/printlist', function (req, res) {
      res.sendFile(path.join(__dirname + '../../../client/printlist.html'));
       });

  app.all('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '../../../client/index.html'));
  });
  return app;
};  