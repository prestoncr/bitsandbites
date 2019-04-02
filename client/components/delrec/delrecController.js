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

    $scope.deleteRecipe = function() {
      Recipes.delete($scope.selectedID).then(function(err){
        if (err) console.log(err);
        else $location.path('/');
      });
    };

    $scope.viewRec = function (index)
    {
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
    }
    
    $scope.showDetails = function(index, id) {
      $scope.detailedInfo = $scope.recipes[index];
      $scope.nameToUpdate = $scope.recipes[index].name;
      $scope.selectedID = id;
    };

    $scope.concatsteps = function(index) {
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


    $scope.grocerylist = [];
    $scope.randomize = function()
    {
      $scope.grocerylist = [];
    for (i = 0; $scope.grocerylist.length < 5;i++)
     {
      $scope.addtolist(Math.floor(Math.random()*$scope.recipes.length));
     }

    }
    $scope.addtolist = function(index) {
      console.log(index);
      var i;
      var shouldadd = 1;
      for (i = 0; i < $scope.grocerylist.length; i++)
      {
        if ($scope.grocerylist[i].name == $scope.recipes[index].name)
        {shouldadd = 0;}
      }
       if (shouldadd)$scope.grocerylist.push($scope.recipes[index]);
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