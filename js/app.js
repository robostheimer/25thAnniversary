'use strict';

/* App Module */
//var teachernamehash = window.location.hash.split('/')[2];
var TAS_Site = angular.module('TAS_Site', ['ngRoute', 'ngSanitize', 'ngAnimate','ngTouch','angulartics', 'angulartics.google.analytics', 'Story', 'infinite-scroll' ]);
TAS_Site.config(['$routeProvider',
  function($routeProvider) {
   $routeProvider.
  	  when('/cards/', {
        templateUrl: 'partials/cards.html',
       controller: 'CardController'
      }).
     when('/profile/:id',
    {
    	templateUrl:'partials/profile.html',
    	controller:'FeatureController',
    	
    }).
     when('/photo/:id',
    {
    	templateUrl:'partials/photo.html',
    	controller:'FeatureController',
    	
    }).
     when('/spotlight/:id',
    {
    	templateUrl:'partials/spotlight.html',
    	controller:'FeatureController',
    	
    }).
     when('/quotes/:id',
    {
    	templateUrl:'partials/quotes.html',
    	controller:'FeatureController',
    	
    }).

    otherwise({
      	templateUrl: 'partials/cards.html',
        redirectTo: '/cards/',
        controller:'FeatureController',
     });

		

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
