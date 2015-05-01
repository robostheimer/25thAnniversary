/* Controllers */
angular.module('Timeline', [])
.controller('Timeline', ['$scope','Timeline', function($scope, Timeline)
{
	$scope.noSubnav=true;
	$scope.on_off='off';
	$scope.arr=[];
	var nameStr='';	
	var arr=[];
	$scope.allchecked='notselected';
	Timeline.getTimelineData().then(function(data){
		
		$scope.items = data;
		$scope.windowWidth = window.innerWidth;
		$scope.windowWidth = $scope.windowWidth*.92;
		$scope.yearsWidth = $scope.items.years.length*75;
		$scope.navWidth = $('.navigation').width();
		$scope.windowHeight=$(window).height();
		
				
		if($scope.navWidth>($scope.windowWidth*.9))
		{
			$scope.noArrows = true;
		}
		else{
			$scope.noArrows=false;
		}
		
		
	});
	
	
	
	$scope.controlSubNav=function()
	{
		if($scope.noSubnav==false)
		{
			$scope.noSubnav=true;
		}
		else{
			$scope.noSubnav=false;
		}
	};
	

	
	
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
				
				var index = $scope.arr.indexOf(obj1);
				$scope.arr.splice(index, 1);
				console.log(obj1.subNav);
				HelperFunctions.forEach(obj1.subNav, function(subNav){
					subNav.state='notselected';
				});
				
				//////////Makes sure that if not all main nav items are selected, that no checkboxes light up
				HelperFunctions.forEach($scope.items.years, function(year){
					HelperFunctions.forEach(year.subNav, function(item){

						item.checked='notselected';
						item.on_off='off';
					});
					
				});
		
			}/////////////Button Not Active
			else
			{
				
				var holder_arr=[];
				obj1.state='selected';
				$scope.allchecked='notselected';
				
				HelperFunctions.forEach(obj1.subNav, function(subNav){
					subNav.state='selected';
				});
				
				/////////////Loops through the items to see if all years buttons are lit up; if so this makes sure that the checkbox is also filled in
				HelperFunctions.forEach($scope.items.years, function(year){
					if(year.state=='selected'){
						holder_arr.push(year);
						
						if(holder_arr.length==$scope.items.years.length)
						{
							HelperFunctions.forEach(year.subNav, function(item){
								console.log(item.state+':'+item.name);
							if(item.state=='selected')
								{
									$scope.changeNavCheck(item.name, item.checked, 'off');
								}
							});
						}
						
					}	
					
				});
				
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
				
					HelperFunctions.forEach($scope.items.years, function(year){							
						year.state="notselected";
						HelperFunctions.forEach(year.subNav, function(item){
							if(year.state=='selected' && item.state=="selected"  && !nameStr.match(year.year))
							{
							 $scope.arr.push($scope.items.years[a]);	
							 nameStr+=$scope.items.years[a].year;
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
					HelperFunctions.forEach($scope.items.years, function(year){
						HelperFunctions.forEach(year.subNav, function(item){
						var y=year.subNav.indexOf(item);	
						//console.log(obj2.name+':'+item.name+':'+item.state)
						if(obj2.name==item.name && item.state=='selected')
								{	
									holder_arr.push(item);
									
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
					
					$scope.allchecked='selected';
					HelperFunctions.forEach($scope.items.years, function(year){
						year.state = 'selected';
						HelperFunctions.forEach(year.subNav, function(item){
							item.checked='selected';
							item.state ='selected';
							});
						});
				}
				else {
						
					$scope.allchecked='notselected';
					HelperFunctions.forEach($scope.items.years, function(year){
						year.state = 'notselected';
						HelperFunctions.forEach(year.subNav, function(item){
							item.checked='notselected';
							item.state ='notselected';
							item.on_off='off';
							
						});
					});
			}	
			
		}
		
		/////////////////If a single checkbox is pushed, this activates or deactivates that box based on the checked property of the 
		////////////////subNav properties of the years array	
		else
		{
			
				///////////////If checkbox is clicked, this lights up the proper row and adds items to the $scope.arr variable
				//////////////Which is used in the else conditional to light up the proper icons when all checkboxes are unclicked.
				if(on_off=='off')
				{
					HelperFunctions.forEach($scope.items.years, function(year){
						HelperFunctions.forEach(year.subNav, function(item){							
							if(year.state=='selected' && item.state=="selected"  && !nameStr.match(year.year))
							{
							 $scope.arr.push(year);	
							 nameStr+=year.year;
							}
							
							if(item.name==type){	
								year.state="selected";
								if(item.checked=='notselected')
								{
									//$scope.allchecked='selected';	
									
									item.state='selected';
									item.checked='selected';
									item.on_off='on';
									
										
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
					
				}
				else				
				{
					$scope.allchecked='notselected';
					var count=0;
					HelperFunctions.forEach($scope.items.years, function(year){
								
								year.state='notselected';	
								/////////////Turns off all subnavigation icons for particular checkbox////////////////
								HelperFunctions.forEach(year.subNav, function(item){
									count = count+1;
									item.on_off='off';
									if(item.state=='selected' && item.name==type)
									{
										item.checked ='notselected';
										item.on_off='off'
										item.state ='notselected';
																				

									}
									else if(item.state=='selected'&& item.name!=type){
										item.checked='selected';
										item.on_off='on'
										item.state ='selected';
										year.state='selected';
										}
									else{
										item.checked ='notselected';
										item.on_off='off'
										item.state ='notselected';
									}
									
									
									
								});
								
						
					});
					
				}
			
		}
	};
	
}]);
angular.module('Story', ['infinite-scroll'])
.controller('storyController', ['AlumniSpot','PhotosofWeek','Teacher','News','Lessons', 'Quotes','$scope','$sce','HelperFunctions',
function(AlumniSpot, PhotosofWeek, Teacher, News, Lessons, Quotes, $scope, $sce, HelperFunctions)
{
	
	var alldata={};
	alldata.data=[];
	$scope.alldata={data:[], years:[]}
	$scope.alldata_all=[];
	alldata.years=[];
	$scope.iterator=50;
	$scope.start_index=-50;
	$scope.end_index = 0;
	$scope.index_start=0;
	$scope.index_end = 50;
	$scope.filtered=false;
	$scope.loading =true;
	$scope.filteredArr={arr:[], fullArr:[]};
	$scope.runApp=function()
	{
		
		Teacher.createTeacherList().then(function(data){
		var teachers = data.data.reverse();
			alldata.years = data.years
			alldata.data=alldata.data.concat(teachers);
			
			PhotosofWeek.getPOW().then(function(data){
			var pow = data;
			HelperFunctions.forEach(pow, function(pow){
				if(pow.headline.length>220)
				{
					pow.powSlice = HelperFunctions.Slicer(pow.headline, 220)+'...';
				}
				else{
					pow.powSlice =pow.headline;
				}
				});	
				PhotosofWeek.getNonPOW().then(function(data){
					var nonpow=data;
					pow = pow.concat(nonpow); 
					alldata.data=alldata.data.concat(pow);
					AlumniSpot.getSpotData().then(function(data){
						
						var spot = data;
						alldata.data=alldata.data.concat(spot);
							News.getNewsData().then(function(data){
							var news = data;
							alldata.data=alldata.data.concat(news);
							Lessons.getLessonData().then(function(data){
								var lessons = data;
								HelperFunctions.forEach(lessons, function(lesson){
									if(lesson.description.length>180)
									{
										lesson.lessonSlice = HelperFunctions.Slicer(lesson.description, 180)+'...';
									}
									else{
										lesson.lessonSlice=lesson.description;
									}
								});
								
								alldata.data=alldata.data.concat(lessons);
									Quotes.getQuotesData().then(function(data){
									var quotes = data;
									alldata.data=alldata.data.concat($scope.quotes);
									alldata.data = HelperFunctions.SortObjDsc('year', alldata.data, 'num');
									$scope.alldata_all = alldata.data;
									alldata.data=alldata.data.slice($scope.start_index,$scope.end_index);									
									alldata.years=HelperFunctions.removeDuplicatesArr(alldata.years);
									$scope.alldata = alldata;
									$scope.loading=false;
									
									
								});
			
							});
						});
					});
				});
				
			});
		});
		
	};
	
	$scope.addMore=function()	
	{
		if($scope.alldata.data.length<=$scope.alldata_all.length){
		$scope.start_index =$scope.start_index+$scope.iterator;
		$scope.end_index = $scope.end_index+$scope.iterator;
		$scope.alldata.data=$scope.alldata.data.concat($scope.alldata_all.slice($scope.start_index, $scope.end_index));
		}
		else{
			$scope.alldata.data=$scope.alldata_all;
		}
		
		
	};
	
	$scope.addMoreFiltered=function()	
	{
		
		if($scope.filteredArr.arr.length>=$scope.iterator)
		{
		$scope.index_start =$scope.index_start+$scope.iterator;
		$scope.index_end = $scope.index_start+$scope.iterator;
		
		if($scope.end_index<$scope.filteredArr.arr.length){
			$scope.end_index=$scope.index_end;
		}else{
			$scope.index_end=$scope.filteredArr.arr.length;
		}
		$scope.filteredArr.arr=$scope.filteredArr.arr.concat($scope.filteredArr.fullArr.slice($scope.index_start, ($scope.index_start+50)));
				}
		
	};

	
	$scope.filterData =function(query){
		$scope.filteredArr={arr:[], fullArr:[]};
		$scope.alldata.data=[];
		
		if(query.length==0  )
		{
			$scope.filtered=false;
			$scope.filteredArr=[];
			$scope.loading=false;
			$scope.alldata.data= $scope.alldata_all.slice(0, 50);
			
		}
		else
		{
			$scope.filtered=true;
			$scope.filteredArr=HelperFunctions.searchDataMatch($scope.alldata_all, query,['headline', 'year', 'type']);
			console.log($scope.filteredArr);

			$scope.loading=false;
		}
		
		
		
		
	};
	

	
	$scope.openFeature=function(id)
	{
		
	};
	$scope.SkipValidation = function(value) {
			return $sce.trustAsHtml(value);
	};
	$scope.runApp();
	
	
}]);
