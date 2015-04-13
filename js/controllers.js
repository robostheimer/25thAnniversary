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
		//$scope.subNav = $scope.items.years;
		//console.log($scope.subNav);
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
				/*forEach(obj1.subNav, function(subNav){
					forEachIn(subNav, function(name,value){
					console.log(name+':'+value);
				
					});
				});*/
				forEach(obj1.subNav, function(subNav){
					subNav.state='notselected';
					//subNav.checked='notselected';
					//subNav.on_off='off';
				});
				/*for (var y=0; y<obj1.subNav.length;y++)
				{
				obj1.subNav[y].state = "notselected";
				
				}*/
				//////////Makes sure that if not all main nav items are selected, that no checkboxes light up
				forEach($scope.items.years, function(year){
					forEach(year.subNav, function(item){

						item.checked='notselected';
						item.on_off='off';

					});
					//console.log(years)
				});
				//console.log($scope.items.years);
				/*for(var x=0; x<$scope.items.years.length; x++)
				{
					for(var y=0; y<$scope.items.years[x].subNav.length; y++)	
					{
						
						$scope.items.years[x].subNav[y].checked='notselected';
						$scope.items.years[x].subNav[y].on_off='off';
						console.log($scope.items.years[x].subNav[y].checked);
					}
				}*/
			}/////////////Button Not Active
			else
			{
				
				var holder_arr=[];
				obj1.state='selected';
				$scope.allchecked='notselected';
				
				forEach(obj1.subNav, function(subNav){
					subNav.state='selected';
					//subNav.checked='selected';
				});
				/*for (var y=0; y<obj1.subNav.length;y++)
				{
				obj1.subNav[y].state = "selected";
				
				}*/
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
				
				
				/*for(var x=0; x<$scope.items.years.length; x++)
				{
					if($scope.items.years[x].state=='selected')
					{
						holder_arr.push($scope.items.years[x]);
						if(holder_arr.length==$scope.items.years.length)
						{
							for(var y=0; y<$scope.items.years[x].subNav.length; y++)
							{
								if($scope.items.years[x].subNav[y].state=='selected')
								{
									$scope.changeNavCheck($scope.items.years[x].subNav[y].name, $scope.items.years[x].subNav[y].checked, 'off');
								}
							}
						}
					}
				}*/
			}
		}
		//////////////controls SubNav Toggle///////////
		else{
			$scope.allchecked='notselected';
			
			/*if(obj1.state=="selected")
			{*/
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
					
					/*for(var a = 0; a<$scope.items.years.length; a++)
					{
						$scope.items.years[a].state="notselected";
						for(var z=0; z<$scope.items.years[a].subNav.length; z++)
						{
							if($scope.items.years[a].state=='selected' && $scope.items.years[a].subNav[z].state=="selected"  && !nameStr.match($scope.items.years[a].year))
							{
							 $scope.arr.push($scope.items.years[a]);	
							 nameStr+=$scope.items.years[a].year;
							}
								if(obj2.name==$scope.items.years[a].subNav[z].name)
								{
									$scope.items.years[a].subNav[z].checked='notselected';
									$scope.items.years[a].subNav[z].on_off='off';
									
								}
								if($scope.items.years[a].subNav[z].state=="selected")
								{
									$scope.items.years[a].state='selected';
								}
								
						}	
						
					}*/
					
					
					/*arr.push(obj2.state);
					if(arr.length==obj1.subNav.length){
						obj1.state='notselected';
					}*/
					//obj2.checked=false;
					
					////////////runs the changeNavCheck function for when a subnav item is clicked off/////////////////
					//$scope.changeNavCheck(obj2.name, false, 'one');
					
				/*}
				else
				{
					obj2.state='selected';
					var holder_arr=[];
					/////////////Loops through the items to see if all icon buttons are lit up; if so this makes sure that the checkbox is  filled in
					forEach($scope.items.years, function(year){
						forEach(year.subNav, function(item){
							if(obj2.name=item.name && item.state=='selected' )
								{
									holder_arr.push(item);
									if(holder_arr.length==$scope.items.years.length){
									$scope.changeNavCheck(item.name, item.checked, 'off');
									}
								}	
							
						});
					});
					/*for(var x=0; x<$scope.items.years.length; x++)
					{
							
							for(var y=0; y<$scope.items.years[x].subNav.length; y++)
							{
								
								if(obj2.name==$scope.items.years[x].subNav[y].name &&$scope.items.years[x].subNav[y].state=='selected' )
								{
									holder_arr.push($scope.items.years[x].subNav[y]);
									if(holder_arr.length==$scope.items.years.length){
									$scope.changeNavCheck($scope.items.years[x].subNav[y].name, $scope.items.years[x].subNav[y].checked, 'off');
									}
									
									
								}
							}
							
							
					}
					
							
					console.log(holder_arr.length);
				}*/
			}
			else if(obj2.state=='notselected'){
					var holder_arr=[];
					
					obj2.state='selected';
					obj1.state='selected';
					//console.log(obj2)
					/////////////Loops through the items to see if all icon buttons are lit up; if so this makes sure that the checkbox is  filled in
					forEach($scope.items.years, function(year){
						forEach(year.subNav, function(item){
						//console.log(item);	
						
						if(obj2.name==item.name && item.state=='selected')
								{	
									holder_arr.push(item);
									//console.log(holder_arr);
								}	
								if(holder_arr.length==$scope.items.years.length){
										
									$scope.changeNavCheck(item.name, item.checked, 'off');
								}
						});
					});
					
					/*for(var x=0; x<$scope.items.years.length; x++)
					{
							
							for(var y=0; y<$scope.items.years[x].subNav.length; y++)
							{
								
								if(obj2.name==$scope.items.years[x].subNav[y].name &&$scope.items.years[x].subNav[y].state=='selected' )
								{
									holder_arr.push($scope.items.years[x].subNav[y]);
									if(holder_arr.length==$scope.items.years.length){
										
									$scope.changeNavCheck($scope.items.years[x].subNav[y].name, $scope.items.years[x].subNav[y].checked, 'off');
									}
									
									
								}
							}
							
							
					}*/
					console.log($scope.items.years);
			}
			
		}
		
	};
	
	$scope.changeNavCheck = function(type, allselected,on_off, howmany)
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
		/////////////If a subnav is deactivated, this deactivates the checkbox from whence it is a child///////////////
		/*else if(howmany=='one')
		{
			console.log(howmany)
			for(var a = 0; a<$scope.items.years.length; a++)
			{
				for(var z=0; z<$scope.items.years[0].subNav.length; z++)
				{
					if($scope.items.years[a].subNav[z].name==type){
				
					$scope.items.years[a].subNav[z].checked='notselected';
					
					}
				}
			}
			
		}*/
		/////////////////If a single checkbox is pushed, this activates or deactivates that box based on the checked property of the 
		////////////////subNav properties of the years array	
		else
		{
			/*for(var a = 0; a<$scope.items.years.length; a++)
				{
					if($scope.allchecked==true)
					{
					$scope.items.years[a].state='selected';	
					}
					else{
						$scope.items.years[a].state='notselected';
					}	
				}	
				*/
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
					
					forEach($scope.items.years, function(year){
								
								year.state='notselected';	
								/////////////Turns off all subnavigation icons for particular checkbox////////////////
								forEach(year.subNav, function(item){
									item.on_off='off';
									if(item.state=='selected' && item.name==type)
									{
										
										item.checked ='notselected';
										item.on_off='off'
										item.state ='notselected';
																				

									}
									else if(item='selected' && item.name!=type)
									{
										
										item.on_off='off';
										//item.checked ='selected';
										item.state ='selected';
										if(item.state=="selected")
										{
											year.state='selected';	
											
										}

									}
									
									
								});
								///////////Loops through $scope.arr and makes sure that the years that are held in $scope.arr light up/are selected
							
								/*for(var b=0; b<$scope.arr.length;b++)
								{
									
									if($scope.arr[b].year==$scope.items.years[c].year)
									{
										//console.log($scope.arr[b])
										$scope.arr[b].state='selected';
										//$scope.items.years[c].state=$scope.arr[b].state;
										
									}
									
																	
								}*/	
						
					});
					
				}
			
		}
	};
	
	
	
	
	
}]);
angular.module('Story', [])
.controller('storyController', ['$scope','Timeline', function($scope, Timeline)
{
	

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
	console.log(checkmatch);
	var unique={title:[], finalArr:[]};
	var tmpArr=[];
	forEach(array, function(item){
		tmpArr.push(item[property]);
	});
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
