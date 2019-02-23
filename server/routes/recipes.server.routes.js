/* Dependencies */
var recipes = require('../controllers/recipes.server.controller.js'), 
    express = require('express'), 
    router = express.Router();
 

router.route('/')
  .get(recipes.list)
  .post(recipes.create);

router.route('/:recipeId')
  .get(recipes.read)
  .put(recipes.update)
  .delete(recipes.delete);


router.param('recipeId', recipes.recipeByID);

module.exports = router;
