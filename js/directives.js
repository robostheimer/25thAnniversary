'use strict';

/* Directives */

TAS_Site.directive('naviGation', function($injector, $compile, $q) {

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
	/////
	var Profile = '<section id="image{{item.id}}" resize-card feature-image="{{item.src}}" color="{{item.colorCode}}" class="col-md-3 {{item.color}}" ng-show="item.isLoading==false" blend="soft-light" alpha="1"> <section class="icon_right"><span class="{{item.classy}}"></span></section><section class="card-text"><h3 ng-bind-html="SkipValidation(item.headline)">{{item.headline}}</h3></section><section class="card-button"><button class="{{item.color}}"><a href="#/profile/{{item.year}}/{{item.id}}" ng-click= role="button">View Profile »</a></button></section></section>';
		var Pow = '<section id="pow{{item.id}}" resize-card feature-image="{{item.src}}" color="{{item.colorCode}}" class="col-md-3 {{item.color}}" ng-show="item.isLoading==false" blend="soft-light" alpha="1"> <section class="icon_right"><span class="{{item.classy}} "></span></section><section class="card-text"><h3 ng-bind-html="SkipValidation(item.powSlice)"></h3></section><section class="card-button"><button class="{{item.color}}"><a href="#/photo/{{item.year}}/{{item.id}}" role="button">Learn More »</a></button></section></section>';
	var News = '<section id="news{{item.id}}" resize-card feature-image="{{item.src}}" color="{{item.colorCode}}" class="col-md-3 {{item.color}}" ng-show="item.isLoading==false" blend="soft-light" alpha="1"><section class="icon_right"><span class="{{item.classy}}"></span></section><section class="card-text"><h3 ng-bind-html="item.headline"></h3></section><section class="card-button"><button class="{{item.color}}"><a href="#/spotlight/{{item.year}}/{{item.id}}" role="button">Read the Story »</a></button></section></section>';
	
	
	var Article = '<section class="col-md-3 {{item.color}}"><section class="icon_right"><span class="{{item.classy}}"></span></section> <section class="card-text"><h3 ng-bind-html="SkipValidation(item.headline)"></h3><p>Check out this article from <em> {{item.mediaoutlet}}</em>.<p></section><section class="card-button"><button class="{{item.color}}"><a href="{{articleurl}}" role="button">Read Article »</a></button></section></section>';

	var Lesson = '<section class="col-md-3 {{item.color}}"><section class="icon_right"><span class="icon-chalkboard2 "></span></section> <section class="card-text"><h3 ng-bind-html="SkipValidation(item.headline)">}</h3><p>{{item.lessonSlice}}</p></section><section class="card-button"><button class="{{item.color}}"><a href="{{item.url}}" target="_blank" role="button">View Lesson»</a></button></section></section>';
	var Quotes = '<section id="quotes{{item.id}}" resize-card feature-image="{{item.src}}" color="{{item.colorCode}}" class="col-md-3 {{item.color}}" ng-show="item.isLoading==false" blend="soft-light" alpha="1"><section class="icon_right"><span class="{{item.classy}}"></span></section><section class="card-text"><h3 ng-bind-html="item.quoteSlice"></h3></section><section class="card-button"><button class="{{item.color}}"><a href="#/quotes/{{item.year}}/{{item.id}}" role="button">Read the Story »</a></button></section></section>';
	var Stat='<section id="stats{{item.id}}" resize-card  color="{{item.colorCode}}" class="col-md-3 {{item.color}}"  blend="soft-light" alpha="1"><section class="icon_right"><span class="{{item.classy}}"></span></section><section class="card-text"><h3>Year: {{item.year}}<br>No. of Teachers: {{item.numofteachers}}<br>Days at Sea: {{item.days}}<br>Hours at Sea: {{item.hours}}<br> Students Reached: {{item.students}}<br>Blogs Written: {{item.posts}}<br>Photos: {{item.num_images}}<br>States: <span class="states">{{item.stateStr}}</span></h3></section></section>'
	var Map='<section id="map{{item.id}}" resize-card  color="{{item.colorCode}}" class="col-md-3 {{item.color}}"  blend="soft-light" alpha="1"><section class="icon_right"><span class="{{item.classy}}"></span></section><section class="card-text"><h3>{{item.headline}}</h3><br><div class="svg_us" ng-include="\'svg/US_Map.svg\'" imgaeonload"></section></section>'

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
			
			elm.html(getTemplate(attr.type));
			var deferred = $q.defer();

			$compile(elm.contents())(scope);
			deferred.resolve();
			deferred.promise.then(function() {
			    
			});
		}
	};
}).directive('clearStorage', function($window) {
	return {
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
				
					
				scope.getWindowDimensions = function() {
					return {
						'h' : w.height(),
						'w' : w.width()
					};
				};
				scope.$watch(scope.getWindowDimensions, function(newValue, oldValue) {
				if (window.innerHeight > 1800) {
				scope.wHeight = w.height()*.97
				} else if (window.innerHeight < 1799 && window.innerHeight >= 1600) {
					scope.wHeight = window.innerWidth*.95
				} else if (window.innerHeight < 1400 && window.innerHeight >= 1200) {
					scope.wHeight = window.innerWidth*.93
				}else if (window.innerHeight >=1001 && window.innerHeight < 1199) {
					scope.wHeight = window.innerHeight*.9
				}else if (window.innerHeight >= 900 && window.innerHeight < 1000) {
					scope.wHeight = window.innerHeight*.88
				}else if (window.innerHeight >= 800 && window.innerHeight <899) {
					scope.wHeight = window.innerHeight*.88
				}else if (window.innerHeight >=700 && window.innerHeight < 799) {
					scope.wHeight = window.innerHeight*.85
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
		restrict : 'AE',

		link : function(scope, element, attrs) {
		var articleHeight=$('article').height();
		
		
		var w = angular.element($window);
		if(w.width()>w.height())
				{
				var w_ratio = w.width()/w.height();		
				console.log(w_ratio);
				$(element).css({
				'top':  (w.height()*w_ratio),
				'margin-top': w.height()-articleHeight,
				//'height' :$('.main').height() + articleHeight+30
					
					});
				}
				else{
					var w_ratio = w.height()/w.width();	
					
					console.log(w_ratio);
					$(element).css({
					'top':  (w.height()*w_ratio),
					'margin-top': w.height()-articleHeight,
				//'height' :$('.main').height() + articleHeight+30
					
					});
				}	
			
			w.bind('resize', function(){
				var articleHeight=$('.main').height() + $('article h2').height()+parseInt($('article h2').css('padding-top'), 10)+parseInt($('article h2').css('padding-bottom'), 10)+parseInt($('article').css('padding-top'),10)+parseInt($('article').css('padding-bottom'), 10)+$('header').height()+parseInt($('.container').css('margin-top'),10);		
				if(w.width()>w.height())
				{
				var w_ratio = w.width()/w.height();		
				console.log(w_ratio);
				$(element).css({
				'top':  (w.height()*w_ratio),
				'margin-top': w.height()-articleHeight,
				//'height' :$('.main').height() + articleHeight+30
					
					});
				}
				else{
					var w_ratio = w.height()/w.width();	
					
					console.log(w_ratio);
					$(element).css({
					'top':  (w.height()*w_ratio),
					'margin-top': w.height()-articleHeight,
				//'height' :$('.main').height() + articleHeight+30
					
					});
				}	
				
			
			});
			
			attrs.$observe('loading', function(){
				
		console.log(w.width()+':'+w.height())
			
				
				$timeout(function(){
				var articleHeight=$('.main').height() + $('article h2').height()+parseInt($('article h2').css('padding-top'), 10)+parseInt($('article h2').css('padding-bottom'), 10)+parseInt($('article').css('padding-top'),10)+parseInt($('article').css('padding-bottom'), 10)+$('header').height()+parseInt($('.container').css('margin-top'),10);		
				if(w.width()>w.height())
				{
				var w_ratio = w.width()/w.height();		
				console.log(w_ratio);
				$(element).css({
				'top':  (w.height()*w_ratio),
				'margin-top': w.height()-articleHeight,
				//'height' :$('.main').height() + articleHeight+30
					
					});
				}
				else{
					var w_ratio = w.height()/w.width();	
					
					console.log(w_ratio);
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
			console.log($('article h2').css('padding-top'));
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
})
.directive('wpCarousel', function(HomepageData) {

	return {
		restrict : 'AE',
		scope : true,
		template : '<p>{{data}}</p>',
		//controller:controller,
		link : function(scope, element, attrs) {
			scope.wp = [];
			//console.log(scope.wp);
		},
	};
}).directive('slideShow', function(Slideshow, $timeout, preloadImage) {

	return {
		restrict : 'AE',
		scope : true,
		templateUrl : 'partials/slideshow.html',
		link : function(scope) {
			Slideshow.loadSlideData('19uuws3BhCGqVKp1Zl1uq-e4L1bbG9vla3DDZqMiL').then(function(data) {
				scope.slides = data;

				scope.slideimages = [];
				//////////////Preload the first 3 images//////////////

				////////////////No preloading for image number 4 and greater///////////
				for (var z = 0; z < scope.slides.length; z++) {
					scope.slides[z].finalImage = scope.slides[z].imageurl;

				}
				scope.slides[0].visible = true;
				scope.slides[0].classy = 'active';
				scope.slideshow_width = scope.slides.length * 620;
				scope.playhider = true;

			});

			scope.timer
			scope.remaining = scope.timer / 1000;

			var sliderFunc = function() {
				scope.timeout = $timeout(function() {
					scope.remaining--;
					scope.next();
					scope.timer = $timeout(sliderFunc, 3000);
				}, 3000);
			};

			sliderFunc();

			/*scope.$on('$destroy', function() {
			 $timeout.cancel(timer); // when the scope is getting destroyed, cancel the timer
			 });*/

			scope.next = function() {
				for (var i = 0; i < scope.slides.length; i++) {
					scope.slides[i].visible = false;
					scope.slides[i].classy = 'inactive';
				}
				if (scope.currentIndex < scope.slides.length - 1) {
					scope.currentIndex = scope.currentIndex + 1;
					scope.slides[scope.currentIndex].visible = true;
					scope.slides[scope.currentIndex].classy = 'active';
				} else {
					scope.currentIndex = 0;
					scope.slides[scope.currentIndex].visible = true;
					scope.slides[scope.currentIndex].classy = 'active';
				}
				//console.log(scope.currentIndex);

			};
			scope.prev = function() {
				for (var i = 0; i < scope.slides.length; i++) {
					scope.slides[i].visible = false;
					scope.slides[i].classy = 'inactive';

				}
				if (scope.currentIndex > 0) {
					scope.currentIndex = scope.currentIndex - 1;
					scope.slides[scope.currentIndex].visible = true;
					scope.slides[scope.currentIndex].classy = 'active';

				} else {
					scope.currentIndex = scope.slides.length - 1;
					scope.slides[scope.currentIndex].visible = true;
					scope.slides[scope.currentIndex].classy = 'active';
				}
			};
			scope.numberClick = function(num) {
				for (var i = 0; i < scope.slides.length; i++) {
					scope.slides[i].visible = false;
					scope.slides[i].classy = 'inactive';
				}
				scope.currentIndex = (num - 1)
				scope.slides[scope.currentIndex].visible = true;
				scope.slides[scope.currentIndex].classy = 'active';
				scope.playhider = false;
				$timeout.cancel(scope.timer);

			};
			scope.playPause = function() {
				if (scope.playhider == false) {
					scope.playhider = true;
					$timeout.cancel(scope.timer);
					sliderFunc();

				} else {
					scope.playhider = false;
					$timeout.cancel(scope.timer);

				}

			};

		}
	};
}).directive('slideShow', function(Alumni, POW, $timeout, $q, $injector) {

	return {
		restrict : 'AE',
		scope : true,
		templateUrl : 'partials/slideshow.html',
		link : function(scope, element, attrs, tabsCtrl) {
			scope.checkContents = false;
			if (attrs.service == 'POW') {
				scope.name = "Photos of the Week";
				scope.tagline = "Snapshots of learning"
			} else {
				scope.name = "Alumni Association";
				scope.tagline = "The Cruise is just the beginning..."
			}
			scope.windowWidth = window.innerWidth;
			$injector.get(attrs.service).getData().then(function(data) {

				scope.slides = data;

				scope.checkContents = true;

				scope.slideimages = [];
				//////////////Preload the first 3 images//////////////

				////////////////No preloading for image number 4 and greater///////////
				for (var z = 0; z < scope.slides.length; z++) {
					scope.slides[z].finalImage = scope.slides[z].src;
					scope.slides[z].isLoading = true;
					scope.image = new Image()
					scope.image.src = scope.slides[z].src;
					scope.image.isLoading = true;

					scope.preload(scope.image, z);
				}
				scope.slides[0].visible = true;
				scope.slides[0].classy = 'active';
				scope.playhider = true;

			});
			scope.preload = function(img, number) {
				$(img).bind('load', function() {
					img.isLoading = false;
					scope.slides[number].isLoading = false;
					scope.$apply();
				});
			};
			scope.timer
			scope.remaining = scope.timer / 1000;

			var sliderFunc = function() {

				scope.timeout = $timeout(function() {
					scope.remaining--;
					scope.next();

					scope.timer = $timeout(sliderFunc, 5000);
				}, 5000);
			};

			sliderFunc();

			/*scope.$on('$destroy', function() {
			 $timeout.cancel(timer); // when the scope is getting destroyed, cancel the timer
			 });*/

			scope.next = function() {
				for (var i = 0; i < scope.slides.length; i++) {
					scope.slides[i].visible = false;
					scope.slides[i].classy = 'inactive';
				}
				if (scope.currentIndex < scope.slides.length - 1) {
					scope.currentIndex = scope.currentIndex + 1;
					scope.slides[scope.currentIndex].visible = true;
					scope.slides[scope.currentIndex].classy = 'active';
				} else {
					scope.currentIndex = 0;
					scope.slides[scope.currentIndex].visible = true;
					scope.slides[scope.currentIndex].classy = 'active';
				}
				//console.log(scope.currentIndex);

			};
			scope.prev = function() {
				for (var i = 0; i < scope.slides.length; i++) {
					scope.slides[i].visible = false;
					scope.slides[i].classy = 'inactive';

				}
				if (scope.currentIndex > 0) {
					scope.currentIndex = scope.currentIndex - 1;
					scope.slides[scope.currentIndex].visible = true;
					scope.slides[scope.currentIndex].classy = 'active';

				} else {
					scope.currentIndex = scope.slides.length - 1;
					scope.slides[scope.currentIndex].visible = true;
					scope.slides[scope.currentIndex].classy = 'active';
				}
			};
			scope.numberClick = function(num) {
				for (var i = 0; i < scope.slides.length; i++) {
					scope.slides[i].visible = false;
					scope.slides[i].classy = 'inactive';
				}
				scope.currentIndex = (num - 1)
				scope.slides[scope.currentIndex].visible = true;
				scope.slides[scope.currentIndex].classy = 'active';
				scope.playhider = false;
				$timeout.cancel(scope.timer);

			};
			scope.playPause = function() {
				if (scope.playhider == false) {
					scope.playhider = true;
					$timeout.cancel(scope.timer);
					sliderFunc();

				} else {
					scope.playhider = false;
					$timeout.cancel(scope.timer);

				}

			};

		}
	};
}).directive('paginationPlease', function() {
	return {

		restrict : 'AE',
		scope : true,
		replace : true,
		templateUrl : 'partials/pagination.html',
		link : function(scope, element, attrs, routeParams) {

			scope.prevPageDisabled = function() {
				return scope.currentPage === 0 ? "disabled" : "";
			};

			scope.pageCount = function() {
				return Math.ceil(scope.data.length / scope.itemsPerPage) - 1;
			};

			scope.nextPage = function() {
				if (scope.currentPage < scope.pageCount()) {
					scope.currentPage++;
					// alert(scope.currentPage)
					scope.filtered_data.length = 0;
					window.scrollTo(0, 200);
					for (var y = (scope.itemsPerPage * scope.currentPage); y < ((scope.itemsPerPage * scope.currentPage) + scope.itemsPerPage); y++) {
						if (y < scope.data.length) {
							scope.filtered_data.push(scope.data[y]);
						}
					}
				}
			};

			scope.nextPageDisabled = function() {
				return scope.currentPage === scope.pageCount() ? "disabled" : "";
			};

		}
	};

}).directive('paginationRoutes', function() {

	return {

		restrict : 'AE',
		scope : true,
		replace : true,
		templateUrl : 'partials/pagination-routes.html',
		link : function(scope) {
			scope.data = [];
			scope.prevPageDisabled = function() {
				return scope.currentPage === 0 ? "disabled" : "";
			};

			scope.nextPageDisabled = function() {
				return scope.currentPage === (scope.pageCount() - 1) ? "disabled" : "";
			};
			scope.pageCount = function() {
				return Math.ceil(scope.data.length / scope.itemsPerPage) - 1;
			};

		}
	};

}).directive('ngEnter', function() {
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
}).directive('wpVideos', function() {
	return {

		restrict : 'AE',
		scope : true,

		link : function(scope, element, attr) {
			attr.$observe('flashvars', function(value) {

				if (value != "") {
					element.html('<embed type="application/x-shockwave-flash" src="http://s0.videopress.com/player.swf?v=1.03" width="' + attr.width + '" height="' + attr.height + '" wmode="direct" seamlesstabbing="true" allowfullscreen="true" allowscriptaccess="always" overstretch="true" flashvars="guid=' + scope.src.src + '&amp;isDynamicSeeking=true">');
				} else {
					element.html("<section>NO Video</section>");
					// We have to put something into the DOM
				}
			});
		}
	};
}).directive('resizeCard', function($window) {
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
				//console.log('dir'+TabsDataFetch.count)
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
			'background-color': 'rgba('+color+',' +alpha+')',
			'background-size' : 'cover',
			'background-blend-mode': blend
			});
			element.isLoading="true"
			var image= new Image() ;
		   // console.log(url);
			image.src=url;
		  	image.isLoading=true;
		  	
		  	$(image).bind('load', function(){
		  			$('#'+loader).addClass('ng-hide');
					$('#'+id).removeClass('ng-hide');
					//scope.alldata[number].isLoading=false;		
					//console.log(scope.alldata[number].isLoading)	
					scope.$apply();
					});

		}, true);

		w.bind('resize', function() {
			scope.$apply();
		});
		

			
		}
	};
}).directive('featureImageBig', function($window) {
	return {
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
			
				scope.windowWidth = window.innerWidth;
			
			scope.styles = function() {
				return {
					'height' : (newValue.h - 100) + 'px',
					'width' : (newValue.w - 100) + 'px'
				};
			};
			element.css({
			'background-image' : 'url(' + attrs.featureImageBig + '?w='+scope.windowWidth+')',
			'background-color': 'rgba('+color+', '+alpha+')',
			'background-size' : 'cover',
			'background-blend-mode':blend
			});
			element.isLoading="true"
		//console.log(url)
			var image= new Image() ;
		   // console.log(url);
			image.src=attrs.featureImageBig;
		  	scope.isLoading=true;
		  	///console.log(scope.image);
		  	$(image).bind('load', function(){
					scope.isLoading=false
					//scope.alldata[number].isLoading=false;		
					//console.log(scope.alldata[number].isLoading)	
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
			console.log(attrs.featureImageBig)
			var color = attrs.color;
			var blend =attrs.blend;
			var alpha = attrs.alpha;
			console.log(url);
			element.css({
			'background-image' : 'url(' + attrs.featureImageBig + '?w='+scope.windowWidth+')',
			'background-color': 'rgba('+color+', '+alpha+')',
			'background-size' : 'cover',
			'background-blend-mode':blend
			});
			scope.isLoading=false
		//console.log(url)
			
		});
		

			

		}
	};
})
.directive('ngDelay', ['$timeout', function ($timeout) {
    return {
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
            "eventDelegate",
            function( $parse ) {
            	console.log('clicked')
            	
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
                        	console.log(event)
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


