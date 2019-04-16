angular.module('recipes').controller('RecipesController', ['$scope', 'Recipes', 
  function($scope, Recipes) {
    Recipes.getAll().then(function(response) {
      $scope.recipes = response.data;
      $scope.chosendata = $scope.recipes;
    }, function(error) {
      console.log('Unable to retrieve recipes:', error);
    });

    $scope.detailedInfo = undefined;
    $scope.nameToUpdate = undefined;
    $scope.selectedID = undefined;
    $scope.itemchoice = "";
    $scope.mealchoice = "";
    $scope.chosendata = $scope.recipes;
    $scope.displayword2 = undefined;
   
    $scope.addNewChoice = function() {
      var newItemNo = $scope.choices.length+1;
      $scope.choices.push({'id':'choice'+newItemNo});
      $scope.cquants.push({'id':'cquant'+newItemNo});
      $scope.cmtypes.push({'id':'cmtype'+newItemNo});
    };
    $scope.addNewStep = function() {
      var newItemNo = $scope.chsteps.length+1;
      $scope.chsteps.push({'id':'chstep'+newItemNo});
    };

    // $scope.showAddChoice = function(choice) {
    //   return choice.id === $scope.choices[$scope.choices.length-1].id;
    // };

    $scope.addRecipe = function() {
      var obj;
      for (i = 0; i < $scope.choices.length; i++)
      {
        obj = {
          "iname": $scope.choices[i].name,
          "quant": $scope.cquants[i].name,
          "mtype": $scope.cmtypes[i].name
         };
        $scope.newRecipe.ingredients.push(obj);
      }
      for (j = 0; j < $scope.chsteps.length; j++)
      {
        $scope.newRecipe.steps.push($scope.chsteps[j].name);
      }
      Recipes.create($scope.newRecipe).then(function(err){
        if (err) console.log(err);
        else $location.path('/');
      });
    };

    $scope.getGroup = function() {
      var i;
      var obj;
      $scope.chosendata = [];
      for (i = 0; i < $scope.recipes.length; i++) 
      {
        if (($scope.recipes[i].mealtype == $scope.mealchoice) ||
             ($scope.mealchoice == ""))
         {
          if (($scope.recipes[i].coreitem == $scope.itemchoice) ||
           ($scope.itemchoice == ""))
          {
            obj = $scope.recipes[i];
            $scope.chosendata.push(obj);
          }
         }
      }
      
     
    };


    $scope.viewRec = function (index, id)
    {
      $scope.selectedID = id;
      $scope.displayword2 = "";
      $scope.displayword1 = "Ingredients:";
      $scope.detailedInfo = $scope.chosendata[index];
      $scope.alling = "";
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
    };
    
    $scope.showDetails = function(index, id) {
      $scope.detailedInfo = $scope.recipes[index];
      $scope.nameToUpdate = $scope.recipes[index].name;
      $scope.selectedID = id;
    };

    $scope.deleteRecipe = function() {
      Recipes.delete($scope.selectedID).then(function(err){
        if (err) console.log(err);
      });
      $scope.displayword2 = "Recipe has been deleted";
    };
  
  }
]);



