/* Controllers */
angular.module('Alumni', [])
.controller('Timeline', ['$scope','Timeline', function($scope, Timeline)
{
	$scope.noSubnav=true;
	$scope.on_off='off';
	$scope.arr=[];
	var nameStr='';	
	var arr=[];
	
	Timeline.getTimelineData().then(function(data){
		$scope.items = data;
		//$scope.subNav = $scope.items.years;
		//console.log($scope.subNav);
		$scope.windowWidth = window.innerWidth;
		$scope.windowWidth = $scope.windowWidth*.92;
		$scope.yearsWidth = $scope.items.years.length*75;
		$scope.navWidth = $('.navigation').width();
				
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
		
		if(obj2 ==undefined)
		{
			if(obj1.state=='selected')
			{
				$scope.allchecked = 'notselected';
				
				obj1.state='notselected';
				
				///////////on unselecting a button, this removes item from $scope.arr which is usedin changeNavCheck Function
				//////////to make sure that the year navigation lights up correctly when an checkbox is deactivated//////////////
				
				var index = $scope.arr.indexOf(obj1);
				$scope.arr.splice(index, 1);
				
				for (var y=0; y<obj1.subNav.length;y++)
				{
				obj1.subNav[y].state = "notselected";
				
				}
				//////////Makes sure that if not all main nav items are selected, that no checkboxes light up
				for(var x=0; x<$scope.items.years.length; x++)
				{
					for(var y=0; y<$scope.items.years[x].subNav.length; y++)	
					{
						$scope.items.years[x].subNav[y].checked='notselected';
						$scope.items.years[x].subNav[y].on_off='off'
					}
				}
			}
			else
			{
				var holder_arr=[];
				obj1.state='selected';
				$scope.allchecked='notselected';
				for (var y=0; y<obj1.subNav.length;y++)
				{
				obj1.subNav[y].state = "selected";
				
				}
				/////////////Loops through the items to see if all years buttons are lit up; if so this makes sure that the checkbox is also filled in
				for(var x=0; x<$scope.items.years.length; x++)
				{
					if($scope.items.years[x].state=='selected')
					{
						holder_arr.push($scope.items.years[x]);
						console.log(holder_arr.length+':'+$scope.items.years.length)
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
				}
			}
		}
		else{
			
			if(obj1.state=="selected")
			{
				if(obj2.state=='selected')
				{
					obj2.state='notselected';
					obj2.checked='notselected';
					obj2.checked='notselected';
					/////////////Loops through the items to see if all icon buttons are lit up; if not this makes sure that the checkbox is not filled in
					for(var x=0; x<$scope.items.years.length; x++)
					{
							for(var y=0; y<$scope.items.years[x].subNav.length; y++)
							{
								if(obj2.name==$scope.items.years[x].subNav[y].name)
								{
									$scope.items.years[x].subNav[y].checked='notselected'
								}
							}	
					}
					
					
					
					arr.push(obj2.state);
					if(arr.length==obj1.subNav.length){
						obj1.state='notselected';
					}
					//obj2.checked=false;
					
					////////////runs the changeNavCheck function for when a subnav item is clicked off/////////////////
					//$scope.changeNavCheck(obj2.name, false, 'one');
					
				}
				else
				{
					obj2.state='selected';
					/////////////Loops through the items to see if all icon buttons are lit up; if so this makes sure that the checkbox is  filled in
					
					for(var x=0; x<$scope.items.years.length; x++)
					{
							for(var y=0; y<$scope.items.years[x].subNav.length; y++)
							{
								if(obj2.name==$scope.items.years[x].subNav[y].name)
								{
									$scope.items.years[x].subNav[y].checked='selected'
								}
							}
					}
				
				}
			}
			else{
				if(obj2.state=='notselected')
				{
					obj2.state='selected';
					obj1.state='selected';
					/////////////Loops through the items to see if all icon buttons are lit up; if so this makes sure that the checkbox is  filled in
					
					for(var x=0; x<$scope.items.years.length; x++)
					{
							for(var y=0; y<$scope.items.years[x].subNav.length; y++)
							{
								if(obj2.name==$scope.items.years[x].subNav[y].name)
								{
									$scope.items.years[x].subNav[y].checked='selected'
								}
							}
					}
				}	
			}
			
		}
		
	};
	
	$scope.changeNavCheck = function(type, allselected,on_off, howmany)
	{
		/////////////If gray top check box is activated, all boxes and check boxes are given a fill///////////////
		console.log(type);
			
		if(type == "all")
		{
			for(var x=0; x<$scope.items.years.length; x++)
			{
				if(allselected == 'notselected')
				{
					if(x==0)
					{
						$scope.allchecked='selected';
					}
					$scope.items.years[x].state = 'selected';
					for(var y=0; y<$scope.items.years[x].subNav.length; y++)
					{
						$scope.items.years[x].subNav[y].checked='selected';
						$scope.items.years[x].subNav[y].state ='selected';
						
					}
				}
				else {
						if(x==0)
						{
							$scope.allchecked='notselected';
						}
					
					$scope.items.years[x].state = 'notselected';
					for(var y=0; y<$scope.items.years[x].subNav.length; y++)
					{
						$scope.items.years[x].subNav[y].checked='notselected';
						$scope.items.years[x].subNav[y].state ='notselected';
					}
				}
				
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
			for(var a = 0; a<$scope.items.years.length; a++)
				{
					if($scope.allchecked==true)
					{
					$scope.items.years[a].state='selected';	
					}
					else{
						$scope.items.years[a].state='notselected';
					}	
				}	
				
				///////////////If checkbox is clicked, this lights up the proper row and adds items to the $scope.arr variable
				//////////////Which is used in the else conditional to light up the proper icons when all checkboxes are unclicked.
				if(on_off=='off')
				{
					for(var a = 0; a<$scope.items.years.length; a++)
					{
						//$scope.items.years[a].state='notselected';
						for(var z=0; z<$scope.items.years[a].subNav.length; z++)
						{
							
							if($scope.items.years[a].state=='selected' && $scope.items.years[a].subNav[z].state=="selected"  && !nameStr.match($scope.items.years[a].year))
							{
							 $scope.arr.push($scope.items.years[a]);	
							 nameStr+=$scope.items.years[a].year;
							}
							
							if($scope.items.years[a].subNav[z].name==type){	
								$scope.items.years[a].state="selected";
								if($scope.items.years[a].subNav[z].checked=='notselected')
								{
									//$scope.allchecked='selected';	
									
									$scope.items.years[a].subNav[z].state='selected';
									$scope.items.years[a].subNav[z].checked='selected';
									$scope.items.years[a].subNav[z].on_off='on';
									
										
								}
								else
								{
									//$scope.allchecked='notselected';	
									$scope.items.years[a].subNav[z].state='notselected';
									$scope.items.years[a].subNav[z].checked='notselected';
									$scope.items.years[a].subNav[z].on_off='on';
									
								}
								
							}
							
						}	
						
					}
					
				}
				else				
				{
				
					for(var c = 0; c<$scope.items.years.length; c++)
						{
								
								$scope.items.years[c].state='notselected';	
								/////////////Turns off all subnavigation icons for particular checkbox////////////////
								for(var d=0; d<$scope.items.years[c].subNav.length; d++)
								{
								
									if($scope.items.years[c].subNav[d].state=='selected') //&& $scope.items.years[c].subNav[d].name==type)
									{
										$scope.items.years[c].subNav[d].on_off='off';
										$scope.items.years[c].subNav[d].checked ='notselected';
										$scope.items.years[c].subNav[d].state ='notselected';
																				

									}
									if($scope.items.years[c].subNav[d].checked=="selected")
									{
										$scope.items.years[c].state='selected';	
									}

									
								}
								///////////Loops through $scope.arr and makes sure that the years that are held in $scope.arr light up/are selected
								for(var b=0; b<$scope.arr.length;b++)
								{
									
									if($scope.arr[b].year==$scope.items.years[c].year)
									{
										//console.log($scope.arr[b])
										$scope.arr[b].state='selected';
										$scope.items.years[c].state=$scope.arr[b].state;
										
									}
									
																	
								}	
						
					}
					
				}
			
		}
	};
	
	

	$scope.showDkBlue=false;
	$scope.showLtBlue=false;
	$scope.showYellow=true;
	$scope.showGreen=false;
	$scope.showBlue=false;
	
	$scope.barClick=function(id){
		console.log(id)
		if(id=='LtBlue')
		{
			if($scope.showLtBlue==false)
			{
				$scope.showLtBlue=true
			}
			else{
				$scope.showLtBlue=false
			}
		}
		else if(id=='DkBlue')
		{
			if($scope.showDkBlue==false)
			{
				$scope.showDkBlue=true
			}
			else{
				$scope.showDkBlue=false
			}
		}
		else if(id=='Blue')
		{
			if($scope.showBlue==false)
			{
				$scope.showBlue=true
			}
			else{
				$scope.showBlue=false
			}
		}
		else if(id=='Green')
		{
			if($scope.showGreen==false)
			{
				$scope.showGreen=true
			}
			else{
				$scope.showGreen=false
			}
		}
		else if(id=='Yellow')
		{
			
			if($scope.showYellow==false)
			{
				
				$scope.showYellow=true;
				console.log($scope.showYellow)
			}
			else{
				$scope.showYellow=false
			}
		}
	};
	
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
	$('#' + id).animate({
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
