/* register the modules the application depends upon here*/
angular.module('recipies', []);

/* register the application and inject all the necessary dependencies */
var app = angular.module('bitsandbites', ['recipies']);