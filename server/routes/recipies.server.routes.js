/* Dependencies */
var recipies = require('../controllers/recipies.server.controller.js'), 
    express = require('express'), 
    router = express.Router();
 

router.route('/')
  .get(recipies.list)
  .post(recipies.create);

router.route('/:recipieId')
  .get(recipies.read)
  .put(recipies.update)
  .delete(recipies.delete);


router.param('recipieId', recipies.recipieByID);

module.exports = router;
