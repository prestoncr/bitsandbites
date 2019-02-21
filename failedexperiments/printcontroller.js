//a failed experiment
//attempting to print the list of ingredients for grocery list 
//on another page but the scopes in angular I couldnt figure out
//how to access the grocery list from the previous page

angular.module('recipies').controller('PrintController', ['$scope','$rootScope','Recipies',
  function($scope,  $rootScope, Recipies) {
    Recipies.getAll().then(function(response) {
      $scope.recipies = response.data;
    }, function(error) {
      console.log('Unable to retrieve recipies:', error);
    });

    $scope.grocerylist = $rootScope.grocerylist;

    $scope.addtolist = function(index) {
       $scope.grocerylist.push($scope.recipies[index]);
        console.log('item added to list ' + $scope.recipies[index].name);
      };
  }
]);








//extra code

angular.module('recipies')

.run(function($rootScope){$rootScope.grocerylist = [];})

.controller('RecipiesController', ['$scope', '$rootScope', 'Recipies', 
  function($scope, $rootScope, Recipies) {
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

    //$rootScope.grocerylist = [];

    $scope.addtolist = function(index) {
       $rootScope.grocerylist.push($scope.recipies[index]);
        console.log('item added to list ' + $scope.recipies[index].name);
      };
  }

])
.controller('PrintController', ['$scope','$rootScope','Recipies',
  function($scope,  $rootScope, Recipies) {
    Recipies.getAll().then(function(response) {
      $scope.recipies = response.data;
    }, function(error) {
      console.log('Unable to retrieve recipies:', error);
    });

    $scope.grocerylist = $rootScope.grocerylist;

    $scope.addtolist = function(index) {
       $scope.grocerylist.push($scope.recipies[index]);
        console.log('item added to list ' + $scope.recipies[index].name);
      };
  }
]);




//more extra code

// var i;
// var j;
// $scope.ingredients = "";
// for (i = 0; i < $scope.grocerylist.length; i++) 
// {
//   for (j = 0; j < $scope.grocerylist[i].ingredients.length; j++) 
//   {   
//     $scope.ingredients += $scope.grocerylist[i].ingredients[j];
//   }
// }
// };