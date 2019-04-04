angular.module('recipes').controller('RecipesController', ['$scope', 'Recipes', 
  function($scope, Recipes) {
    Recipes.getAll().then(function(response) {
      $scope.recipes = response.data;
    }, function(error) {
      console.log('Unable to retrieve recipes:', error);
    });

     $scope.grocerylist = [];
    $scope.randomize = function()
    {
    var id;
    $scope.grocerylist = [];
    for (i = 0; $scope.grocerylist.length < 5;i++)
     {
      id = $scope.recipes[(Math.floor(Math.random()*$scope.recipes.length))]._id;
      $scope.addtolist(id)
     }
    };

    $scope.addtolist = function(id) {
      var i;
      var index = 0;
      for (i = 0; i < $scope.recipes.length;i++)
       {
         if ($scope.recipes[i]._id == id)
         {index = i; break;}
       }
      var shouldadd = 1;
      for (i = 0; i < $scope.grocerylist.length; i++)
      {
        if ($scope.grocerylist[i].name == $scope.recipes[index].name)
        {shouldadd = 0;}
      }
       if (shouldadd)$scope.grocerylist.push($scope.recipes[index]);
      };

      $scope.removelist = function(id) {
        var index = 0;
        var shouldRem = false;
        for (i = 0; i < $scope.recipes.length;i++)
         {
           if ($scope.recipes[i]._id == id)
           {index = i; break;}
         }
         for (i = 0; i < $scope.grocerylist.length; i++)
         {
           if ($scope.grocerylist[i].name == $scope.recipes[index].name)
           {
             shouldRem = true;rindex = i;
           }
         }
       
         if(shouldRem)$scope.grocerylist.splice(rindex,1);
        };

      $scope.displayIng = function() {
        var i;
        var j;
        var z;
        var obj;
        var exist = 0;
        var location = 0;
        var needtopush = 1;
        $scope.ingredients = [];
        for (i = 0; i < $scope.grocerylist.length; i++) 
        {
          for (j = 0; j < $scope.grocerylist[i].ingredients.length; j++) 
          {  
              for (z = 0; z <  $scope.ingredients.length;z++)
              {
                if ($scope.grocerylist[i].ingredients[j].iname == 
                    $scope.ingredients[z].x)
                    { 
                      exist = 1;
                      location = z;
                      needtopush = 0;
                    }
              }
             if (exist == 1) 
             {
              $scope.ingredients[location].y += $scope.grocerylist[i].ingredients[j].quant;
              exist = 0;
              location = 0;
             } 
             else {
              obj = {
                "x": $scope.grocerylist[i].ingredients[j].iname,
                "y": $scope.grocerylist[i].ingredients[j].quant,
                "z": $scope.grocerylist[i].ingredients[j].mtype
               }
               exist = 0;
               location = 0;
             }
          
            if(needtopush)$scope.ingredients.push(obj);
            needtopush = 1;
          }
        }
       };

  }
]);