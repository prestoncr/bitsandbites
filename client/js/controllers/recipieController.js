angular.module('recipies').controller('RecipiesController', ['$scope', 'Recipies', 
  function($scope, Recipies) {
    Recipies.getAll().then(function(response) {
      $scope.recipies = response.data;
    }, function(error) {
      console.log('Unable to retrieve recipies:', error);
    });

    $scope.detailedInfo = undefined;

    $scope.addRecipie = function() {
	  
      Recipies.create($scope.newRecipie).then(function(err){
        if (err) console.log(err);
        else $location.path('/');
      });
    };

    $scope.deleteRecipie = function(id) {
      Recipies.delete(id).then(function(err){
        if (err) console.log(err);
        else $location.path('/');
      });
    };

    $scope.showDetails = function(index) {
      $scope.detailedInfo = $scope.recipies[index];
    };
  }
]);