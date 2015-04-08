'use strict';

/* App Module */
//var teachernamehash = window.location.hash.split('/')[2];
var TAS_Anniversary = angular.module('TAS_Anniversary', ['ngRoute', 'ngSanitize', 'ngAnimate','ngTouch','angulartics', 'angulartics.google.analytics','Alumni' ]);
TAS_Anniversary.config(['$routeProvider',
  function($routeProvider) {
   $routeProvider.
  	  when('/cards/', {
        templateUrl: 'partials/cards.html',
       //controller: 'Timeline'
      }).
     when('/:feature',
    {
    	templateUrl:'partials/features.html',
    	//controller:'hashedLocation',
    	
    }).
     
    otherwise({
      	templateUrl: 'partials/home.html',
        redirectTo: '/home/'
        //controller:'partials/home.html'
     });






     // use the HTML5 History API
		

  }])
  
.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
         $httpProvider.defaults.headers.post['Accept'] = 'application/json, text/javascript';
    	$httpProvider.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8'
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
]); 
  
  /*app.run(function($rootScope, $location, $anchorScroll, $routeParams) {
  $rootScope.$on('$routeChangeSuccess', function(newRoute, oldRoute) {
    $location.hash($routeParams.scrollTo);
    $anchorScroll();  
  });
}) */
