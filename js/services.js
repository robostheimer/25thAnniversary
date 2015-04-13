//'use strict';

/* Services */
/////////////////////////////////HomePage/////////////////////////////////////////////


TAS_Anniversary.factory('AlumniSpot', ['$http', '$routeParams', '$location', '$rootScope', '$sce',
function($http, $routeParams, $location, $rootScope, $sce) {

	return {

		getSpotData : function(region) {
			var spot = [];
			return $http.jsonp('https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+FirstName,LastName,ShortBody,LongBody,image,caption,PublishDate,Region+FROM+1z6kUehyfSNqaAGinvARZLYyjb7Dhk2F9rt49xHIV+ORDER%20BY+PublishDate+%22&key=AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0&callback=JSON_CALLBACK').then(function(result) {
				if (result.data.rows != null) {
					var d = new Date();
					td = d.valueOf();
					result.data.rows.reverse();
					for (var i = 0; i < 30; i++) {
						var pd = new Date(result.data.rows[i][6]);
						var tpd = pd.valueOf();

						if (result.data.rows[i][6] != '#' && td >= tpd && spot.length<=9) {
							spot.push({
								id : i,
								firstname : result.data.rows[i][0],
								lastname : result.data.rows[i][1],
								shortbody : result.data.rows[i][2],
								longbody : result.data.rows[i][3],
								image : result.data.rows[i][4].split('?')[0],
								caption : result.data.rows[i][5],
								date : result.data.rows[i][6],
								region : result.data.rows[i][7],
								more_url : result.data.rows[i][5].replace(/ /g, '_'),
								hash : '/indiv_spotlight/' + result.data.rows[i][0].replace(/ /g, '_') + '_' + result.data.rows[i][1].replace(/ /g, '_'),
								dataloaded : true,
								hider : true
							});

						}

					}

				}
				return spot;
			});

		},
	};
}]);

