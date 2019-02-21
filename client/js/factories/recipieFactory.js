angular.module('recipies', []).factory('Recipies', function($http) {
  var methods = {
    getAll: function() {
      return $http.get('http://localhost:8080/api/recipies');
    },

    getOne: function() {
      return $http.get('http://localhost:8080/api/recipies/'  + id);
    },
	
	create: function(recipie) {
	  return $http.post('http://localhost:8080/api/recipies', recipie);
    }, 

    delete: function(id) {
      return $http.delete('http://localhost:8080/api/recipies/' + id);

    }
  };

  return methods;
});
