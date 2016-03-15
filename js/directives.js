'use strict';

/* Directives */

TAS_Site.directive('naviGation', function($injector, $compile, $q) {
	////creates navigation tag
	var linkFunction = function(scope, elm, attr) {
		scope.navWidth = $('.navigation').width();

		//scope.listWidth = $('.nav_ul ').width();
		//scope.threequarterWidth= scope.yearsWidth*.75;

		scope.marginLeft = 0;

		scope.next = function(item, iteration) {

			if (scope.marginLeft < (scope.yearsWidth * .95) - scope.navWidth) {
				scope.marginLeft += iteration;

			} else {
				scope.marginLeft = 0;
			}

			var item = '#' + item;

			$(item).css({
				'transition' : 'transform 0ms',
				'-webkit-transition' : 'transform 0ms',
				'transform-origin' : '0px 0px 0px',
				'transform' : 'translate(-' + scope.marginLeft + 'px, 0px) scale(1) translateZ(0px)'
			});

		};
		scope.prev = function(item, iteration) {
			if (attr.length == "") {
				scope.lengthy = scope.data.length;
				scope.adder = scope.adder;
			} else {
				scope.lengthy = attr.length;
				scope.adder = parseInt(attr.width);
			}

			if (scope.marginLeft > 0) {
				scope.marginLeft -= iteration;

			} else {
				scope.marginLeft = (scope.yearsWidth * .95) - scope.navWidth;
			}

			var item = '#' + item;
			$(item).css({
				'transition' : 'transform 0ms',
				'-webkit-transition' : 'transform 0ms',
				'transform-origin' : '0px 0px 0px',
				'transform' : 'translate(-' + scope.marginLeft + 'px, 0px) scale(1) translateZ(0px)'
			});
		};

	};

	return {
		restrict : 'AE',
		scope : true,
		templateUrl : 'partials/navigation.html',
		link : linkFunction,
	};
	
	//////////////<section feature-image="{{slide.src}}?w={{windowWidth}}" color="{{slide.background_color}}" ng-hide="slide.isLoading==true">
})
.directive('caRd', function($compile, $q) {
	/////creates different templates for cards
	var Profile = '<section id="image{{item.id}}" resize-card feature-image="{{item.src}}" color="{{item.colorCode}}" class="col-md-3 {{item.color}}" blend="soft-light" alpha="1"> <div class="icon_right type"><span class="{{item.classy}}"></span></div><div ng-hide="item.favorite==\'on\'" class="icon_right favorite"><span class="icon-uni-off"></span></div><div class="icon_right favorite" ng-hide="item.favorite==\'off\'"><span class="icon-uni-on"></span></div><section class="card-text"><h3 ng-bind-html="SkipValidation(item.headline)">{{item.headline}}</h3></section><section class="card-button"><a href="#/{{item.type}}/{{item.year}}/{{item.id}}" ng-click="isLoading=\'true\'"><button class="{{item.color}}" role="button">View Profile »</button></a></section></section>';
		var Pow = '<section id="pow{{item.id}}" resize-card feature-image="{{item.src}}" color="{{item.colorCode}}" class="col-md-3 {{item.color}}" .bigImg .row .col-md-3 blend="soft-light" alpha="1"> <div class="icon_right type"><span class="{{item.classy}}"></span></div><div ng-hide="item.favorite==\'on\'" class="icon_right favorite"><span class="icon-uni-off"></span></div><div class="icon_right favorite" ng-hide="item.favorite==\'off\'"><span class="icon-uni-on"></span></div><section class="card-text"><h3 ng-bind-html="SkipValidation(item.powSlice)"></h3></section><section class="card-button"><a href="#/{{item.type}}/{{item.year}}/{{item.id}}" ng-click="isLoading=\'true\'"> <button class="{{item.color}}" role="button">Learn More »</button></a></section></section>';
	var News = '<section id="news{{item.id}}" resize-card feature-image="{{item.src}}" color="{{item.colorCode}}" class="col-md-3 {{item.color}}" .bigImg .row .col-md-3 blend="soft-light" alpha="1"><div class="icon_right type"><span class="{{item.classy}}"></span></div><div ng-hide="item.favorite==\'on\'" class="icon_right favorite"><span class="icon-uni-off"></span></div><div class="icon_right favorite" ng-hide="item.favorite==\'off\'"><span class="icon-uni-on"></span></div><section class="card-text"><h3 ng-bind-html="item.headline"></h3></section><section class="card-button"><a href="#/{{item.type}}/{{item.year}}/{{item.id}}" ng-click="isLoading=\'true\'" ><button class="{{item.color}}"role="button">Read the Story »</button></a></section></section>';
	
	
	var Article = '<section class="col-md-3 {{item.color}}"><div class="icon_right type"><span class="{{item.classy}}"></span></div><div ng-hide="item.favorite==\'on\'" class="icon_right favorite"><span class="icon-uni-off"></span></div><div class="icon_right favorite" ng-hide="item.favorite==\'off\'"><span class="icon-uni-on"></span></div> <section class="card-text"><h3 ng-bind-html="SkipValidation(item.headline)"></h3><p>Check out this article from <em> {{item.mediaoutlet}}</em>.<p></section><section class="card-button"><a href="{{item.url}}" target="_blank"><button class="{{item.color}}" role="button">Read Article »</button></a></section></section>';

	var Lesson = '<section class="col-md-3 {{item.color}}"><div class="icon_right type"><span class="{{item.classy}}"></span></div><div ng-hide="item.favorite==\'on\'" class="icon_right favorite"><span class="icon-uni-off"></span></div><div class="icon_right favorite" ng-hide="item.favorite==\'off\'"><span class="icon-uni-on"></span></div> <section class="card-text"><h3 ng-bind-html="SkipValidation(item.headline)">}</h3><p>{{item.lessonSlice}}</p></section><section class="card-button"><a href="{{item.url}}" target="_blank"><button class="{{item.color}}" role="button">View Lesson»</button></a></section></section>';
	var Quotes = '<section id="quotes{{item.id}}" resize-card feature-image="{{item.src}}" color="{{item.colorCode}}" class="col-md-3 {{item.color}}" .bigImg .row .col-md-3 blend="soft-light" alpha="1"><div class="icon_right type"><span class="{{item.classy}}"></span></div><div ng-hide="item.favorite==\'on\'" class="icon_right favorite"><span class="icon-uni-off"></span></div><div class="icon_right favorite" ng-hide="item.favorite==\'off\'"><span class="icon-uni-on"></span></div><section class="card-text"><h3 ng-bind-html="item.quoteSlice"></h3></section><section class="card-button"><button class="{{item.color}}"><a href="#/{{item.type}}/{{item.year}}/{{item.id}}" role="button" ng-click="isLoading=\'true\'">Read the Quote »</a></button></section></section>';
	var Stat='<section id="stats{{item.id}}" resize-card  color="{{item.colorCode}}" class="col-md-3 {{item.color}}"  blend="soft-light" alpha="1"><div class="icon_right type"><span class="{{item.classy}}"></span></div><div ng-hide="item.favorite==\'on\'" class="icon_right favorite"><span class="icon-uni-off"></span></div><div class="icon_right favorite" ng-hide="item.favorite==\'off\'"><span class="icon-uni-on"></span></div><section class="card-text"><h3>Year: {{item.year}}<br>No. of Teachers: {{item.numofteachers}}<br>Days at Sea: {{item.days}}<br>Hours at Sea: {{item.hours}}<br> Students Reached: {{item.students}}<br>Blogs Written: {{item.posts}}<br>Photos: {{item.num_images}}<br>States: <span class="states">{{item.stateStr}}</span></h3></section></section>'
	var Map='<section  ng-click="bigMap(item.year); hideMap=false;"  id="map{{item.id}}" resize-card  color="{{item.colorCode}}" class="col-md-3 {{item.color}}"  blend="soft-light" alpha="1"><div class="icon_right type"><span class="{{item.classy}}"></span></div><div ng-hide="item.favorite==\'on\'" class="icon_right favorite"><span class="icon-uni-off"></span></div><div class="icon_right favorite" ng-hide="item.favorite==\'off\'"><span class="icon-uni-on"></span></div><section class="card-text"><h3>{{item.headline}}</h3><br><div ng-enter="bigMap(item.year)" class="svg_us" ng-include="\'svg/US_Map.svg\'" imgaeonload"></div></section></section>'
	////assigns template to a type
	var getTemplate = function(contentType) {
		var template = '';

		switch(contentType) {
		case 'news':
			template = News;
			break;
		case 'profile':
			template = Profile;
			break;
		case 'pow':
			template = Pow;
			break;
		case 'lesson':
			template = Lesson;
			break;
		
		case 'quotes':
			template = Quotes;
			break;
		case 'article':
			template = Article;
			break;	
		case 'stat':
			template = Stat;
			break;	
		case 'map':
			template = Map;
			break;			

		}

		return template;

	};
	return {
		
		restrict : 'AE',
		scope : true,
		link : function(scope, elm, attr) {
			var z=0;
			var images = [];
			////checks the attribute type to assign a specific card template to a card
			elm.html(getTemplate(attr.type));
			var deferred = $q.defer();

			$compile(elm.contents())(scope);
			deferred.resolve();
			deferred.promise.then(function() {
			    
			});
		}
	};
}).directive('bigImage', function() {
	return {
		//creates a modal for popup images
		restrict : 'AE',
		scope : true,
		templateUrl : 'partials/popup.html',
		

	};
})	
	
