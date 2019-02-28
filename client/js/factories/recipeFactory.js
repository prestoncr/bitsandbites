angular.module('recipes', []).factory('Recipes', function($http) {
  var methods = {
    getAll: function() {
      return $http.get('http://localhost:8080/api/recipes');
    },

	create: function(recipe) {
	  return $http.post('http://localhost:8080/api/recipes', recipe);
    }, 

    update: function(id, recipe) {
      return $http.put('http://localhost:8080/api/recipes/' + id, recipe);
      }, 

    getOne: function() {
      return $http.get('http://localhost:8080/api/recipes/'  + id);
    },
	

    delete: function(id) {
      return $http.delete('http://localhost:8080/api/recipes/' + id);

    }
  };

  return methods;
});