TAS_Anniversary.factory('PhotosofWeek', ['$http', '$routeParams', '$location', '$rootScope', '$sce',
function($http, $routeParams, $location, $rootScope, $sce) {

	return {
		getPOW : function() {
			var pow = [];
			return $http.jsonp('https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+PhotoURL,PhotoCaption,PhotoDescription,ShortDescription,BlogURL,PhotoCredit,BlogTitle,PublishDate, Keywords+FROM+19WBCSYuVJh1O2KaThKQJpLLn0VF6w3rHhbKtZMVf+ORDER%20BY+PublishDate+%22&key=AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0&callback=JSON_CALLBACK').then(function(result) {
				if (result.data.rows != null) {
					var d = new Date();
					var td = d.valueOf();
					result.data.rows.reverse();
					for (var i = 0; i < 30; i++) {
						var pd = new Date(result.data.rows[i][7]);
						var tpd = pd.valueOf();
						
					
						//var nshd=tpd+604800000;
						if (result.data.rows[i][7] != '#' && (td>=tpd)&&pow.length<9) {
							pow.push({
								id : i,
								image : result.data.rows[i][0],
								caption : result.data.rows[i][1],
								description : result.data.rows[i][2].replace(/<p>/g, '').replace(/<\/p>/g, ''),
								shortdescription : result.data.rows[i][3].replace(/<p>/g, '').replace(/<\/p>/g, ''),
								parent : result.data.rows[i][4],
								credit : result.data.rows[i][5],
								post_title : Slicer(result.data.rows[i][6], 40) + '...',
								date : result.data.rows[i][7],
								keywords : result.data.rows[i][8],
								titleSnippet : Slicer(result.data.rows[i][1], 70) + '...',
								dataloaded : true
							});
						}

					}

				}
				return pow;
			});
		},
	};
}]);
TAS_Anniversary.factory('Timeline', ['$http', '$routeParams', '$location', '$rootScope', '$sce',
function($http, $routeParams, $location, $rootScope, $sce) {
	return{
		getTimelineData:function()
		{
		return $http.get('https://spreadsheets.google.com/feeds/list/17kGcCx_HQPgUd4_QWFOlc1-HTaF2_rJJZ_CVoUjwCdU/1/public/values?alt=json').then(function(data){
				var items= (data.data.feed.entry);
				/*var td = new Date();
				var bd = {};
				bd.utcDate =new Date(data.data.feed.entry[0].date.$t);
				bd.year = bd.utcDate.getFullYear();
				bd.years = td.getFullYear() -bd.year;
				var number = 0;
				var month=0;
				var year = bd.year;
				
				var months = 12*bd.years;*/
				
				items.years=[];
				var tmpTxt=''
				
				for(var y=0; y<items.length; y++)
				{
					if(!tmpTxt.match(items[y].gsx$year.$t))
					{
						items.years.push(
							{'year':items[y].gsx$year.$t, 'state': 'notselected', color:items[y].gsx$color.$t, classy:'hider',noSubnav:true,
								subNav :[
								{name:"alumni", state:'notselected', checked:'notselected', color:'dkblue', 'year':items[y].gsx$year.$t, on_off:'off','classy':'icon-newspaper dkblue' }, 
								{name:"images",state:'notselected', checked:'notselected', color:'yellow', 'year':items[y].gsx$year.$t, on_off:'off','classy':'icon-images yellow' },
								{name:'dates', state:'notselected', checked:'notselected', color:'foam', 'year':items[y].gsx$year.$t, on_off:'off', 'classy':'icon-calendar foam' }, 
								{name:'profile', state:'notselected', checked:'notselected', color:'blue', 'year':items[y].gsx$year.$t, on_off:'off', 'classy':'icon-news blue' },
								{name:"quotes", state:'notselected', checked:'notselected', color:'green', 'year':items[y].gsx$year.$t, on_off:'off', 'classy':'icon-bubble green' },  
								{name:"map", state:'notselected', checked:'notselected', color:'dkstblue', 'year':items[y].gsx$year.$t, on_off:'off', 'classy':'icon-map dkstblue' }, 
								{name:"stats", state:'notselected', checked:'notselected', color:'ltgreen', 'year':items[y].gsx$year.$t, on_off:'off', 'classy':'icon-stats ltgreen' }, 
								]
						});
					}
					tmpTxt+=items[y].gsx$year.$t+',';
				}
				
				/*for(var y=0; y<months; y++)
				{
					if(month<=11)
					{
					month++;
					items.push({text_x:parseInt(number*15),text_y:parseInt(number*15), rect_x:parseInt(number*(window.innerWidth*.95/months)), width: (window.innerWidth/months)*6,rect_y:parseInt(number*25), month: (month), year:year, color:'', data:{}});
					number++;
					}
					else{
						month=0;
						month++;
						year++;
						items.push({text_x:parseInt(number*15),text_y:parseInt(number*15), rect_x:parseInt(number*(window.innerWidth*.95/months)), width: (window.innerWidth/months)*6,rect_y:parseInt(number*25), month: (month), year:year, color:'', data:{}});
						number++;
						
					}
						if(items[y].year>=1990 && items[y].year<=1996)
						{
							items[y].color="#0057a5";
							
						}
						else if(items[y].year>=1997 && items[y].year<=2003)
						{
							items[y].color='#0492CE'
						}
						else if(items[y].year>=2004 && items[y].year<2009)
						{
							items[y].color='#198E81'
						}
						else{
							items[y].color='#EBBD1E'
						}
						
					
					
				}
				for(var z=0; z<items.length; z++)
				{
					var arr=[];
					for(var x=0; x<data.data.feed.entry.length; x++)
					{
						
						if(parseInt(data.data.feed.entry[x].date.$t.split('/')[0])==items[z].month)
						{
							
							if(parseInt(items[z].year)==parseInt(data.data.feed.entry[x].date.$t.split('/')[2]))
							{
							
							arr.push(data.data.feed.entry[x]);
							items[z].data = arr;
							}
						}
					}
					if(z%6==0)
						{
							console.log(arr)
							items[z].data=arr;
							items.rect.push(items[z]);
							
						}
				}*/
				//console.log(items);
				return items;
		});	
		
		}
	};
}]);	