.directive('clearStorage', function($window) {
	return {
		////////clears sessionStorage object on refresh
		restrict : 'AE',

		link : function() {
			var w = angular.element($window);
			$window.onbeforeunload= function() {
				
				sessionStorage.clear();
				
			};
		
			
			
		}
	};
}).directive('cellWidth', function($window) {
	return {
		restrict : 'AE',
		/////controls the width of a table cell
		link : function(scope, element) {
			
			
			var w = angular.element($window);
				scope.getWindowDimensions = function() {
					return {
						'h' : w.height(),
						'w' : w.width()
					};
				};
				element.css({
					'width':w.width()*.95
					});
				scope.$watch(scope.getWindowDimensions, function(newValue, oldValue) {
					scope.tableWidth=w.width()*.95
					
					
				}, true);
	
			w.bind('resize', function() {
				
				element.css({
					'width':scope.tableWidth*.95
					});
				scope.$apply();
			});
		
			
			
		}
	};
}).directive('navHeight', function($window) {
	return {
		restrict : 'AE',
		///controls the height of navigation tag
		link : function(scope, element){
			var w = angular.element($window);
				scope.navHeight = w.height()*.75;
				if(w.height()<285)
				{
					
					element.css({
						'height':scope.navHeight+'px'
						});
				}
				else{
					element.css({
						'height': '285px'
					});
				}
			}
	};
}).directive('bodyHeight', function($window){
	return function(scope, element){
			var w = angular.element($window);
				
				////controls the height of container div	
				scope.getWindowDimensions = function() {
					return {
						'h' : w.height(),
						'w' : w.width()
					};
				};
				scope.$watch(scope.getWindowDimensions, function(newValue, oldValue) {
				if (window.innerHeight > 1800) {
				scope.wHeight = w.height()*.83
				} else if (window.innerHeight < 1799 && window.innerHeight >= 1600) {
					scope.wHeight = window.innerWidth*.83
				}else if (window.innerHeight < 1599 && window.innerHeight >= 1401) {
					scope.wHeight = window.innerWidth*.83
				} else if (window.innerHeight < 1400 && window.innerHeight >= 1200) {
					scope.wHeight = window.innerWidth*.89
				}else if (window.innerHeight >=1001 && window.innerHeight < 1199) {
					scope.wHeight = window.innerHeight*.83
				}else if (window.innerHeight >= 900 && window.innerHeight < 1000) {
					scope.wHeight = window.innerHeight*.83
				}else if (window.innerHeight >= 800 && window.innerHeight <899) {
					scope.wHeight = window.innerHeight*.83
				}else if (window.innerHeight >=700 && window.innerHeight < 799) {
					scope.wHeight = window.innerHeight*.79
				}else if (window.innerHeight >= 600 && window.innerHeight <699) {
					scope.wHeight = window.innerHeight*.81
				}else if (window.innerHeight > 500 && window.innerHeight <= 599) {
					scope.wHeight = window.innerHeight*.78
				}else if (window.innerHeight >= 400 && window.innerHeight <499) {
					scope.wHeight = window.innerHeight*.75
				} else if (window.innerHeight >= 351 && window.innerHeight < 399) {
					scope.wHeight = window.innerHeight*.63
				} else if (window.innerHeight >=300 && window.innerHeight < 350) {
					scope.wHeight = window.innerHeight*.58
				} else {
					scope.wHeight = window.innerHeight*.45
				}
					element.css({
						'height': scope.wHeight+'px'
					});
					
				}, true);
		
				w.bind('resize', function() {
					scope.$apply();
				});
			
			
	};
	
})
.directive('resizeTable', function($window) {
	return function(scope, element) {
		var w = angular.element($window);
		scope.getWindowDimensions = function() {
			return {
				'h' : w.height(),
				'w' : w.width()
			};
		};
		scope.$watch(scope.getWindowDimensions, function(newValue, oldValue) {
			scope.tableWidth=w.width()
			
		}, true);

		w.bind('resize', function() {
			scope.$apply();
		});
	};
})

