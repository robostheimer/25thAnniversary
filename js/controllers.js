'use strict';

/* Controllers */

angular.module('Story', ['infinite-scroll'])
.controller('CardController', ['AlumniSpot','PhotosofWeek','Teacher','News','Lessons', 'Quotes','$scope','$sce','BrowseSearch','$rootScope','Timeline','$location', '$routeParams',
function(AlumniSpot, PhotosofWeek, Teacher, News, Lessons, Quotes, $scope, $sce, BrowseSearch, $rootScope, Timeline, $location, $routeParams)
{
	/*
	for(var x=1; x<100; x++)
	{
		console.log(x)
		if(x%3==0  && x%15!=0)
		{
			console.log(x+':Fizz')
		}
		if(x%5==0&&x%15!=0)
		{
			console.log(x+':Buzz')
		}
		if(x%15==0 &&x!=0)
		{
			console.log('FizzBuzz')
		};
		
	}
	
	var str='<i>I love it</i>';
	str =str.removeHTML();
	console.log(str);
	console.log(str.reverse())
	
	var str2 = 'Sue Zupko-2014';
	str2 = str2.diggPatt('-');
	console.log(str2);
	
	var url = 'https://teacheratsea.wordpress.com/2015/05/26/dj-kast-and-the-interview-with-emily-peacock/';
	var title = url.createTitleFromURL();
	console.log(title);
	
	
	var searchterm = '"blue whales"';
	var searchtermArr = searchterm.strSplitter('"');
	console.log(searchtermArr)
	
	var animals = ['cat', 'dog', 'moose', 'cat'];
	var animales = animals.savArrayDups();
	console.log(animales);
	
	var arr = [{type:'cat'}, {type:'dog'}, {type:'moose'}, {type:'cat'}];
	var dups =arr.savArrayDupsObj('type');
	var arr2=[{type:'dog'}, {'type':'cat'}];
	console.log(dups)
	
	arr= arr.preventDuplicatesValues(arr2, 'type','push');
	console.log(arr);
	
	animals = animals.preventDuplicates(animales, 'push');
	console.log(animals);
	
	////////////Closure//////////////

		
	function adder(x){
		var iterator = 1;
		x=x+1
		function subtractor(y)
		{
			console.log(x-y);
		}
		subtractor(3);
	}	
	adder(8);
	adder('8');
	console.log(adder(parseInt('8', 10)))
	///////////==Performs type conversion///////////
	console.log(8=='8');
	//////////=== does not perform type conversion///////////
	console.log(8==='8')
	
	
	var test =['bear', 'dog', 'suz'];
	console.log(test.removeItem('ind', 0));
	console.log(test.removeItem('str', 'bear'))
	var test2 =[{type:'bear'}, {type:'dog'}, {type:'suz'}];
	
	//console.log(test2.removeItem('ind', 0));
	console.log(test2.removeItem('str', 'suz'))
		function setUp(x) {
		  var tmp = 3;  
		     function Add(y) {   
		          console.log(x + y + (++tmp)); // will alert 16 
		          }  
		Add(10);
		}
		setUp(2);
		
		/////////logs 16///////////
	///////////////////////*/
	$scope.noSubNav=true;
	var alldata={};
	alldata.fullArr=[];
	$scope.alldata={arr:[],fullArr:[], years:[]};
	$scope.alldata_all=[];
	alldata.years=[];
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
	var nameStr='';	
	var arr=[];
	$scope.allchecked='notselected';
	$scope.viewButtons = [{name:'boxes', state:'on'}, {name:'list', state:'off'}];
	$scope.orderButtons = [{name:'Year (Dsc)', state:'off', order: 'dsc', type:'number', prop:'year'}, {name:'Year (Asc)', state:'off', order:'asc', type: 'number', prop:'year'}, {name: 'Type', state:'off', order:'dsc', type:'str', prop: 'type'}];
	
	$scope.template = 'boxes';
	
	
	
	
	
	$scope.runApp=function()
	{
		$scope.page = $location.path().split('/')[1].split('/')[0];
		
		if(sessionStorage.arr==null)
		{
			console.log('null')
				if($rootScope.alldata_root==null)
				{
					console.log($scope.alldata.fullArr.length);
					Teacher.createTeacherList().then(function(data){
					var teachers = data.data.reverse();
						alldata.years = data.years
						alldata.fullArr=alldata.fullArr.concat(teachers);
						
						PhotosofWeek.getPOW().then(function(data){
						var pow = data;
						
							PhotosofWeek.getNonPOW().then(function(data){
								var nonpow=data;
								
								pow = pow.concat(nonpow); 
								alldata.fullArr=alldata.fullArr.concat(pow);
								pow.forEach(function(pow){
								if(pow.headline.length>220)
								{
									pow.powSlice = pow.headline.Slicer(220)+'...';
								}
								else{
									pow.powSlice =pow.headline;
								}
								});	
								AlumniSpot.getSpotData().then(function(data){
									
									var spot = data;
									alldata.fullArr=alldata.fullArr.concat(spot);
										News.getNewsData().then(function(data){
										var news = data;
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
											});
											
											alldata.fullArr=alldata.fullArr.concat(lessons);
												Quotes.getQuotesData().then(function(data){
												var quotes = data;
												alldata.fullArr=alldata.fullArr.concat($scope.quotes);
												alldata.fullArr.pop();
											 	alldata.fullArr.SortObjDsc('year', 'num', 'headline');
												$scope.alldata_all = alldata.fullArr;
												alldata.fullArr = alldata.fullArr;
												alldata.arr=alldata.fullArr.slice($scope.start_index,$scope.end_index);									
												alldata.years=alldata.years.removeDuplicatesArr();
												$scope.alldata = alldata;
												$rootScope.alldata_root = $scope.alldata;
												$scope.loading=false;
												Timeline.getTimelineData().then(function(data){
													$scope.items = data;
													$scope.items.years.reverse();
													$scope.yearsWidth = $scope.items.years.length*75;
													$scope.navWidth = $('.navigation').width();
													$scope.windowHeight=$(window).height();
													$scope.alldata.fullArr.forEach(function(item){
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

											});
						
										});
									});
								});
							});
							
						});
					});
				});
				}
				else{
					$scope.alldata=$rootScope.alldata_root;
					$scope.alldata_all = $scope.alldata.fullArr;
					$scope.loading=false;
			
					}	
			
				
			
		}
		else{
			console.log('not null')
			$scope.alldata.arr = jQuery.parseJSON(sessionStorage.arr);
			$scope.alldata.fullArr=jQuery.parseJSON(sessionStorage.fullArr);
			console.log(sessionStorage)
			Timeline.getTimelineData().then(function(data){
				$scope.items = data;
				$scope.items.years.reverse();
				$scope.yearsWidth = $scope.items.years.length*75;
				$scope.navWidth = $('.navigation').width();
				$scope.windowHeight=$(window).height();
				
		
			
			
				
				//$scope.buttonsOn = jQuery.parseJSON(sessionStorage.buttonsOn);
				//console.log($scope.buttonsOn);
				
				$scope.alldata.fullArr.forEach(function(item){
					$scope.items.years.forEach(function(year){
						if(item.year==year.year){
							console.log(year)
						
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
						console.log(item)
						
					}
					else{
						item.state='off'
					}
				});
				
	
			});	
		}
		
		
	};
	
	$scope.savState = function()
	{
		console.log('saving')
		sessionStorage.arr = JSON.stringify($scope.alldata.arr);
		sessionStorage.fullArr = JSON.stringify($scope.alldata.fullArr);
		sessionStorage.template = $scope.template;
	};
	
	$scope.filterData =function(query){
		
		
		$scope.query=query;
		if(query.length==0  )
		{
			$scope.filteredArr=[];
			$scope.alldata.arr= $scope.alldata_all.slice(0, 50);
			$scope.alldata.fullArr=$scope.alldata_all
		}
		else{
			BrowseSearch.SearchData($scope.alldata_all, query, ['headline', 'year', 'type'], 'headline').then(function(data){
			$scope.alldata.arr = data.arr;
			$scope.alldata.fullArr = data.fullArr;
			$scope.turnOffNav();
		});
		}
		
	};
	$scope.filterDataBtn =function(query, properties, type, checking_prop){
		
		
		if(query.length==0  )
		{
			
			$scope.alldata.arr= $scope.alldata_all.slice(0, 50);
			$scope.alldata.fullArr=$scope.alldata_all;
			$scope.loading=false;
			$scope.savState();
		}
		else{
			/////////////Create Filter Data function and change from SearchData to FilterData
			BrowseSearch.FilterData($scope.alldata_all, query, properties, 'headline', type, checking_prop).then(function(data){
			$scope.alldata.arr=[];	
			
			$scope.filteredBtnArr.fullArr = $scope.filteredBtnArr.fullArr.concat(data);
			$scope.filteredBtnArr.fullArr=$scope.filteredBtnArr.fullArr.removeDuplicatesArrObj('headline', false)
			$scope.alldata.fullArr = $scope.filteredBtnArr.fullArr;
			$scope.alldata.arr = $scope.filteredBtnArr.fullArr.slice(0, 50);
			$scope.loading=false;
			$scope.savState();
			
			
		});
		
		}
	};
	$scope.removeDataFromUI = function(properties,  strs, type)
	{
		
		var tmpArr=[];
		var tmpArr= $scope.alldata.fullArr.removeArrObj(properties, strs, type, 'headline');
		
		if(tmpArr.length!=0)
		{
			$scope.alldata.fullArr=tmpArr;
			$scope.alldata.arr = tmpArr.slice(0,50);
			$scope.loading=false;
			$scope.savState();
		}
		else{
			$scope.filteredBtnArr.fullArr=[];
			$scope.filteredBtnArr.arr=[]
			$scope.alldata.arr= $scope.alldata_all.slice(0, 50);
			$scope.alldata.fullArr=$scope.alldata_all;
			console.log($scope.alldata.fullArr);
			$scope.loading=false;
			$scope.savState();
		}
		
	};	
	
	$scope.removeCheckedUI =function(property){
		
		$scope.alldata.fullArr=$scope.alldata.fullArr.filter(function(item){
			if(item.type.indexOf(property)<0)
			{
				
				return true;
			}
			
		});
		$scope.alldata.arr= $scope.alldata.fullArr.slice(0, 50);
		if($scope.alldata.arr.length==0){
			$scope.alldata.fullArr= $scope.alldata_all;
			$scope.alldata.arr= $scope.alldata.fullArr.slice(0, 50);
			$scope.savState();
			
		}
	};
	
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
			$scope.alldata.arr=$scope.alldata_arr;
			$scope.start_index=$scope.alldata.fullArr.length;
			$scope.end_index=$scope.alldata.fullArr.length+50;
			console.log($scope.start_index)
		}
		
		
	};
	
	$scope.addMoreFiltered=function()	
	{

		if($scope.filteredArr.arr.length>=$scope.iterator)
		{
		$scope.index_start =$scope.index_start+50
		$scope.index_end = $scope.index_start+50
		
			if($scope.end_index<$scope.filteredArr.arr.length){
				$scope.end_index=$scope.index_end;
			}else{
				$scope.index_end=$scope.filteredArr.arr.length;
			}
		$scope.filteredArr.arr=$scope.filteredArr.arr.concat($scope.filteredArr.fullArr.slice($scope.start_index, ($scope.end_index+50)));
				}
		
	};

	$scope.addMoreFilteredBtn=function()	
	{

		if($scope.filteredBtnArr.arr.length>=$scope.iterator)
		{
			$scope.index_start =$scope.index_start+$scope.iterator;
			$scope.index_end = $scope.index_start+$scope.iterator;
			
			if($scope.end_index<$scope.filteredBtnArr.arr.length){
				$scope.end_index=$scope.index_end;
			}else{
				$scope.index_end=$scope.filteredBtnArr.arr.length;
			}
			$scope.filteredBtnArr.arr=$scope.filteredBtnArr.arr.concat($scope.filteredBtnArr.fullArr.slice($scope.index_start, ($scope.index_start+50)));
		
		}
		
	};	
	////////////////////////Buttons///////////////////////////	$scope.noSubnav=true;
	
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
	
	$scope.controlSubNav=function()
	{
		if($scope.noSubNav==false)
		{
			$scope.noSubNav=true;
		}
		else{
			$scope.noSubNav=false;
		}
	};
		
	$scope.changeNavClass=function(obj1, obj2 )
	{
		
		$scope.orderButtons = [{name:'Year (Dsc)', state:'off', order: 'dsc', type:'number', prop:'year'}, {name:'Year (Asc)', state:'off', order:'asc', type: 'number', prop:'year'}, {name: 'Type', state:'off', order:'dsc', type:'str', prop: 'type'}];
	
		$scope.query="";
		$scope.loading=true;
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
					$scope.removeDataFromUI(['year', 'type'], [obj1.year, obj2.type],'button');
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
									
									item.checked='notselected';
									item.on_off='off';
									
								}
							if(item.state=="selected")
							{
								year.state='selected';
							}				
								
							
						});
					});
					}
				else if(obj2.state=='notselected'){
					var holder_arr=[];
					
					obj2.state='selected';
					obj1.state='selected';
					//console.log(obj2)
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
		$scope.orderButtons = [{name:'Year (Dsc)', state:'off', order: 'dsc', type:'number', prop:'year'}, {name:'Year (Asc)', state:'off', order:'asc', type: 'number', prop:'year'}, {name: 'Type', state:'off', order:'dsc', type:'str', prop: 'type'}];
	
		$scope.loading=true;
		/////////////If gray top check box is activated, all boxes and check boxes are given a fill///////////////
		if(type == "all")
		{
			
				if(allselected == 'notselected')
				{
					$scope.alldata.fullArr = $scope.alldata_all;
					$scope.alldata.arr = $scope.alldata.arr.slice(0, 50);
					$scope.allchecked='selected';
					$scope.items.years.forEach(function(year){
						year.state = 'selected';
						year.subNav.forEach(function(item){
							item.checked='selected';
							item.state ='selected';
							});
						});
						$scope.loading=false;
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
					$scope.loading=false;
			}	
			
		}
		
		/////////////////If a single checkbox is pushed, this activates or deactivates that box based on the checked property of the 
		////////////////subNav properties of the years array	
		else
		{
///////////////If checkbox is clicked, this lights up the proper row and adds items to the $scope.arr variable
				//////////////Which is used in the else conditional to light up the proper icons when all checkboxes are unclicked.
				$scope.loading=true;
				if(on_off=='off')
				{
					
					$scope.items.years.forEach(function(year){
						year.subNav.forEach(function(item){							
							
							if(year.state=='selected' && item.state=="selected"  && !nameStr.match(year.year))
							{
							 $scope.arr.push(year);	
							 nameStr+=year.year;
							}
							
							if(item.type==type){	
								
								year.state="selected";
								
								if(item.checked=='notselected')
								{
									//$scope.allchecked='selected';	
									
									item.state='selected';
									item.checked='selected';
									item.on_off='on';
									$scope.filterDataBtn('"'+item.type+'"', ['year', 'type'] ,'button', year.year);	
										
								}
								else
								{
									//$scope.allchecked='notselected';	
									item.state='notselected';
									item.checked='notselected';
									item.on_off='on';
									
								}
								
							}
							
						});	
						
					});
					$scope.loading=false;
					
				}else				
				{
					$scope.removeCheckedUI(type);
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
					$scope.loading=false;
				}
		}
	};
	
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
	
	$scope.orderData=function(parameter, name,	 asc_or_dsc, str_or_num)
	{
		//$scope.turnOffNav();
		
		if(asc_or_dsc == 'asc')
		{
			//$scope.alldata.fullArr=$scope.alldata_all
			$scope.alldata.fullArr=$scope.alldata.fullArr.SortObjAsc(parameter.toLowerCase(), str_or_num, 'headline');
			$scope.alldata.arr = $scope.alldata.fullArr.slice(0,50);
			$scope.savState();
		}else{
			//$scope.alldata.fullArr=$scope.alldata_all
			$scope.alldata.fullArr=$scope.alldata.fullArr.SortObjDsc(parameter.toLowerCase(), str_or_num, 'headline');
			$scope.alldata.arr = $scope.alldata.fullArr.slice(0,50);	
			$scope.savState();
		}
		$scope.orderButtons =$scope.orderButtons.Toggle(name,'name' ,'on', 'off');	
		};
	
	$scope.openFeature=function(id)
	{
		
		
	};

	$scope.SkipValidation = function(value) {
			return $sce.trustAsHtml(value);
	};

	$scope.runApp();
	
	
}]).controller('FeatureController', ['AlumniSpot','PhotosofWeek','Teacher','News','Lessons', 'Quotes','$scope','$sce','BrowseSearch','$rootScope','Timeline','$location', '$routeParams',
function(AlumniSpot, PhotosofWeek, Teacher, News, Lessons, Quotes, $scope, $sce,  BrowseSearch, $rootScope, Timeline, $location, $routeParams){
	
}]);


