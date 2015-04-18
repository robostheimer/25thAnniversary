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
				forEach(obj1.subNav, function(subNav){
					subNav.state='notselected';
				});
				
				//////////Makes sure that if not all main nav items are selected, that no checkboxes light up
				forEach($scope.items.years, function(year){
					forEach(year.subNav, function(item){

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
				
				forEach(obj1.subNav, function(subNav){
					subNav.state='selected';
				});
				
				/////////////Loops through the items to see if all years buttons are lit up; if so this makes sure that the checkbox is also filled in
				forEach($scope.items.years, function(year){
					if(year.state=='selected'){
						holder_arr.push(year);
						
						if(holder_arr.length==$scope.items.years.length)
						{
							forEach(year.subNav, function(item){
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
				
					forEach($scope.items.years, function(year){							
						year.state="notselected";
						forEach(year.subNav, function(item){
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
					forEach($scope.items.years, function(year){
						forEach(year.subNav, function(item){
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
					forEach($scope.items.years, function(year){
						year.state = 'selected';
						forEach(year.subNav, function(item){
							item.checked='selected';
							item.state ='selected';
							});
						});
				}
				else {
						
					$scope.allchecked='notselected';
					forEach($scope.items.years, function(year){
						year.state = 'notselected';
						forEach(year.subNav, function(item){
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
					forEach($scope.items.years, function(year){
						forEach(year.subNav, function(item){							
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
					forEach($scope.items.years, function(year){
								
								year.state='notselected';	
								/////////////Turns off all subnavigation icons for particular checkbox////////////////
								forEach(year.subNav, function(item){
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
.controller('storyController', ['AlumniSpot','PhotosofWeek','Teacher','News','Lessons', 'Quotes','$scope',
function(AlumniSpot, PhotosofWeek, Teacher, News, Lessons, Quotes, $scope)
{
	
	var alldata={};
	alldata.data=[];
	alldata.years=[];
	$scope.iterator=50;
	$scope.start_index=-50;
	$scope.end_index = 0
	$scope.runApp=function()
	{
		
		
		
		Teacher.createTeacherList().then(function(data){
		var teachers = data.data.reverse();
			alldata.years = data.years
			alldata.data=alldata.data.concat(teachers);
			
			PhotosofWeek.getPOW().then(function(data){
			var pow = data;
				PhotosofWeek.getNonPOW().then(function(data){
					var nonpow=data;
					pow = pow.concat(nonpow); 
					alldata.data=alldata.data.concat(pow);
					AlumniSpot.getSpotData().then(function(data){
						var spot = data;
							News.getNewsData().then(function(data){
							spot =spot.concat(data);
							alldata.data=alldata.data.concat(spot);
						Lessons.getLessonData().then(function(data){
								var lessons = data;
								alldata.data=alldata.data.concat(lessons);
									Quotes.getQuotesData().then(function(data){
									var quotes = data;
									alldata.data=alldata.data.concat($scope.quotes);
									alldata.data = SortObjDsc('randomnumber', alldata.data);
									$scope.alldata_all = alldata.data;
									alldata.data=alldata.data.slice($scope.start_index,$scope.end_index);									
									alldata.years=removeDuplicatesArr(alldata.years);
									$scope.alldata = alldata;
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
		$scope.start_index =$scope.start_index+$scope.iterator;
		$scope.end_index = $scope.end_index+$scope.iterator;
		$scope.alldata.data=$scope.alldata.data.concat($scope.alldata_all.slice($scope.start_index, $scope.end_index));
		
		
	};
	
	$scope.runApp();
	
	
}]);


////////////Helper Functions///////////////////
function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function Slicer(str, number)
{
	var slicer = str.slice(0, number);
	var slicer2 = str.slice(number, str.length);
	var slicer2Index = slicer2.indexOf(' ');
	slicer2 = str.slice(0, (number+slicer2Index));
	//alert(slicer2);
	return slicer2;
}

function removeHTML(str)
{
	
	
         var str =  jQuery('<div />', { html: str }).text();
        str = 		jQuery('<p />', { html: str }).text();
        str = jQuery('<i />', { html: str }).text();
		return str;
}

function DigPatt(str, char)
{
	  var checkDigit = (str.lastIndexOf(char)+1);
	  var digPatt = str.slice(checkDigit, str.length);
			           //console.log(digPatt);
			           if(digPatt.match(/\d/g))
			           {
			           	name = str.split('-')[0];
			           }
			           else
			           {
			           	name=str;
			           }
			           return name;
}

function goToByScrollTop(id) {
	// Remove "link" from the ID
	id = id.replace("link", "");
	// Scroll
	$(id).animate({
		scrollTop : 50
	}, 'slow');

}

function createTitleFromURL(str)
{
	var monthArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	
	var str = str.replace('https://teacheratsea.wordpress.com','');
	str = str.replace('http://teacheratsea.wordpress.com','');
	str = str.split('/')[4];
	str = toTitleCase(str.replace(/-/g, ' '));
	
	
	var strSplitter = str.split(' ');
	var substr = strSplitter[1];
	var str = str.replace(substr, substr+',');
	
	str = str.replace(' 20', ', 20');
	
	for(var z=0; z<monthArr.length; z++)
	{
		if(str.replace(/\W/g,'').match(monthArr[z].replace(/\W/g,'')))
		{
			str = str.replace(monthArr[z], ', '+monthArr[z]).replace(' , ', ', ');
			
			return str;

		}
		else
		{
			return str;
		}
	}	
	
}

////////////////Checks for a specific property in an array of objects and makes sure that the value of that property is not duplicated	
function removeDuplicatesArr(array){
	var unique = [];
    for ( i = 0; i < array.length; i++ ) {
        var current = array[i];
        if (unique.indexOf(current) < 0)
        {
        	 unique.push(current);
        }
    }

    return unique;
}
////////////////Checks for a specific property in an array of objects and makes sure that the value of that property is not duplicated	
function removeDuplicatesArrObj(array, property, checkmatch){
	var unique={title:[], finalArr:[]};
	if(checkmatch==true)
	{
		
	forEach(array, function(item){
		
		if (!unique.title.toString().replace(/\W/g, '').match(item[property].replace(/\W/g,'')))
        {
        	 unique.title.push(item[property]);
        	 unique.finalArr.push(item);
        }
	});
	}
	else{
		forEach(array, function(item){
		
		if (unique.title.indexOf(item[property]) < 0)
        {
        	 unique.title.push(item[property]);
        	 unique.finalArr.push(item);
        }
	});
		
	}
	return unique.finalArr;
}
 
 function preventDuplicates(comparer, array, property, type)
 {
 	var tmpArr=[];
 	///////////Adds to  the Beginning
	if(type = 'splice'){
	 	forEach(comparer, function(compare)
		{
			tmpArr =removeDuplicatesArrObj(comparer, property, true);
			array.splice(0, 0, compare)	
		});
	}
	//////////Adds to end///////////
	else{
		forEach(comparer, function(compare)
			{
				tmpArr =removeDuplicatesArrObj(comparer, property, true);
				array.push(compare)	
			});
	}	
 	array = removeDuplicatesArrObj(array, property, true)
 		
 	return array;
	
 };
 
 function compareArraysObj(array1, array2, property)
 {
 	forEach(array1, function(item){
 		var x=array1.indexOf(item);
 		forEach(array2, function(item2){

 			if(item[property]==item2[property])
 			{
 				array1.splice(x, 1);
 			}
 		});
 	});
	return array1;
 }


/////////For LoopArray of Strings and Numbers (not objects)///////////////
function forEach(array, action) 
{ 
	
	for (var i = 0; i < array.length; i++)
	{
	 action(array[i]); 
	}
}

///////For Loop for  Array of Objects/////////////
function forEachIn( object, action) { 
	for (var property in object) 
	{ 
		if (Object.prototype.hasOwnProperty.call( object, property))
			 action( property, object[ property]); 
	 }
 }
 
 function SortObjAsc(property, obj)
 {
 
 	var sortable =[];
 	obj.sort(
 		function(a, b){
 				 var aprop=a[property]
				 var bprop =b[property]
				 return bprop-aprop
				});
 	
 	return obj.reverse();
 }


 function SortObjDsc(property, obj)
 {
 
 	var sortable =[];
 	obj.sort(
 		function(a, b){
 				 var aprop=a[property]
				 var bprop =a[property]
				 return aprop-bprop
				});
 	
 	return obj;
 }
