'use strict';

/* App Module */
//var teachernamehash = window.location.hash.split('/')[2];
///injects modules into app
var TAS_Site = angular.module('TAS_Site', ['ngRoute', 'ngSanitize', 'ngAnimate','ngTouch','angulartics', 'angulartics.google.analytics', 'Story', 'infinite-scroll' ]);
TAS_Site.config(['$routeProvider',
  function($routeProvider) {
  	////////creates routes for deeplinking
   $routeProvider.
  	  when('/cards/', {
        templateUrl: 'partials/cards.html',
       controller: 'CardController'
      }).
     when('/profile/:year/:id',
    {
    	templateUrl:'partials/profile.html',
    	controller:'FeatureController',
    	
    }).
     when('/image/:year/:id',
    {
    	templateUrl:'partials/photo.html',
    	controller:'FeatureController',
    	
    }).
     when('/article/:year/:id',
    {
    	templateUrl:'partials/spotlight.html',
    	controller:'FeatureController',
    	
    }).
     when('/quote/:year/:id',
    {
    	templateUrl:'partials/quotes.html',
    	controller:'FeatureController',
    	
    }).
   
	 when('/home',
    {
    	templateUrl:'partials/home.html',
    	//controller:'FeatureController',
    	
    }).
      when('/facebook/',
    {
    	
    	templateUrl:'partials/facebook.html',
    	controller:'qsParser',
    	
    }).
    when('/facebook/:qs',
    {
    	
    	templateUrl:'partials/facebook.html',
    	controller:'qsParser',
    	
    }).

    otherwise({
      	templateUrl: 'partials/home.html',
        redirectTo: '/home/',
        controller:'FeatureController',
     });

		

  }]);
  
