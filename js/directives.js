'use strict';

/* Directives */

TAS_Anniversary.directive('naviGation', function($injector, $compile, $q) {
	

	var linkFunction = function(scope, elm, attr) {
		scope.navWidth = $('.navigation').width();
		
		//scope.listWidth = $('.nav_ul ').width();
		//scope.threequarterWidth= scope.yearsWidth*.75;
		
		scope.marginLeft=0;
		
		scope.next = function(item, iteration) {

			if (scope.marginLeft < (scope.yearsWidth*.95)-scope.navWidth) {
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
				scope.marginLeft = (scope.yearsWidth*.95)-scope.navWidth;
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
		templateUrl: 'partials/navigation.html',
		link : linkFunction,
	};
}).directive('wpCarousel', function(HomepageData) {

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
}).directive('slideShow', function(Alumni,POW, $timeout, $q, $injector) {

	return {
		restrict : 'AE',
		scope : true,
		templateUrl : 'partials/slideshow.html',
		link : function(scope,element, attrs, tabsCtrl) {
			scope.checkContents=false;
			if(attrs.service =='POW')
			{
				scope.name="Photos of the Week";
				scope.tagline="Snapshots of learning"
			}
			else{
				scope.name="Alumni Association";
				scope.tagline="The Cruise is just the beginning..."
			}
			scope.windowWidth=window.innerWidth;
			$injector.get(attrs.service).getData().then(function(data)
			{
				
			scope.slides = data;
			
			scope.checkContents =true;
						
		

				scope.slideimages = [];
				//////////////Preload the first 3 images//////////////

				////////////////No preloading for image number 4 and greater///////////
				for (var z = 0; z < scope.slides.length; z++) {
					scope.slides[z].finalImage = scope.slides[z].src;
					  scope.slides[z].isLoading=true;
					   scope.image= new Image() 
					  scope.image.src= scope.slides[z].src;
					  scope.image.isLoading=true;
					  
     					scope.preload(scope.image, z);
				}
				scope.slides[0].visible = true;
				scope.slides[0].classy = 'active';
				scope.playhider = true;

			});
			scope.preload = function(img, number)
			{
				 $(img).bind('load', function(){
					img.isLoading=false;
					scope.slides[number].isLoading=false;				
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
					element.html("<div>NO Video</div>");
					// We have to put something into the DOM
				}
			});
		}
	};
}).directive('resizeTasa', function($window) {
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
			if (window.innerWidth > 1000) {
				scope.windowWidth = 215
			} else if (window.innerWidth < 1000 && window.innerWidth >= 800) {
				scope.windowWidth = 170
			} else if (window.innerWidth < 800 && window.innerWidth >= 640) {
				scope.windowWidth = 138;
			} else {
				scope.windowWidth = 120
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
}).directive('resizeHome', function($window) {
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
			if (window.innerWidth > 960) {
				scope.imgWidth = 199;
				scope.containerWidth=199
			} else if (window.innerWidth < 960 && window.innerWidth >= 800) {
				scope.imgWidth = 218;
				scope.containerWidth=238;
			} else if (window.innerWidth < 799 && window.innerWidth >= 640) {
				scope.imgWidth = 261
				scope.containerWidth = 281
			} else if (window.innerWidth < 639 && window.innerWidth >= 480) {
				scope.imgWidth = 185;
				scope.containerWidth=195;
			} else {
				scope.imgWidth = 261;
				scope.containerWidth=281;
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
}).directive('resizeCurrent', function($window) {
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
			if (window.innerWidth > 960) {
				scope.windowWidth = 175
			} else if (window.innerWidth < 960 && window.innerWidth >= 800) {
				scope.windowWidth = 220
			} else if (window.innerWidth < 800 && window.innerWidth >= 640) {
				scope.windowWidth = 175
			} else if (window.innerWidth < 640 && window.innerWidth >= 480) {
				scope.windowWidth = 190
			} else {
				scope.windowWidth = 125
			}

		}, true);

		w.bind('resize', function() {
			scope.$apply();
		});
	};
}).directive('resizeSocial', function($window) {
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
			if (window.innerWidth > 960) {
				scope.windowWidth = 220;
				scope.containerWidth=225
			} else if (window.innerWidth < 960 && window.innerWidth >= 800) {
				scope.windowWidth = 220;
				scope.containerWidth=240
			} else if (window.innerWidth < 800 && window.innerWidth >= 640) {
				scope.windowWidth = 170
				scope.containerWidth=170
			} else if (window.innerWidth < 640 && window.innerWidth >= 480) {
				scope.windowWidth = 315
				scope.containerWidth=335
			} else {
				scope.windowWidth = 190
				scope.containerWidth =200
			}

		}, true);

		w.bind('resize', function() {
			scope.$apply();
		});
	};
}).directive('resizeTabs', function($window) {
	return function(scope, element) {
		var w = angular.element($window);
		scope.getWindowDimensions = function() {
			return {
				'h' : w.height(),
				'w' : w.width()
			};
		};
		scope.$watch(scope.getWindowDimensions, function(newValue, oldValue) {
			scope.windowH = newValue.h;
			if (window.innerWidth > 960) {
				scope.topImageWidth = 250;
				scope.bottomImageWidth = 200;
			} else if (window.innerWidth < 960 && window.innerWidth >= 800) {
				scope.topImageWidth = 250;
				scope.bottomImageWidth = 200;
			} else if (window.innerWidth < 800 && window.innerWidth >= 640) {
				scope.topImageWidth = 250;
				scope.bottomImageWidth = 200;
			} else if (window.innerWidth < 640 && window.innerWidth >= 470) {
				scope.topImageWidth = 250;
				scope.bottomImageWidth = 150;
			} else {
				scope.topImageWidth = 250;
				scope.bottomImageWidth = 150;
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
}).directive('resizeProfile', function($window) {
	return function(scope, element) {
		var w = angular.element($window);
		scope.getWindowDimensions = function() {
			return {
				'h' : w.height(),
				'w' : w.width()
			};
		};
		scope.$watch(scope.getWindowDimensions, function(newValue, oldValue) {
			scope.windowH = newValue.h;
			if (window.innerWidth > 960) {

				scope.topImageWidth = 400;
				scope.video = 250;
			} else if (window.innerWidth < 960 && window.innerWidth >= 800) {
				scope.topImageWidth = 320;
				scope.video = 200
			} else if (window.innerWidth < 799 && window.innerWidth >= 640) {
				scope.topImageWidth = 220;
				scope.video = 190
			} else if (window.innerWidth < 640 && window.innerWidth >= 470) {
				scope.topImageWidth = 220;
			} else {
				scope.topImageWidth = 280;
				scope.video = 150;
			}

		}, true);

		w.bind('resize', function() {
			scope.$apply();
		});
	};
}).directive('resizeClass', function($window) {
	return function(scope, element) {
		var w = angular.element($window);
		scope.getWindowDimensions = function() {
			return {
				'h' : w.height(),
				'w' : w.width()
			};
		};
		scope.$watch(scope.getWindowDimensions, function(newValue, oldValue) {
			scope.windowH = newValue.h;
			if (window.innerWidth > 960) {

				scope.tnWidth = 100;
			} else if (window.innerWidth < 960 && window.innerWidth >= 800) {
				scope.tnWidth = 100;
			} else if (window.innerWidth < 800 && window.innerWidth >= 640) {
				scope.tnWidth = 100;
			} else if (window.innerWidth < 640 && window.innerWidth >= 470) {
				scope.tnWidth = 75;
			} else {
				scope.tnWidth = 75;

			}

		}, true);

		w.bind('resize', function() {
			scope.$apply();
		});
	};
}).directive('resizeList', function($window) {
	return function(scope, element) {
		var w = angular.element($window);
		scope.getWindowDimensions = function() {
			return {
				'h' : w.height(),
				'w' : w.width()
			};
		};
		scope.$watch(scope.getWindowDimensions, function(newValue, oldValue) {
			scope.windowH = newValue.h;
			if (window.innerWidth > 960) {
				scope.bigPow = 500
				scope.tnWidth = 200;
			} else if (window.innerWidth < 960 && window.innerWidth >= 800) {
				scope.bigPow = 400
				scope.tnWidth = 150;
			} else if (window.innerWidth < 800 && window.innerWidth >= 640) {
				scope.bigPow = 300
				scope.tnWidth = 150;
			} else if (window.innerWidth < 640 && window.innerWidth >= 480) {
				scope.bigPow = 290
				scope.tnWidth = 298;
			} else {
				scope.bigPow = 290
				scope.tnWidth = 290;
			}

		}, true);

		w.bind('resize', function() {
			scope.$apply();
		});
	};
}).directive('resizesearchBlog', function($window) {
	return function(scope, element) {
		var w = angular.element($window);
		scope.getWindowDimensions = function() {
			return {
				'h' : w.height(),
				'w' : w.width()
			};
		};
		scope.$watch(scope.getWindowDimensions, function(newValue, oldValue) {
			scope.windowH = newValue.h;
			if (window.innerWidth > 960) {
				scope.search_blog = 100;

			} else if (window.innerWidth < 960 && window.innerWidth >= 800) {
				scope.search_blog = 100;
			} else if (window.innerWidth < 800 && window.innerWidth >= 640) {
				scope.search_blog = 85;
			} else if (window.innerWidth < 640 && window.innerWidth >= 470) {
				scope.search_blog = 75;
			} else {
				scope.search_blog = 75
			}

		}, true);

		w.bind('resize', function() {
			scope.$apply();
		});
	};
}).directive('resizesearchImage', function($window) {
	return function(scope, element) {
		var w = angular.element($window);
		scope.getWindowDimensions = function() {
			return {
				'h' : w.height(),
				'w' : w.width()
			};
		};
		scope.$watch(scope.getWindowDimensions, function(newValue, oldValue) {
			scope.windowH = newValue.h;
			if (window.innerWidth > 960) {
				scope.search_image = 150;

			} else if (window.innerWidth < 960 && window.innerWidth >= 800) {
				scope.search_image = 150;
			} else if (window.innerWidth < 800 && window.innerWidth >= 640) {
				scope.search_image = 125;
			} else if (window.innerWidth < 640 && window.innerWidth >= 470) {
				scope.search_image = 110;
			} else {
				scope.search_image = 100
			}

		}, true);

		w.bind('resize', function() {
			scope.$apply();
		});
	};
}).directive('resizeBigimage', function($window) {
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
			if (window.innerWidth > 960) {
				scope.bigImageWidth = 650
			} else if (window.innerWidth < 960 && window.innerWidth >= 800) {
				scope.bigImageWidth = 600
			} else if (window.innerWidth < 799 && window.innerWidth >= 640) {
				scope.bigImageWidth = 500
			} else if (window.innerWidth < 640 && window.innerWidth >= 470) {
				scope.bigImageWidth = 390;
			} else {
				scope.bigImageWidth = 240
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
}).directive('resizeTimeline', function($window) {
	return function(scope, element, attrs) {
		var w = angular.element($window);
		scope.getWindowDimensions = function() {
			return {
				'h' : w.height(),
				'w' : w.width()
			};
		};
		scope.$watch(scope.getWindowDimensions, function(newValue, oldValue) {
			scope.windowHeight = newValue.h;
			if (window.innerWidth > 1200) {
				scope.timelineMove = parseInt(attrs.x)+$(window).width();
				scope.timelineExtend= $(window.width*.8);
			}
			else if (window.innerWidth > 960&&window.innerWidth<1200) {
				scope.timelineWidth = parseInt(attrs.x)+$(window).width();
			} else if (window.innerWidth < 960 && window.innerWidth >= 800) {
				scope.timelineWidth = 600+$('svg_us').width();
			} else if (window.innerWidth < 799 && window.innerWidth >= 640) {
				scope.timelineWidth = 500+$('svg_us').width();
			} else if (window.innerWidth < 640 && window.innerWidth >= 470) {
				scope.timelindWidth = 390+$('svg_us').width();;
			} else {
				scope.timelineWidth = 240+$('svg_us').width();
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
}).directive('imageonload', function() {
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
}).directive('featureImage', function(){
    return function(scope, element, attrs){
        var url = attrs.featureImage;
        element.css({
            'background-image': 'url(' + url +')',
            'background-size' : 'cover'
        });
    };
}).directive("ngTouchmove", function () {
  return {
    controller: function ($scope, $element, $attrs) {
      $element.bind('touchstart', onTouchStart);
      
      function onTouchStart(event) {
        event.preventDefault();
        $element.bind('touchmove', onTouchMove);
        $element.bind('touchend', onTouchEnd);
      };
      
      function onTouchMove(event) {
          var method = '$scope.' + $element.context.getAttribute('ng-touchmove');
          $scope.$apply(function () {
              eval(method);
          });
      };
      
      function onTouchEnd(event) {
        event.preventDefault();
        $element.unbind('touchmove', onTouchMove);
        $element.unbind('touchend', onTouchEnd);
      };
    }
  };
})
.directive("ngTouchstart", function () {
  return {
    controller: function ($scope, $element, $attrs) {
      $element.bind('touchstart', onTouchStart);
      
      function onTouchStart(event) {
        var method = '$scope.' + $element.context.getAttribute('ng-touchstart');
        $scope.$apply(function () {
          eval(method);
        });
      };
    }
  };
})
.directive("ngTouchend", function () {
  return {
    controller: function ($scope, $element, $attrs) {
      $element.bind('touchend', onTouchEnd);
      
      function onTouchEnd(event) {
        var method = '$scope.' + $element.context.getAttribute('ng-touchend');
        $scope.$apply(function () {
          eval(method);
        });
      };
    }
  };
});

