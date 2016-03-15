'use strict';

/* Controllers */

angular.module('Story', ['infinite-scroll'])
//////for 'cards' page
.controller('CardController', ['AlumniSpot','PhotosofWeek','Teacher','News','Lessons', 'Quotes','$scope','$sce','BrowseSearch','$rootScope','Timeline','$location', '$routeParams','$window','Stats','Favorites', 'Sharer',
function(AlumniSpot, PhotosofWeek, Teacher, News, Lessons, Quotes, $scope, $sce, BrowseSearch, $rootScope, Timeline, $location, $routeParams, $window, Stats, Favorites, Sharer)
{
	$scope.noSubNav=true;
	$rootScope.showHeader=true;
	var alldata={};
	
	alldata.fullArr=[];
	$scope.alldata={arr:[],fullArr:[], years:[]};
	alldata.years=[];
	$scope.stats =[];
	$scope.states =[]				
	$scope.iterator=50;
	$scope.start_index=-100;
	$scope.end_index = -50;
	$scope.loading =true;
	$scope.filteredArr={arr:[], fullArr:[]};
	$scope.filteredBtnArr={arr:[], fullArr:[]};
	$scope.on_off='off';
	$scope.arr=[];
	$scope.showCards=true;
	$scope.showList=false;
	$scope.hideMap=true;
	$scope.hideFav=true;
	$scope.favState='off';
	$scope.LSinfo =false;
	$scope.showEmailForm=false;
	var nameStr='';	
	var arr=[];
	$scope.allchecked='notselected';
	////sets up the different view types (cards/list-table)
	$scope.viewButtons = [{name:'boxes', state:'on'}, {name:'list', state:'off'}];
	//////sets up the way different things are sorted  (via year, type, description, etc)
	$scope.orderButtons = [{name:'Year (Asc)', state:'off', order: 'dsc', type:'number', prop:'year', classy:'icon-sort-alpha-asc'},{name:'Year (Dsc)', state:'off', order:'asc', type: 'number', prop:'year',classy:'icon-sort-alpha-desc'}];
	
	$scope.template = 'boxes';
	
	var tmpArr=[];
	$scope.active_types =[];
	$scope.active_types=[{type:'headline', state:'off', name:'Headline'},{type:'description', state:'off', name:'Description'}, {type:'year', state:'on', name:'Year'}, {type:'type', name:'Type'}];
	
	
	$scope.runApp=function()
	{
		
		$scope.page = $location.path().split('/')[1].split('/')[0];
		/////If data has not been previously loaded and no session/screen has been saved, this loads all the data necessary for the app
		if(sessionStorage.fullArr==null)
		{				
				if($rootScope.alldata_root==null)
				{
						Timeline.getTimelineData().then(function(data){
						$scope.items = data;
						$scope.items.years.reverse();
						$rootScope.items_root=$scope.items;
						$scope.yearsWidth = $scope.items.years.length*75;
						$scope.navWidth = $('.navigation').width();
						$scope.windowHeight=$(window).height();
						//sessionStorage.timeline = $scope.items;
												

											
					Teacher.createTeacherList().then(function(data){
					$scope.teachers = data.data.reverse();
					$scope.teachers.forEach(function(item) {
								item.favorite = 'off'
								Favorites.checkFavorites(item);
					});
					
					
						alldata.years = data.years
						alldata.years=alldata.years.removeDuplicatesArr();
						alldata.fullArr=alldata.fullArr.concat($scope.teachers);
						//$scope.items.years.forEach(function(year){
							
							Stats.wpStats($scope.items.years).then(function(data){
								
								
								$scope.stats=data.stats;
								$scope.stats.forEach(function(item) {
								item.favorite = 'off'
								Favorites.checkFavorites(item);
								});
								
								alldata.fullArr=alldata.fullArr.concat($scope.stats);
						
						Stats.correlateStats($scope.teachers, $scope.items.years, $scope.stats).then(function(data){
								$scope.stats=data.stats;
								data.maps = data.maps.filter(function(item){
									
									if(item.headline != undefined){
										return true;	
									}
								});
								$scope.maps=data.maps
								$scope.maps.forEach(function(item){
										item.favorite='off';
										Favorites.checkFavorites(item)
										item.statesArr.forEach(function(state){
										if(state.num==0){
											state.num=state.abbreviation;
										}
									
									});
									
									
								});
								
							alldata.fullArr=alldata.fullArr.concat($scope.maps);	
							PhotosofWeek.getPOW().then(function(data){
							var pow = data;
							
								PhotosofWeek.getNonPOW().then(function(data){
									var nonpow=data;
									nonpow.forEach(function(item) {
									item.favorite = 'off'
									Favorites.checkFavorites(item);
									});
									
									pow = pow.concat(nonpow); 
									alldata.fullArr=alldata.fullArr.concat(pow);
									pow.forEach(function(pow){
									if(pow.headline.length>180)
									{
										pow.powSlice = pow.headline.Slicer(180)+'...';
									}
									else{
										pow.powSlice =pow.headline;
									}
									pow.favorite = 'off'
									Favorites.checkFavorites(pow);
									});	
									AlumniSpot.getSpotData().then(function(data){
										
										var spot = data;
										spot.forEach(function(item) {
										item.favorite = 'off'
										Favorites.checkFavorites(item);
										});
										alldata.fullArr=alldata.fullArr.concat(spot);
											News.getNewsData().then(function(data){
												
											var news = data;
											news.forEach(function(item) {
											item.favorite = 'off'
											Favorites.checkFavorites(item);
											});
											alldata.fullArr=alldata.fullArr.concat(news);
											
											Lessons.getLessonData().then(function(data){
												var lessons = data;
												lessons.forEach(function(lesson){
													if(lesson.description.length>180)
													{
														lesson.lessonSlice = lesson.description.Slicer( 180)+'...';
													}
													else{
														lesson.lessonSlice=lesson.description;
													}
													lesson.favorite = 'off'
													Favorites.checkFavorites(lesson);
												});
												
												alldata.fullArr=alldata.fullArr.concat(lessons);
													Quotes.getQuotesData().then(function(data){
													var quotes = data;
													quotes.forEach(function(quote){
													
														if(quote.quote.length>180)
														{
															quote.quoteSlice = quote.quote.Slicer( 180)+'...';
														}
														else{
															quote.quoteSlice=quote.quote;
														}
														quote.favorite = 'off'
														Favorites.checkFavorites(quote);
													});
													alldata.fullArr=alldata.fullArr.concat(quotes);
													
												
												 	
													
													
													alldata.arr=alldata.fullArr.slice($scope.start_index,$scope.end_index);	
																				
													
													$scope.alldata.fullArr = alldata.fullArr;
													
													$scope.alldata.arr=alldata.arr;
													
													
													$scope.orderData('year', 'dsc', 'num', 'headline')
													
													$scope.alldata.fullArr.pop();
													$rootScope.alldata_root = angular.copy($scope.alldata);
													$rootScope.alldata_root.fullArr = $rootScope.alldata_root.fullArr;
													$scope.filteredBtnArr.fullArr = $rootScope.alldata_root.fullArr;
													
													$scope.loading=false;

													//$scope.allchecked='selected';
									
													$scope.alldata.fullArr.forEach(function(item){
														$scope.items.years.forEach(function(year){
															
															if(item.year==year.year){
																
																year.state='selected';
																year.subNav.forEach(function(subNav){
																	//subNav.checked='selected';
																	subNav.on_off='off'
																	if(item.type==subNav.type)
																	{
																		subNav.state='selected';	
																	}
																});
															}
														});
													});
													});
												});
											});
										});
									});
								});
							});

						});
					});
				});
					
				}
				///if data has already been loaded, this makes sure that it does not reload
				else{
					
					$scope.alldata.fullArr=$rootScope.alldata_root.fullArr;
					$scope.alldata.arr=$scope.alldata.fullArr.slice(0,50);
					$scope.items=$rootScope.items_root ;
					$scope.yearsWidth = $scope.items.years.length*75;
					$scope.alldata.fullArr.forEach(function(item){
						//Favorites.checkFavorites(item);
						$scope.items.years.forEach(function(year){
							if(item.year==year.year){
								year.state='selected';
								year.subNav.forEach(function(subNav){
									if(item.type==subNav.type)
									{
										subNav.state='selected';
									}
								});
								
							}
						});
				});
				$scope.loading=false;
			
			}	
			
				
			
		}
		//////if a session has been saved (i.e.) a user has pressed buttons and then gone into a feature, this makes sure that upon returning to the cards page, only the cards that correspond with the buttons pushed show up
		else{
			$scope.alldata.fullArr=jQuery.parseJSON(sessionStorage.fullArr);
			$scope.alldata.arr = $scope.alldata.fullArr.slice(0,50);
			$scope.items=jQuery.parseJSON(sessionStorage.timeline);
			$scope.items.years=jQuery.parseJSON(sessionStorage.timeline);
			$scope.filteredBtnArr.fullArr=jQuery.parseJSON(sessionStorage.filteredBtnArr);
			$scope.yearsWidth = $scope.items.years.length*75;
			$scope.navWidth = $('.navigation').width();
			$scope.windowHeight=$(window).height();
			
				$scope.alldata.fullArr.pop();
				$scope.alldata.fullArr.forEach(function(item){
					Favorites.checkFavorites(item);
					$scope.items.years.forEach(function(year){
						if(item.year==year.year){
							
							year.state='selected';
							year.subNav.forEach(function(subNav){
								if(item.type==subNav.type)
								{
									subNav.state='selected';
								}
							});
							
						}
					});
				});
				
				$scope.loading=false;
				
				
					$scope.viewButtons.forEach(function(item){
						
					if(item.name==$scope.template)
					{
						item.state='on'
						
					}
					else{
						item.state='off'
					}
				});
				
	
			
		}
		
		
	};
	/////saves a user's state (i.e. the active buttons/cards) so upon returning from a feature they don't lose their selections
	$scope.savState = function()
	{
		sessionStorage.fullArr = JSON.stringify($scope.alldata.fullArr);
		sessionStorage.template = $scope.template;
		sessionStorage.timeline = JSON.stringify($scope.items.years);
		if($scope.filteredBtnArr!=null)
		{
		sessionStorage.filteredBtnArr = JSON.stringify($scope.filteredBtnArr.fullArr);
		}
		if($scope.items!=null)
		{
		sessionStorage.years =JSON.stringify($scope.items.years)
		}
	};
	//////controls the search; filters data that meets search requirements
	$scope.filterData =function(query){
		var query = query.sanitize();
		$scope.loading=true;
		$scope.query=query;
		$scope.filteredBtnArr.arr=[];
		$scope.filteredBtnArr.fullArr=[];
		if(query.length==0  )
		{
			$scope.alldata.fullArr=$rootScope.alldata_root.fullArr;
			$scope.alldata.arr=$scope.alldata.fullArr.slice(0, 50);
			$scope.loading =false;
			
		}
		else{
			BrowseSearch.SearchData($rootScope.alldata_root.fullArr, query, ['headline', 'year', 'type'], 'headline').then(function(data){
			$scope.alldata.arr = data.arr;
			$scope.alldata.fullArr = data.fullArr;
			$scope.turnOffNav();
			$scope.loading=false;
		});
		}
		$scope.savState();
	};
	////upon button click, this filters data so that it meets a specific button click's requirement
	$scope.filterDataBtn =function(query, properties, type, checking_prop){
		$scope.query="";
		
		if(query.length==0  )
		{
			$scope.alldata.arr= $rootScope.alldata_root.fullArr.slice(0, 50);
			$scope.alldata.fullArr=$rootScope.alldata_root.fullArr;
			$scope.loading=false;
			
		}
		else{
			
			/////////////Create Filter Data function and change from SearchData to FilterData
			BrowseSearch.FilterData($rootScope.alldata_root.fullArr, query, properties, 'headline', type, checking_prop).then(function(data){
			$scope.filteredBtnArr.fullArr = $scope.filteredBtnArr.fullArr.concat(data);
			//$scope.filteredBtnArr.fullArr=$scope.filteredBtnArr.fullArr.removeDuplicatesArrObj('headline', false)
			$scope.alldata.fullArr = $scope.filteredBtnArr.fullArr;
			$scope.alldata.arr = $scope.filteredBtnArr.fullArr.slice(0, 50);
			$scope.loading=false;
			$scope.savState();
		});
		
		
		}
	};
	////When 'turning a button off', this removes those cards from the UI
	$scope.removeDataFromUI = function(properties,  strs, type)
	{
		$scope.loading=true;
		var tmpArr=[];
		var tmpArr= $scope.alldata.fullArr.removeArrObj(properties, strs, type, 'headline');
		
		if(tmpArr.length!=0)
		{
			$scope.alldata.fullArr=tmpArr;
			$scope.alldata.arr = tmpArr.slice(0,50);
			$scope.filteredBtnArr.fullArr=tmpArr;
			$scope.loading=false;
			
		}
		else{
			$scope.filteredBtnArr.fullArr=[];
			$scope.filteredBtnArr.arr=[];
			$scope.alldata.arr= [];
			$scope.alldata.fullArr=$rootScope.alldata_root.fullArr;
			$scope.loading=false;
			
		}
			$scope.savState();
		
		
	};	
	/////When 'unchecking' a type of card, this removes those cards from the UI
	$scope.removeCheckedUI =function(property){
		$scope.loading = true;
		$scope.alldata.fullArr=$scope.alldata.fullArr.filter(function(item){
		if(item.type!=undefined)	
			if(item.type.indexOf(property)<0)
			{
				
				return true;
				
			}
			
		});
		$scope.filteredBtnArr.fullArr=$scope.alldata.fullArr;
		$scope.alldata.arr=$scope.alldata.fullArr.slice(0, 50);
		$scope.savState();
		$scope.loading=false;
	};
	/////works with infinite scrolling, when a user scrolls to the end of the page, this adds more cards to the UI
	$scope.addMore=function()	
	{
		$scope.loading_more=true;
		if($scope.alldata.arr.length<=$scope.alldata.fullArr.length){
		$scope.start_index =$scope.start_index+50;
		$scope.end_index = $scope.end_index+50
		////////////ensures the the start_index equals the length of the fullArr to 
		
			if($scope.start_index>$scope.alldata.fullArr.length){
				$scope.start_index =$scope.alldata.arr.length;
				$scope.end_index = $scope.start_index+50
				
			}
			else{
				$scope.start_index=$scope.start_index;
				$scope.end_index = $scope.start_index+50
			}
					$scope.alldata.arr=$scope.alldata.arr.concat($scope.alldata.fullArr.slice($scope.start_index, $scope.end_index));
		$scope.alldata.arr=  $scope.alldata.arr.removeDuplicatesArrObj('headline', false);
		$scope.loading_more=false;
		
		
		}
		else{
			$scope.alldata.arr=$scope.alldata.fullArr;
			$scope.end_index=$scope.alldata.fullArr.length;
			$scope.start_index=0;
		}
		
		
	};
	
	
	////////////////////////Buttons///////////////////////////	$scope.noSubnav=true;
	////Controls whether a user sees cards or a list/table
	$scope.controlViews = function(type){
		
		$scope.viewButtons =$scope.viewButtons.Toggle(type,'name' ,'on', 'off');
		$scope.viewButtons.forEach(function(item){
			if(item.state=='on')
			{
				$scope.template=item.name;
				$scope.savState();
			}
		});
		
	};
	//////opens and closes subnav on click of the gear icon (lower-left corner)
	$scope.controlSubNav=function()
	{
		$scope.showDiv=true;
		if($scope.noSubNav==false)
		{
			$scope.noSubNav=true;
		}
		else{
			$scope.noSubNav=false;
		}
	};
	/////////Changes the UI based on whether a navigation button is turned 'on' or 'off	
	$scope.changeNavClass=function(obj1, obj2 )
	{
		
		/////////////Toggles when MainNav/Years buttons pressed////////////
		if(obj2 ==undefined)
		{
						/////////Button active
			if(obj1.state=='selected')
			{
				
				$scope.allchecked = 'notselected';
				
				obj1.state='notselected';
				
				///////////on unselecting a button, this removes item from $scope.arr which is usedin changeNavCheck Function
				//////////to make sure that the year navigation lights up correctly when an checkbox is deactivated//////////////
				$scope.alldata.arr=[];
				var index = $scope.arr.indexOf(obj1);
				$scope.arr.splice(index, 1);
				obj1.subNav.forEach(function(subNav){
					subNav.state='notselected';
					
				});
				
				//////////Makes sure that if not all main nav items are selected, that no checkboxes light up
				$scope.items.years.forEach(function(year){
					year.subNav.forEach(function(item){

						item.checked='notselected';
						item.on_off='off';
					});
					
				});
				$scope.removeDataFromUI(['year'], [ obj1.year],'');
			}/////////////Button Not Active
			else
			{
				var holder_arr=[];
				obj1.state='selected';
				$scope.allchecked='notselected';
				
				obj1.subNav.forEach(function(subNav){
					subNav.state='selected';
				});
				/////////////Loops through the items to see if all years buttons are lit up; if so this makes sure that the checkbox is also filled in
				$scope.items.years.forEach(function(year){
					
					if(year.state=='selected'){
						holder_arr.push(year);
						
						if(holder_arr.length==$scope.items.years.length)
						{
							year.subNav.forEach(function(item){
								
							if(item.state=='selected')
								{
									$scope.changeNavCheck(item.name, item.checked, 'off');
								}
							});
						}
					}	
				});
				$scope.filterDataBtn('"'+obj1.year+'"', ['year'], '', '');
				
			}
			
		}
		//////////////controls SubNav Toggle///////////
		else{
			
			$scope.allchecked='notselected';
				if(obj2.state=='selected')
				{
					
					obj2.state='notselected';
					obj2.checked='notselected';
					obj2.checked='notselected';
					
					$scope.items.years.forEach(function(year){	
											
						year.state="notselected";
						
						year.subNav.forEach(function(item){
							if(year.state=='selected' && item.state=="selected"  && !nameStr.match(year.year))
							{
							 $scope.arr.push(item.year);	
							 nameStr+=item.year;
							}
							if(obj2.name==item.name)
								{
									
									//item.checked='notselected';
									item.on_off='off';
									
								}
							if(item.state=="selected")
							{
								year.state='selected';
							}				
								
							
						});
					});
						$scope.removeDataFromUI(['year', 'type'], [obj1.year, obj2.type],'button');
				
					}
				else if(obj2.state=='notselected'){
					var holder_arr=[];
				
					obj2.state='selected';
					obj1.state='selected';
					/////////////Loops through the items to see if all icon buttons are lit up; if so this makes sure that the checkbox is  filled in
					$scope.items.years.forEach(function(year){
						year.subNav.forEach(function(item){
						var y=year.subNav.indexOf(item);	
						if(obj2.name==item.name && item.state=='selected')
								{	
									holder_arr.push(item);
									$scope.filterDataBtn('"'+item.type+'"', ['year', 'type'] ,'button', year.year);	
									
								}
								if(holder_arr.length==$scope.items.years.length && y== year.subNav.length-1){
									$scope.changeNavCheck(obj2.name, item.checked, 'off');
								}
								
						});
					});
					
					
					
			}
			
		}
		
	};
	
	$scope.changeNavCheck = function(type, allselected,on_off)
	{
	
		
		/////////////If gray top check box is activated, all boxes and check boxes are given a fill///////////////
		if(type == "all")
		{
			
				if(allselected == 'notselected')
				{
					$scope.alldata.fullArr = $rootScope.alldata_root.fullArr;
					$scope.alldata.arr = $scope.alldata.fullArr.slice(0, 50);
					
					$scope.allchecked='selected';
					$scope.items.years.forEach(function(year){
						year.state = 'selected';
						year.subNav.forEach(function(item){
							item.checked='selected';
							item.state ='selected';
							});
						});
						
				}
				else {
						
					$scope.allchecked='notselected';
					$scope.items.years.forEach(function(year){
						year.state = 'notselected';
						year.subNav.forEach(function(item){
							item.checked='notselected';
							item.state ='notselected';
							item.on_off='off';
							
						});
					});
					$scope.alldata.fullArr=[];;
					$scope.removeCheckedUI(type);

			}	
			$scope.savState();
		}
		
		/////////////////If a single checkbox is pushed, this activates or deactivates that box based on the checked property of the 
		////////////////subNav properties of the years array	
		else
		{
///////////////If checkbox is clicked, this lights up the proper row and adds items to the $scope.arr variable
				//////////////Which is used in the else conditional to light up the proper icons when all checkboxes are unclicked.
				if(on_off=='off')
				{
					$scope.items.years.forEach(function(year){
						year.subNav.forEach(function(item){							
							
							if(year.state=='selected' && item.state=="selected"  && !nameStr.match(year.year))
							{
							 $scope.arr.push(year);	
							 nameStr+=year.year;
							}
							
							if(item.type==type || item.checked=="selected"){	
								
								year.state="selected";
								
								if(item.checked=='notselected')
								{
									item.state='selected';
									item.checked='selected';
									item.on_off='on';
									$scope.filterDataBtn('"'+item.type+'"', ['year', 'type'] ,'button', year.year);	
										
								}	
							}
						});	
						
					});
					$scope.savState();
					
					
				}else				
				{
					
					$scope.allchecked='notselected';
					var count=0;
					$scope.items.years.forEach(function(year){
								
						year.state='notselected';	
						/////////////Turns off all subnavigation icons for particular checkbox////////////////
						year.subNav.forEach(function(item){
							count = count+1;
							item.on_off='off';
							if(item.state=='selected' && item.type==type)
							{
								item.checked ='notselected';
								item.on_off='off'
								item.state ='notselected';
								
								//
																		

							}
							else if(item.state=='selected'&& item.type!=type){
								item.checked='selected';
								item.on_off='on'
								item.state ='selected';
								year.state='selected';
								//$scope.filterDataBtn('"'+item.type+'"', ['year', 'type'] ,'button', year.year);	
								//$scope.removeDataFromUI(['year', 'type'], [obj1.year, obj2.type],'button');
							}	
							else{
								item.checked ='notselected';
								item.on_off='off'
								item.state ='notselected';
								//$scope.removeDataFromUI(['year', 'type'], [item.year, item.type],'button');
								
							}
							
						});
								
					});
					$scope.removeCheckedUI(type);

					$scope.savState();	
					}
		}
			
	};
	/////////////turns off all navigation selections - used when searching
	$scope.turnOffNav = function(){
		
		$scope.items.years.forEach(function(item){
			item.state='notselected';
				item.subNav.forEach(function(item2){
					item2.checked='notselected';
					item2.selected ='notselected';
					item2.state='notselected';
				});
				
			});
	};
	///////////////////Search//////////////////////////
	///////////////////Features/////////////////////
	//////////upon clicking the Order ascending or descending button, this reorders cards
	$scope.orderData=function(parameter, name,	 asc_or_dsc, str_or_num)
	{
		//$scope.turnOffNav();
		
		if(asc_or_dsc == 'asc')
		{
			//$scope.alldata.fullArr=$rootScope.alldata_root.fullArr
			$scope.alldata.fullArr=$scope.alldata.fullArr.SortObjAsc(parameter.toLowerCase(), str_or_num, 'headline');
			$scope.alldata.arr = $scope.alldata.fullArr.slice(0,50);
			$scope.savState();
		}else{
			//$scope.alldata.fullArr=$rootScope.alldata_root.fullArr
			$scope.alldata.fullArr=$scope.alldata.fullArr.SortObjDsc(parameter.toLowerCase(), str_or_num, 'headline');
			$scope.alldata.arr = $scope.alldata.fullArr.slice(0,50);	
			$scope.savState();
		}
		$scope.orderButtons =$scope.orderButtons.Toggle(name,'name' ,'on', 'off');	
		
		};
	
	

	$scope.SkipValidation = function(value) {
			return $sce.trustAsHtml(value);
	};
//////////re-orders items based ascending or descending choice of user
	$scope.reOrder = function(id, type, button){
		
		$scope.active_types.forEach(function(item){
			
			if(id.type==item.type)
			{
				item.state='on';
			}
			else{
				item.state='off';
			}
		});
		if(type=='dsc')
		{
		$scope.alldata.fullArr=$scope.alldata.fullArr.SortObjDsc(id.type.toLowerCase(), 'str', id);
		$scope.alldata.arr = $scope.alldata.fullArr.slice(0,50);
		}
		else{
		$scope.alldata.fullArr=$scope.alldata.fullArr.SortObjAsc(id.type.toLowerCase(), 'str', id);
		$scope.alldata.arr = $scope.alldata.fullArr.slice(0,50);
		}
		$scope.savState();
	};

//////Toggles buttons	
$scope.toggleButtons = function(obj, id){
	
		
		$scope.orderButtons.forEach(function(item){
			
			if(item.name==obj.name && item.state=='off')
			{
				item.state='on';
			}
			else{
				item.state='off';
			}
		});
};
////Toggles on and off for favorite modal 
$scope.favToggle = function()
{
	 if($scope.favState=='off'){
	 $scope.favState='on';
	 $scope.hideFav=false;
	 $scope.setUpSocial();
	 }
	 else{
	 	$scope.favState='off';
	 	$scope.hideFav=true;
	 }
	 
};
/////shows and hides big map (stats cards)
$scope.bigMap =function(year)
	{
		$scope.maps.forEach(function(map){
			if(map.year == year)
			{
				$scope.map = map;
				
			}
		});
		$scope.hideMap=false;
			};
////turns on and off favorite/star selection	
$scope.favoriteClick=function(obj){
	var items_id = [];
		if (localStorage.getItem('FavoriteArr25th') != null && localStorage.getItem('FavoriteArr25th') != '') {
			var favorites = jQuery.parseJSON(localStorage.FavoriteArr25th);

		} else {
			var favorites = [];
		}
	if(obj.favorite=='off'){
		obj.favorite='on'
		favorites.push(obj);
		localStorage.setItem('FavoriteArr25th', JSON.stringify(favorites));
		$scope.favorites = Favorites.addFavorites();
		$scope.favoritesArr = jQuery.parseJSON(localStorage.FavoriteArr25th);
		 $scope.setUpSocial();
	}
	else{
		
		for (var x = 0; x < favorites.length; x++) {
				items_id.push(favorites[x].id);
			}
		var index = items_id.indexOf(obj.id);
		favorites.splice(index, 1);
		localStorage.setItem('FavoriteArr25th', JSON.stringify(favorites));
		$scope.favoritesArr = jQuery.parseJSON(localStorage.FavoriteArr25th);
		
		obj.favorite='off';
	
		$scope.alldata.arr.forEach(function(item){
			item.favorite='off';
			Favorites.checkFavorites(item);
		});
	}
};	
///clears local Storage
$scope.clearFav = function(){
	 $scope.favoritesArr=[]; 
	 localStorage.clear();
	 $scope.alldata.fullArr.forEach(function(item){
	 	item.favorite='off';
	 });
};

////////shows and hides info modal - in Favorites modal
$scope.toggleInfo = function()
	{
		if($scope.LSinfo==false)
		{
			$scope.LSinfo=true;
			$scope.showOption=true;
			$scope.info_state='on'
		}
		else{
			$scope.LSinfo=false;
			$scope.showOption=true;
			$scope.info_state='off'
		}
	};
//////Shows and hide email form	
$scope.toggleEmail = function()
	{
		if($scope.showEmailForm==false)
		{
			$scope.showEmailForm=true;
			$scope.showOption=true;
			$scope.mail_state='on'
		}
		else
		{
			$scope.showEmailForm=false;
			$scope.showOption=true;
			$scope.mail_state='off'
		}
	};
//////sets up favorites for email html email
$scope.setUpEmail = function()

	{
		$scope.success=true;

		$scope.email =Favorites.setUpEmail();
	
		
		$scope.address = $('#email').val();
		
		$scope.url=encodeURIComponent('http://teacheratsea.noaa.gov/25thAnniversary/php/send_html.php?email='+$scope.address+$scope.email);
		$scope.url = $scope.url.replace(/ /g, '%20');
		if($scope.address==''||$scope.address==undefined)
		{
		alert('Please enter a valid email address');
		}
		else
		{
			Favorites.getBitLy($scope.url).then(function(result){
				$scope.short_url=result;
			},function(error){$scope.errorMessage = true;});
		}
		
	};
	
/////sets up favorites for plain emails	
$scope.setUpPlainEmail = function()

	{
		$scope.success=true;
		$scope.email =Favorites.setUpEmail();
		$scope.address = $('#email').val();
		$scope.url = encodeURIComponent('http://teacheratsea.noaa.gov/25thAnniversary/php/send_plain.php?email='+$scope.address+$scope.email);
		$scope.url = $scope.url.replace(/\$/g, '#');
		$scope.url = $scope.url.replace(/ /g, '%20');
		if($scope.address==''||$scope.address==undefined)
		{
		alert('Please enter a valid email address');
		}
		else
		{
			Favorites.getBitLy($scope.url).then(function(result){
				$scope.short_url=result;
			},function(error){$scope.errorMessage = true;});
		}
				
	};	
/////////sets up favorites for sharing on social media
$scope.setUpSocial = function()
	{
		Sharer.getCards().then(function(data){
			
			$scope.fb_url = 'http%3A%2F%2Fteacheratsea.noaa.gov%2F25thAnniversary%2F%23%2Ffacebook%2F'+data.replace(/\?/g,'%3F').replace(/\//g, '!!!').replace(/:/g, '%3A').replace(/\*/g, '%2A').replace(/ /g, '%20').replace(/%2F24%2F/, '$$$$$');
			Favorites.getBitLy($scope.fb_url).then(function(result){
				$scope.social=result.url;
				
			},function(error){$scope.errorMessage = true;});
		

		});
		
		
	};	
	
if(localStorage.FavoriteArr25th!=null)
{
$scope.favoritesArr = jQuery.parseJSON(localStorage.FavoriteArr25th);
}
else{
	$scope.favoritesArr=[];
}

$scope.runApp();		
	
}])
/////////////controls the qs page (for social media and email sharing)
.controller('qsParser', ['Favorites','$location','$scope','$rootScope',
function(Favorites, $location, $scope, $rootScope){
	////////
	var qs = $location.path().split('/')[2];
	var items = qs.split('@@');
	items.pop();
	$scope.cards = [];
	items.forEach(function(item){
		var headline= item.split('**')[0];
		var image = item.split('**')[1].split('**')[0];
		var image = image.split('!!!').join('/');
		
		var url = item.split('**')[2]
		url = url.split('$$$')[0]+'/'+url.split('$$$')[1]+'/'+url.split('$$$')[2]
		
		$scope.cards.push({'headline':headline, 'image': image, 'url':url})
	});
	$rootScope.showHeader=false;
}])
////Controls feature page	
.controller('FeatureController', ['AlumniSpot','PhotosofWeek','Teacher','News','Lessons', 'Quotes','$scope','$sce','BrowseSearch','$rootScope','Timeline','$location', '$routeParams','Stats','Favorites',
function(AlumniSpot, PhotosofWeek, Teacher, News, Lessons, Quotes, $scope, $sce,  BrowseSearch, $rootScope, Timeline, $location, $routeParams, Stats, Favorites){
		var id=$routeParams.id;
		var tmpArr=[];
		$rootScope.showHeader=false;
		$scope.stats=[];
		$scope.showcaption=false;
		$scope.profileButtons = [{name:'blogs', state:'on'}, {name:'photos', state:'off'}];
		$scope.shareBox=false;

		$scope.buttonController=function(name)
		{
			
			$scope.profileButtons.forEach(function(btn){
				btn.state='off';
				if(btn.name==name){
					btn.state='on'
				}
				else{
					btn.state='off'
				}
			});
			
		};
	$scope.changeFeature=function(url, caption){
		$scope.isLoading=true;
		$scope.image=url;
		$scope.caption=caption;
		$scope.showcaption=true;
		var image= new Image() ;
		 	image.src=url;
		  	$(image).bind('load', function(){
					$scope.isLoading=false
					$scope.$apply();
					});
	};	
	$scope.getStory = function() {
		
					
					if($scope.shareBox==false){
					$scope.shareBox=true;
					if($scope.social==null){
						var address=window.location.origin+'/25thAnniversary/%23'+window.location.hash.replace('#', '');
						Favorites.getBitLy(address).then(function(result){
							$scope.social=result.url;
							$scope.message = 'Check out this article from the Teacher at Sea 25th Anniversary site ' + $scope.social
							$scope.message_link = encodeURIComponent($scope.message);
						
							},function(error){$scope.errorMessage = true;});
						}
					}
					else{
						 $scope.shareBox=false;
					}
					
	};
$scope.runSocialBtns =function(btn){
	$scope.sm_btns.forEach(function(item){
		item.state='off';
		
		if(btn.name==item.name)
		{
			item.state='on';
		item.classy='shower';
		}
		else{
			item.classy='hider';
			}
		});
};	

//////////////closes the share modal (feature page)
	$scope.closeShareBox = function() {
		$scope.sharer = false;
		$scope.shareBox = false;
	}	
	
		$scope.openFeature=function(index)
		{
		
		
		$scope.alldata.fullArr.forEach(function(item){
			if(id==item.id)
			{
				Favorites.checkFavorites(item);
				$scope.storyContent =item;
				$scope.image=$scope.storyContent.src;
				if($scope.storyContent.type=="profile")
				{
					Teacher.wpProfile($scope.storyContent.year,$scope.storyContent.name).then(function(data){
						$scope.blogs = data.items;
						$scope.images=data.Images;
						
						
						$scope.loading=false;
					});
				}
				else{
					$scope.loading=false;
				}
			}
		});
		
		
		
			
		};
	//////////controls clicking	of stars for favoriting
		$scope.favoriteClick=function(obj){
			var items_id = [];
				if (localStorage.getItem('FavoriteArr25th') != null && localStorage.getItem('FavoriteArr25th') != '') {
					var favorites = jQuery.parseJSON(localStorage.FavoriteArr25th);
		
				} else {
					var favorites = [];
				}
			if(obj.favorite=='off'){
				obj.favorite='on'
				favorites.push(obj);
				localStorage.setItem('FavoriteArr25th', JSON.stringify(favorites));

				$scope.favorites = Favorites.addFavorites();
			
			}
			else{
				
				for (var x = 0; x < favorites.length; x++) {
						items_id.push(obj.id);
					}
				var index = items_id.indexOf(obj.id);
				favorites.splice(index, 1);
				localStorage.setItem('FavoriteArr25th', JSON.stringify(favorites));
				obj.favorite='off';
			}
		};	
	
		
		$scope.alldata={arr:[], fullArr:[]}
		var alldata={};
		alldata.fullArr=[];
		if($rootScope.alldata_root==null)
		{
			$scope.loading=true;
			Timeline.getTimelineData().then(function(data){
						$scope.items = data;
						$scope.items.years.reverse();
						$rootScope.items_root = $scope.items;
						$scope.yearsWidth = $scope.items.years.length*75;
						$scope.navWidth = $('.navigation').width();
						$scope.windowHeight=$(window).height();
						//sessionStorage.timeline = $scope.items;
									
					Teacher.createTeacherList().then(function(data){
					
					$scope.teachers = data.data.reverse();
					$scope.teachers.forEach(function(item) {
								item.favorite = 'off'
								Favorites.checkFavorites(item);
					});
					
					
						alldata.years = data.years
						alldata.years=alldata.years.removeDuplicatesArr();
						alldata.fullArr=alldata.fullArr.concat($scope.teachers);
						Stats.wpStats($scope.items.years).then(function(data){
								$scope.stats=data.stats;
								$scope.stats.forEach(function(item) {
								item.favorite = 'off'
								Favorites.checkFavorites(item);
								});
								alldata.fullArr=alldata.fullArr.concat($scope.stats);
								
						Stats.correlateStats($scope.teachers, $scope.items.years, $scope.stats).then(function(data){
								$scope.stats=data.stats;
								
								$scope.maps=data.maps
								$scope.maps.forEach(function(item){
										item.favorite='off';
										Favorites.checkFavorites(item)
										item.statesArr.forEach(function(state){
										if(state.num==0){
											state.num=state.abbreviation;
										}
									
									});
									
									
								});
								
								alldata.fullArr=alldata.fullArr.concat($scope.maps);	
					
						
						PhotosofWeek.getPOW().then(function(data){
						var pow = data;
						
							PhotosofWeek.getNonPOW().then(function(data){
								var nonpow=data;
								nonpow.forEach(function(item) {
									item.favorite = 'off'
									Favorites.checkFavorites(item);
									});
								pow = pow.concat(nonpow); 
								alldata.fullArr=alldata.fullArr.concat(pow);
								pow.forEach(function(pow){
									if(pow.headline.length>180)
									{
										pow.powSlice = pow.headline.Slicer(180)+'...';
									}
									else{
										pow.powSlice =pow.headline;
									}
									pow.favorite = 'off'
									Favorites.checkFavorites(pow);
									});	
								AlumniSpot.getSpotData().then(function(data){
									var spot = data;
										spot.forEach(function(item) {
										item.favorite = 'off'
										Favorites.checkFavorites(item);
										});

									alldata.fullArr=alldata.fullArr.concat(spot);
										News.getNewsData().then(function(data){
										var news = data;
										news.forEach(function(item) {
											item.favorite = 'off'
											Favorites.checkFavorites(item);
											});
										alldata.fullArr=alldata.fullArr.concat(news);
										Lessons.getLessonData().then(function(data){
											var lessons = data;
											lessons.forEach(function(lesson){
													if(lesson.description.length>180)
													{
														lesson.lessonSlice = lesson.description.Slicer( 180)+'...';
													}
													else{
														lesson.lessonSlice=lesson.description;
													}
													lesson.favorite = 'off'
													Favorites.checkFavorites(lesson);
												});
											
											alldata.fullArr=alldata.fullArr.concat(lessons);
												Quotes.getQuotesData().then(function(data){
												var quotes = data;
												quotes.forEach(function(quote){
													
														if(quote.quote.length>180)
														{
															quote.quoteSlice = quote.quote.Slicer( 180)+'...';
														}
														else{
															quote.quoteSlice=quote.quote;
														}
														quote.favorite = 'off'
														Favorites.checkFavorites(quote);
													});
												alldata.fullArr=alldata.fullArr.concat(quotes);
												
												//alldata.fullArr.pop();
	
											 	
											
												
												
												alldata.arr=alldata.fullArr.slice($scope.start_index,$scope.end_index);	
																			
												//alldata.years=alldata.years.removeDuplicatesArr();
												$scope.alldata.fullArr = alldata.fullArr;
												$scope.alldata.arr=alldata.arr;
												
												$scope.alldata.fullArr = alldata.fullArr.SortObjDsc('year', 'num', 'headline');;
												/*$scope.alldata.fullArr.forEach(function(item){
														var i=$scope.alldata.fullArr.indexOf(item);
														item.id=i;
												});*/
												
												$scope.openFeature(id);										
												
						
										});
									});
								});
							});
							
						});
					});
				});
			
			});
			});
		});
		}
		else
		{
		
		$scope.loading=true;
		$scope.alldata.fullArr=$rootScope.alldata_root.fullArr.SortObjDsc('year', 'num', 'headline');
		$scope.openFeature($routeParams.id);
		}
		
$scope.sm_btns = [{
		name : 'facebook',
		state : 'on',
		classy : 'shower'
	}, {
		name : 'twitter',
		state : 'off',
		classy : 'hider'
	}, {
		name : 'google-plus',
		state : 'off',
		classy : 'hider'
	}];
	
		
		
}]);


