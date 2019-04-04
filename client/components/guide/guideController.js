angular.module('recipes').controller('RecipesController', ['$scope', 'Recipes', 
  function($scope, Recipes) {
    Recipes.getAll().then(function(response) {
      $scope.recipes = response.data;
    }, function(error) {
      console.log('Unable to retrieve recipes:', error);
    });

    $scope.detailedInfo = undefined;
    $scope.selectedID = undefined;
    $scope.alling = undefined;
    $scope.allsteps = undefined;
    $scope.displayword1 = "";    
    $scope.displayword2 = "";    
   
    $scope.showDetails = function(index, id) {
      $scope.detailedInfo = $scope.recipes[index];
      $scope.nameToUpdate = $scope.recipes[index].name;
      $scope.selectedID = id;
    };

    $scope.concatsteps = function(id) {
      $scope.displayword1 = "Ingredients";    
      $scope.displayword2 = "Instructions";   
      var i;
      var index = 0;
      for (i = 0; i < $scope.recipes.length;i++)
       {
         if ($scope.recipes[i]._id == id)
         {index = i; break;}
       }
      $scope.detailedInfo = $scope.recipes[index];
      $scope.alling = "";
      $scope.allsteps = "";
      var i;
      for (i = 0; i < $scope.detailedInfo.ingredients.length; i++)
      {
        $scope.alling += $scope.detailedInfo.ingredients[i].iname.charAt(0).toUpperCase()
        + $scope.detailedInfo.ingredients[i].iname.slice(1);
        $scope.alling += " ";
        $scope.alling += $scope.detailedInfo.ingredients[i].quant;
        $scope.alling += " ";
        $scope.alling += $scope.detailedInfo.ingredients[i].mtype;
        $scope.alling += "\n";
      }
      //could very easily format steps by adding 
      //$scope.allsteps += "Step ";
      //$scope.allsteps += i.toString;
      //$scope.allsteps += ": ";
      //this way user doesnt have to number steps when inputting recipe
      for (i = 0; i < $scope.detailedInfo.steps.length; i++)
      {
        $scope.allsteps += $scope.detailedInfo.steps[i];
        $scope.allsteps += "\n";
      }
    
    };
      
  }
]);