'use strict';

var fs = require('fs'),
    mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    Recipie = require('./server/models/recipies.server.model.js'),
    config = require('./server/config/config.js');

/* Connect to your database */
  mongoose.connect(config.db.uri);


  fs.readFile('recipies.json', 'utf8', function(err, data){
    data = JSON.parse(data);
    for(var  i = 0; i < data.entries.length; i++)
    {
      new Recipie(data.entries[i]).save(function(err){
        if (err) {console.log(err);}
      }); 
    }
  });
