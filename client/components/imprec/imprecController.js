angular.module('recipes').controller('RecipesController', ['$scope', 'Recipes', 
  function($scope, Recipes) {
    Recipes.getAll().then(function(response) {
      $scope.recipes = response.data;
    }, function(error) {
      console.log('Unable to retrieve recipes:', error);
    });

    $scope.itemchoice = "";
    $scope.mealchoice = "";
    $scope.alling = undefined;
    $scope.allsteps = undefined;
    $scope.displayword1 = "";
    $scope.choices = [{id: 'choice1'}];
    $scope.cquants = [{id: 'cquant1'}];
    $scope.cmtypes = [{id: 'cmtype1'}];
    $scope.chsteps = [{id: 'chstep1'}];
    $scope.newRecipe =  {
      "name": "",
      "mealtype": "",
      "coreitem": "",
      "steps": [],
      "ingredients": []
  };

    $scope.readFile = function()
    {
        var content = sessionStorage.getItem('filekey'); 
        var index1 = 0;
        var index2 = 0;
        var noErrors = true;
        var recname;
        var mealtype;
        var coreitem;

        //finds Recipe Name
        index1 = content.indexOf("Name:");
        index2 = content.indexOf("Meal Type:")
        if (index1 == -1) noErrors = false;
        if (index2 == -1) noErrors = false;
        index1 = content.indexOf(":");
        recname = content.slice(index1+2,index2);





        if (noErrors) {
            console.log("send recipe to database");
            $scope.displayword1 = "Recipe Submitted!";
        }
        else $scope.displayword1 = "File Error";
    };
   
    $scope.addNewChoice = function() {
      var newItemNo = $scope.choices.length+1;
      $scope.choices.push({'id':'choice'+newItemNo});
      $scope.cquants.push({'id':'cquant'+newItemNo});
      $scope.cmtypes.push({'id':'cmtype'+newItemNo});
    };
    $scope.removeChoice = function() {
      $scope.choices.pop();
      $scope.cquants.pop();
      $scope.cmtypes.pop();
    };
    $scope.addNewStep = function() {
      var newItemNo = $scope.chsteps.length+1;
      $scope.chsteps.push({'id':'chstep'+newItemNo});
    };
    $scope.removeStep = function() {
      $scope.chsteps.pop();
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
      console.log("wowowowoowow");
      var shouldCreate = true;
      if ($scope.choices.length == 1) {$scope.displayword1 = "Missing Ingredients!"; shouldCreate= false; }
      if ($scope.chsteps.length == 1) {$scope.displayword1 = "Missing Steps!"; shouldCreate= false; }

      if(shouldCreate)
      {
      Recipes.create($scope.newRecipe).then(function(err){
        if (err) console.log(err);
        else $location.path('/');
      });
      $scope.displayword1 = "Recipe Created!";
     }
    };

  


  }
]);


