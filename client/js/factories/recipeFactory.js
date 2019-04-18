angular.module('recipes', []).factory('Recipes', function($http) {
  var methods = {
    getAll: function() {
      return $http.get('https://culinarybits.herokuapp.com/api/recipes');
    },

	create: function(recipe) {
	  return $http.post('https://culinarybits.herokuapp.com/api/recipes', recipe);
    }, 

    update: function(id, recipe) {
      return $http.put('https://culinarybits.herokuapp.com/api/recipes/' + id, recipe);
      }, 

      getGroup: function(mealtype, coreitem) {
        return $http.get('https://culinarybits.herokuapp.com/api/recipes/oof', mealtype, coreitem);
        }, 
  

    getOne: function() {
      return $http.get('https://culinarybits.herokuapp.com/api/recipes/'  + id);
    },
	

    delete: function(id) {
      return $http.delete('https://culinarybits.herokuapp.com/api/recipes/' + id);

    }
  };

  return methods;
});