.directive('bottomPostion', function($window, $timeout) {
	return {
		/////controls bottom postion of the article tag on the feature pages
		restrict : 'AE',

		link : function(scope, element, attrs) {
		var articleHeight=$('.main').height() + $('article h2').height()+parseInt($('article h2').css('padding-top'), 10)+parseInt($('article h2').css('padding-bottom'), 10)+parseInt($('article').css('padding-top'),10)+parseInt($('article').css('padding-bottom'), 10)+headerHeight+parseInt($('.container').css('margin-top'),10);		
		
		var w = angular.element($window);
		if(w.width()>767)
		{
			var headerHeight=75;
		}
		else{
			var headerHeight=50;
		}
		if(w.width()>w.height())
				{
				var w_ratio = w.width()/w.height();		
				$(element).css({
				'top':  (w.height()*w_ratio),
				'margin-top': w.height()-articleHeight,
				//'height' :$('.main').height() + articleHeight+30
					
					});
				}
				else{
					var w_ratio = w.height()/w.width();	
					
					$(element).css({
					'top':  (w.height()*w_ratio),
					'margin-top': w.height()-articleHeight,
				//'height' :$('.main').height() + articleHeight+30
					
					});
				}	
			
			w.bind('resize', function(){
				var articleHeight=$('.main').height() + $('article h2').height()+parseInt($('article h2').css('padding-top'), 10)+parseInt($('article h2').css('padding-bottom'), 10)+parseInt($('article').css('padding-top'),10)+parseInt($('article').css('padding-bottom'), 10)+headerHeight+parseInt($('.container').css('margin-top'),10);		
				if(w.width()>w.height())
				{
				var w_ratio = w.width()/w.height();		
				$(element).css({
				'top':  (w.height()*w_ratio),
				'margin-top': w.height()-articleHeight,
				//'height' :$('.main').height() + articleHeight+30
					
					});
				}
				else{
					var w_ratio = w.height()/w.width();	
					
					$(element).css({
					'top':  (w.height()*w_ratio),
					'margin-top': w.height()-articleHeight,
				//'height' :$('.main').height() + articleHeight+30
					
					});
				}	
				
			
			});
			
			attrs.$observe('loading', function(){
				
			
				
				$timeout(function(){
				var articleHeight=$('.main').height() + $('article h2').height()+parseInt($('article h2').css('padding-top'), 10)+parseInt($('article h2').css('padding-bottom'), 10)+parseInt($('article').css('padding-top'),10)+parseInt($('article').css('padding-bottom'), 10)+headerHeight+parseInt($('.container').css('margin-top'),10);		
				if(w.width()>w.height())
				{
				var w_ratio = w.width()/w.height();		
				$(element).css({
				'top':  (w.height()*w_ratio),
				'margin-top': w.height()-articleHeight,
				//'height' :$('.main').height() + articleHeight+30
					
					});
				}
				else{
					var w_ratio = w.height()/w.width();	
					
					$(element).css({
					'top':  (w.height()*w_ratio),
					'margin-top': w.height()-articleHeight,
				//'height' :$('.main').height() + articleHeight+30
					
					});
				}	
					
				var w_ratio = w.width()/w.height();
				
					}, 300);
				});
			
			//element.parent().append('<span class="spinner"></span>');

		}
	};
}).directive('sectionHeight', function($window) {
	return {
		restrict : 'AE',

		link : function(scope, element) {
			var w = angular.element($window);
			$(element).css({
				'height' :($('article h2').height())
			});
			w.bind('resize', function(){
				
				$(element).css({
					'height' : w.height() -($('article h2').height()+(parseInt($('article h2').css('padding-top'),10))+$('article h2').height()+(parseInt($('article h2').css('padding-bottom'),10))+$('footer').height()+10)
				});
			});

		}
	};
}).directive("scroll", function($window) {
	return {
		link: function(scope, element, attrs) {
			scope.whereto=$(window).height() - ($('footer').height() * 2)- 10;
			scope.chevron={name:'up', state:'inactive', top:scope.whereto};
			scope.chevron.classy='icon-chevron-up';
			

			
			/*angular.element($window).bind("scroll", function() {
			if (this.pageYOffset >= 1) {
				$(element).removeClass('icon-chevron-up');
				$(element).addClass('icon-chevron-down');
				$('article').animate({'top': '0'});
				//scope.chevron.state = 'active';
				
			} else {
				$(element).addClass('icon-chevron-up');
				$(element).removeClass('icon-chevron-down');
				scope.chevron.state = 'inactive';
				//$('article').animate({'top': scope.whereto}, 'slow');
			}
			scope.$apply();
			});
			element.bind('click', function(){
				
				scope.controlChevron();
					
				});
				
			*/
		scope.controlChevron=function()
		{
			if(scope.chevron.state=='inactive')
				{
					
					scope.chevron.state='active';
					scope.chevron.classy='icon-chevron-down';
					scope.chevron.height= scope.whereto;
					$('article').animate({'top': '0'}, 'slow');
				}
				else{
					scope.chevron.state='inactive';
					scope.chevron.classy='icon-chevron-up';
					scope.chevron.height= scope.whereto;
					$('article').animate({'top': scope.whereto}, 'slow');
				}
		};
		}
	};
}).directive('scrollDownHider', function() {
	console.log('scrolling');
	
	return function(scope, element, attrs) {
		
		element.bind("scroll", function() {
			
			if ($(this).scrollTop() >= 200) {
                 scope.showDiv = false;
             } else  {
                 scope.showDiv = true;
             }
            scope.$apply();
		});
	};
})
.directive('ngEnter', function() {
	return function(scope, element, attrs) {
		element.bind("keydown keypress", function(event) {
			if (event.which === 13) {
				scope.$apply(function() {
					scope.$eval(attrs.ngEnter);
				});

				event.preventDefault();
			}
		});
	};
}).directive('resizeCard', function($window) {
	/////resizes card on window width change - for responsiveness
	return function(scope, element) {
		var w = angular.element($window);
		scope.getWindowDimensions = function() {
			return {
				'h' : w.height(),
				'w' : w.width()
			};
		};
		scope.$watch(scope.getWindowDimensions, function(newValue, oldValue) {
			scope.windowHeight = newValue.h;
			if (window.innerWidth > 1960) {
				scope.windowWidth = window.innerWidth*.1466
			} else if (window.innerWidth < 1600 && window.innerWidth >= 1281) {
				scope.windowWidth = window.innerWidth*.18
			} else if (window.innerWidth < 1280 && window.innerWidth >= 1025) {
				scope.windowWidth = window.innerWidth*.23
			}else if (window.innerWidth < 1024 && window.innerWidth >= 768) {
				scope.windowWidth = window.innerWidth*.31
			}else if (window.innerWidth < 767 && window.innerWidth >= 640) {
				scope.windowWidth = window.innerWidth*.48
			}else if (window.innerWidth < 639 && window.innerWidth >= 480) {
				scope.windowWidth = window.innerWidth*.48
			}else if (window.innerWidth < 479 && window.innerWidth >= 321) {
				scope.windowWidth = window.innerWidth*.98
			} else {
				scope.windowWidth = window.innerWidth*.98
			}
			scope.styles = function() {
				return {
					'height' : (newValue.h - 100) + 'px',
					'width' : (newValue.w - 100) + 'px'
				};
			};

		}, true);

		w.bind('resize', function() {
			scope.$apply();
		});
	};
})
.directive('imageonload', function() {
	///sets up preloader
	return {
		restrict : 'A',

		link : function(scope, element) {
			element.on('load', function() {

				// Set visibility: true + remove spinner overlay
				element.removeClass('spinner-hide');
				element.addClass('spinner-show');
				element.parent().find('span').remove();
			});
			scope.$watch('ngSrc', function() {
				// Set visibility: false + inject temporary spinner overlay

				element.addClass('spinner-hide');
				element.parent().append('<span class="spinner"></span>');

			});
		}
	};
}).directive('imageonloadprofile', function(TeacherDataFetch) {
	return {
		restrict : 'A',
		link : function(scope, element, attrs) {

			element.bind('load', function() {
				if (attrs.number == 0) {
					$('.loading').addClass('ng-hide');
					$(element).removeClass('ng-hide');
					scope.loadHider = true;

				}

			});

		}
	};
}).directive('imageonloadtabs', function(TabsDataFetch) {
	return {
		restrict : 'A',
		link : function(scope, element, attrs) {

			element.bind('load', function() {
				if (attrs.number == 0) {

					$('.loading').addClass('ng-hide');
					$(element).removeClass('ng-hide');
					scope.loadHider = true;
				}

			});

		}
	};
}).directive('imageonloadpopup', function(TeacherDataFetch) {
	return {
		restrict : 'A',
		link : function(scope, element, attrs) {

			scope.isLoading = true;
			element.bind('load', function() {

				scope.isLoading = false;
				//$('.loading').addClass('ng-hide');
				$(element).removeClass('ng-hide');
				//scope.loadHider=true;

			});

		}
	};
}).directive('featureImage', function($window) {
	//////controls size of background image on cards - makes site responsive
	return {
		link: function(scope, element, attrs) {
		var w = angular.element($window);
		var url = attrs.featureImage;
		var color = attrs.color;
		var blend =attrs.blend;
		var alpha =attrs.alpha
		var id = attrs.id;
		var loader =id.replace('image', 'loader')
		scope.getWindowDimensions = function() {
			return {
				'h' : w.height(),
				'w' : w.width()
			};
		};
		scope.$watch(scope.getWindowDimensions, function(newValue, oldValue) {
			scope.windowHeight = newValue.h;
			if (window.innerWidth > 1960) {
				scope.windowWidth = window.innerWidth*.1466
			} else if (window.innerWidth < 1600 && window.innerWidth >= 1281) {
				scope.windowWidth = window.innerWidth*.18
			} else if (window.innerWidth < 1280 && window.innerWidth >= 1025) {
				scope.windowWidth = window.innerWidth*.23
			}else if (window.innerWidth < 1024 && window.innerWidth >= 768) {
				scope.windowWidth = window.innerWidth*.31
			}else if (window.innerWidth < 767 && window.innerWidth >= 640) {
				scope.windowWidth = window.innerWidth*.48
			}else if (window.innerWidth < 639 && window.innerWidth >= 480) {
				scope.windowWidth = window.innerWidth*.48
			}else if (window.innerWidth < 479 && window.innerWidth >= 321) {
				scope.windowWidth = window.innerWidth*.98
			} else {
				scope.windowWidth = window.innerWidth*.98
			}
			url = url+'?w='+scope.windowWidth;
			scope.styles = function() {
				return {
					'height' : (newValue.h - 100) + 'px',
					'width' : (newValue.w - 100) + 'px'
				};
			};
			element.css({
			'background-image' : 'url(' + url +')',
			//'background-color': 'rgba('+color+',' +alpha+')',
			//'background-size' : 'cover',
			//'background-blend-mode': 'soft-light',
			//'-webkit-background-blend-mode':'soft-light'
			});
			element.isLoading="true"
			var image= new Image() ;
		 	image.src=url;
		  	image.isLoading=true;
		  	
		  	$(image).bind('load', function(){
		  			$('#'+loader).addClass('ng-hide');
					$('#'+id).removeClass('ng-hide');
					//scope.alldata[number].isLoading=false;		
					scope.$apply();
					});

		}, true);

		w.bind('resize', function() {
			scope.$apply();
		});
		
		attrs.$observe('featureImageBig', function(){
			element.css({
			'background-image' : 'url(' + url +')',
			//'background-color': 'rgba('+color+',' +alpha+')',
			//'background-size' : 'cover',
			//'background-blend-mode': 'soft-light',
			//'-webkit-background-blend-mode':'soft-light'
			});
			
			
		});
			
		}
	};
}).directive('featureImageBig', function($window) {
	return {
		////controls size of background images on feature pages
		link: function(scope, element, attrs) {
			scope.isLoading=true;
			
		
		var w = angular.element($window);
		
		
		var color = attrs.color;
		var blend =attrs.blend;
		var alpha = attrs.alpha;
		scope.getWindowDimensions = function() {
			return {
				'h' : w.height(),
				'w' : w.width()
			};
		};
		scope.$watch(scope.getWindowDimensions, function(newValue, oldValue) {
			
				scope.windowWidth = window.innerWidth*2;
			
			scope.styles = function() {
				return {
					'height' : (newValue.h - 100) + 'px',
					'width' : (newValue.w - 100) + 'px'
				};
			};
			element.css({
			'background-image' : 'url(' + attrs.featureImageBig + '?w='+scope.windowWidth+')',
			//'background-color': 'rgba('+color+', '+alpha+')',
			//'background-size' : 'cover',
			//'background-blend-mode':blend
			});
			element.isLoading="true"
			var image= new Image() ;
		  image.src=attrs.featureImageBig;
		  	scope.isLoading=true;
		  	$(image).bind('load', function(){
					scope.isLoading=false
					scope.$apply();
					});

		}, true);

		w.bind('resize', function() {
			
			element.css({
			'background-image' : 'url(' + attrs.featureImageBig + '?w='+scope.windowWidth+')',
			});
			scope.$apply();
			
		});
		
		attrs.$observe('featureImageBig', function(){
			var url = attrs.featureImageBig;
			var color = attrs.color;
			var blend =attrs.blend;
			var alpha = attrs.alpha;
			element.css({
			'background-image' : 'url(' + attrs.featureImageBig + '?w='+scope.windowWidth+')',
			//'background-color': 'rgba('+color+', '+alpha+')',
			//'background-size' : 'cover',
			//'background-blend-mode':blend
			});
			scope.isLoading=false
			
		});
		

			

		}
	};
})
.directive('ngDelay', ['$timeout', function ($timeout) {
    return {
    	////adds a delay to an action
        restrict: 'A',
        scope: true,
        compile: function (element, attributes) {
            var expression = attributes['ngChange'];
            if (!expression)
                return;

            var ngModel = attributes['ngModel'];
            if (ngModel) attributes['ngModel'] = '$parent.' + ngModel;
            attributes['ngChange'] = '$$delay.execute()';

            return {
                post: function (scope, element, attributes) {
                    scope.$$delay = {
                        expression: expression,
                        delay: scope.$eval(attributes['ngDelay']),
                        execute: function () {
                            var state = scope.$$delay;
                            state.then = Date.now();
                            $timeout(function () {
                                if (Date.now() - state.then >= state.delay)
                                    scope.$parent.$eval(expression);
                            }, state.delay);
                        }
                    };
                }
            };
        }
    };
}]).directive(
			////delegates click, mouseover, mouseout events, etc;
            "eventDelegate",
            function( $parse ) {
            	
                // I bind the DOM and event handlers to the scope.
                function link( $scope, element, attributes ) {
                    // Right now, the delegate can be defined as
                    // either selector and an expression; or simply
                    // as an expression.
                    var config = attributes.eventDelegate.split( "|" );
					var eventtype=attributes.type;
                    // Only an expression has been defined - default
                    // the selector to any anchor link.
                    if ( config.length === 1 ) {

                        var selector = "a";
                        var expression = config[ 0 ];
                    // Both selector and expression are defined.
                    } else {

                        var selector = config[ 0 ];
                        var expression = config[ 1 ];

                    }
                    // Parse the expression into an invokable
                    // function. This way, we don't have to re-parse
                    // it every time the event handler is triggered.
                    var expressionHandler = $parse( expression );
                    // Bind to the click (currently only supported
                    // event type) to the root element and listen for
                    // clicks on the given selector.
                    element.on(
                        eventtype+".eventDelegate",
                        selector,
                        function( event ) {
                        	// Prevent the default behavior - this is
                            // not a "real" link.
                            event.preventDefault();
                            // Find the scope most local to the target
                            // of the click event.
                            var localScope = $( event.target ).scope();
                            // Invoke the expression in the local scope
                            // context to make sure we adhere to the
                            // proper scope chain prototypal inheritance.
                            localScope.$apply(
                                function() {

                                    expressionHandler( localScope );
                                }
                            );
                        }
                    );

                    // When the scope is destroyed, clean up.
                    $scope.$on(
                        "$destroy",
                        function( event ) {

                            element.off( eventtype+".clickDelegate" );

                        }
                    );
                }


                // Return the directive configuration.
                return({
                    link: link,
                    restrict: "A"
                });

            });


