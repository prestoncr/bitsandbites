
/* Dependencies */
var mongoose = require('mongoose'), 
    Recipie = require('../models/recipies.server.model.js');
 
/* Create a recipie */
exports.create = function(req, res) {

  var recipie = new Recipie(req.body);

  recipie.save(function(err) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(recipie);
    }
  });
};

/* Show the current recipie */
exports.read = function(req, res) {

  res.json(req.recipie);
};

/* Update a recipie */
exports.update = function(req, res) {
  var recipie = req.recipie;

    recipie.name = req.body.name;
    recipie.mealtype = req.body.mealtype;
    recipie.core_item = req.body.core_item;
  
    recipie.save(function(err) {
      if (err) throw err;
      else res.json(recipie);
    });

}
/* Delete a recipie */
exports.delete = function(req, res) {
  var recipie = req.recipie;
  recipie.remove();
  res.json(recipie);
};


exports.list = function(req, res) {
 
  Recipie.find({},null, {sort: 'name'}, function (err, recipies){
    if (err) console.log(err);
    else res.json(recipies);
  });
};


exports.recipieByID = function(req, res, next, id) {
  Recipie.findById(id).exec(function(err, recipie) {
    if(err) {
      res.status(400).send(err);
    } else {
      req.recipie = recipie;
      next();
    }
  });
};