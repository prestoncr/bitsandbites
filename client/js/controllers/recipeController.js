angular.module('recipes').controller('RecipesController', ['$scope', 'Recipes', 
  function($scope, Recipes) {
    Recipes.getAll().then(function(response) {
      $scope.recipes = response.data;
    }, function(error) {
      console.log('Unable to retrieve recipes:', error);
    });

    $scope.detailedInfo = undefined;
    $scope.nameToUpdate = undefined;
    $scope.selectedID = undefined;

    $scope.addRecipe = function() {
	  
      Recipes.create($scope.newRecipe).then(function(err){
        if (err) console.log(err);
        else $location.path('/');
      });
    };

    $scope.deleteRecipe = function() {
      Recipes.delete($scope.selectedID).then(function(err){
        if (err) console.log(err);
        else $location.path('/');
      });
    };
    
    $scope.showDetails = function(index, id) {
      $scope.detailedInfo = $scope.recipes[index];
      $scope.nameToUpdate = $scope.recipes[index].name;
      $scope.selectedID = id;
    };

    $scope.grocerylist = [];

    $scope.addtolist = function(index) {
       $scope.grocerylist.push($scope.recipes[index]);
      };

      $scope.updateRecipe = function() {
        $scope.newInfo.name = $scope.nameToUpdate;
        Recipes.update($scope.selectedID, $scope.newInfo).then(function(err){
          if (err) console.log(err);
          else $location.path('/');
        });
      };

      $scope.displayIng = function() {
        //still need to make this function actually sum up the quantities
        //summation needs to be done before pushing the obj into ingredients array
        //assuming each ingredient will have a constant name string and mtpye string
        //all that needs to be done is add up the quant of all ingredients with the same
        //iname and then when thats done put each unique iname in the obj with 
        //the summed quant and the mtype, then push that obj into the ingredients array
        //like what is already being done below, maybe change the array name to something
        //thats not ingredients to avoid confusion, but if do that, then also change 
        //where it shows up in create.html

        //one possible way to do the summing is to iterate over the grocerylist array
        //and every time we encounter a duplicate name, eliminate that ingredient in that
        //instance but save the and add the number to the first instance where we found that
        //ingredient, sounds super complicated but just understand the general premise
        //and find an efficient way to accomplish the goal
        
        var i;
        var j;
        var obj;
        $scope.ingredients = [];
        for (i = 0; i < $scope.grocerylist.length; i++) 
        {
          for (j = 0; j < $scope.grocerylist[i].ingredients.length; j++) 
          {   obj = {
            "x": $scope.grocerylist[i].ingredients[j].iname,
            "y": 1
           }
            $scope.ingredients.push(obj);
          }
        }
       };

  }
]);