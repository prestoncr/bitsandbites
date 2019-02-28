
/* Dependencies */
var mongoose = require('mongoose'), 
    Recipe = require('../models/recipes.server.model.js');
 
/* Create a recipe */
exports.create = function(req, res) {

  var recipe = new Recipe(req.body);

  recipe.save(function(err) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(recipe);
    }
  });
};

/* Show the current recipe */
exports.read = function(req, res) {

  res.json(req.recipe);
};

/* Update a recipe */
exports.update = function(req, res) {
  var recipe = req.recipe;

    recipe.name = req.body.name;
    recipe.mealtype = req.body.mealtype;
    recipe.coreitem = req.body.coreitem;
  
    recipe.save(function(err) {
      if (err) throw err;
      else res.json(recipe);
    });

}
/* Delete a recipe */
exports.delete = function(req, res) {
  var recipe = req.recipe;
  recipe.remove();
  res.json(recipe);
};


exports.list = function(req, res) {
 
  Recipe.find({},null, {sort: 'name'}, function (err, recipes){
    if (err) console.log(err);
    else res.json(recipes);
  });
};


exports.recipeByID = function(req, res, next, id) {
  Recipe.findById(id).exec(function(err, recipe) {
    if(err) {
      res.status(400).send(err);
    } else {
      req.recipe = recipe;
      next();
    }
  });
};