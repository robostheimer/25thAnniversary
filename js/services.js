//'use strict';

/* Services */
/////////////////////////////////HomePage/////////////////////////////////////////////
TAS_Site.factory('Teacher', ['$http', '$routeParams', '$location', '$rootScope', '$sce',
function($http, $routeParams, $location, $rootScope, $sce) {
	return{
		////uses TAS(Multiple Years) Fusion Table api to bring teachers info in
		createTeacherList :function(item){
			var teachers = {data:[], years:[]};
			var year = $location.path().split('/')[1].split('/')[0];
			return $http.jsonp('https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+TeacherLastName%2CTeacherFirstName%2CShipType%2C+Ship%2C+ShipUrl%2C+CruiseURL%2C+Mission%2C+CruiseDates%2C+SubjectsTaught%2C+School%2C+City%2C+State%2C+Image%2C+Grades%2C+SchoolURL%2C+WordPressURL%2C+Year+FROM+1Xh5kWI_ZHd-PZRuPcgrV_oS13HHN6JGtRK4s75Mn+ORDER%20BY+TeacherLastName%22&key=AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0&callback=JSON_CALLBACK').then(function(result) {
				if (result.data.rows != undefined) {
					result.data.rows.forEach(function(item){
						
						
						
        			var o = result.data.rows.indexOf(item);	
        				teachers.data.push({
							lastname : item[0],
							lastname_forDOM : item[0].replace(' ', '').diggPatt('-'),
							firstname : item[1],
							name : item[1]+' '+item[0].replace(' ', '').diggPatt('-'),
							headline: item[1]+' '+item[0].replace(' ', '').diggPatt('-')+', ' +item[16]+' Teacher at Sea',
							headline_url:  item[1].replace(/ /g, '_')+'*'+item[0].replace(/ /g, '_'),
							shiptype : item[2],
							ship : item[3],
							shipurl : item[4],
							cruiseurl : item[5],
							mission : item[6],
							dates : item[7],
							subjects : item[8],
							school : item[9],
							city : item[10],
							state : item[11],
							src : item[12].split('?')[0],
							grades : item[13],
							schoolurl : item[14],
							wordpressurl : item[15],
							year : item[16],
							subjects1 : item[8].split('&&')[0],
							subjects2 : item[8].split('&&')[1],
							school1 : item[9].split('&&')[0],
							school2 : item[9].split('&&')[1],
							schoolurl1 : item[14].split('&&')[0],
							schoolurl2 : item[14].split('&&')[1],
							tabIndex : 150 + o,
							checkContents : true,
							classy: 'icon-profile',
							template:'profile',
							color: 'dkblue',
							colorCode: '0, 87, 165',
							type :'profile',
							id:'teacher_'+o,
							randomnumber: Math.floor(Math.random()*51),
							description:item[1]+' '+item[0]+'  of '+ item[10]+', ' +item[11]+ ' teaches '+item[8]+' at ' + item[9]+ 'and  will be aboard' + item[2]+' '+item[3]+ ' '+item[5]+ 'while scientist conduct a'+item[6] +' survey',
							favorite:'off',
							href:'/25thAnniversary/$/profile/'+item[16]+'/teacher_'+o
							});
					});
				return teachers;	
				}
				else{
					var year = $location.path().split('/')[1].split('/')[0]
					return $http.get('/JSONBackups/TeacherFusionTable.json').then(function(result) {
					forEach (result.data.rows,function(item){
        			var o = result.data.rows.indexOf(item);	
        			if (item[16] == year) {
							teachers.push({
								lastname : item[0],
								lastname_forDOM : item[0].replace(' ', '').diggPatt('-'),
								firstname : item[1],
								name : item[1]+' '+item[0].replace(' ', '').diggPatt('-'),
								headline: item[1]+' '+item[0].replace(' ', '').diggPatt('-')+', ' +item[16]+' Teacher at Sea',
								shiptype : item[2],
								ship : item[3],
								shipurl : item[0][4],
								cruiseurl : item[5],
								mission : item[6],
								dates : item[7],
								subjects : item[8],
								school : item[9],
								city : item[10],
								state : item[11],
								src : item[12].split('?')[0],
								grades : item[13],
								schoolurl : item[14],
								wordpressurl : item[15],
								year : item[16],
								subjects1 : item[8].split('&&')[0],
								subjects2 : item[8].split('&&')[1],
								school1 : item[9].split('&&')[0],
								school2 : item[9].split('&&')[1],
								schoolurl1 : item[14].split('&&')[0],
								schoolurl2 : item[14].split('&&')[1],
								tabIndex : 150 + o,
								checkContents : true,
								classy: 'icon-profile',
								template:'profile',
								color: 'dkblue',
								colorCode: '0, 87, 165',
								type :'profile',
								id:'teacher_'+o,
								randomnumber: Math.floor(Math.random()*51),
								favorite:'off',
								href:'/25thAnniversary/$/profile/'+item[16]+'/teacher_'+o
							
							});
							
						}
					});
					return teachers;
				});
				}
			}, function(error) {
				var teachers = [];
				var year = $location.path().split('/')[1].split('/')[0]
				return $http.get('/JSONBackups/TeacherFusionTable.json').then(function(result) {
					result.data.rows.forEach (function(item){
        			var o = result.data.rows.indexOf(item);	if (item[16] == year) {
							teachers.push({
								lastname : item[0],
								lastname_forDOM : item[0].replace(' ', '').diggPatt('-'),
								firstname : item[1],
								name : item[1]+' '+item[0].replace(' ', '').diggPatt('-'),
								headline: item[1]+' '+item[0].replace(' ', '').diggPatt('-')+', ' +item[16]+' Teacher at Sea', 
								shiptype : item[2],
								ship : item[3],
								shipurl : item[0][4],
								cruiseurl : item[5],
								mission : item[6],
								dates : item[7],
								subjects : item[8],
								school : item[9],
								city : item[10],
								state : item[11],
								src : item[12].split('?')[0],
								grades : item[13],
								schoolurl : item[14],
								wordpressurl : item[15],
								year : item[16],
								subjects1 : item[8].split('&&')[0],
								subjects2 : item[8].split('&&')[1],
								school1 : item[9].split('&&')[0],
								school2 : item[9].split('&&')[1],
								schoolurl1 : item[14].split('&&')[0],
								schoolurl2 : item[14].split('&&')[1],
								tabIndex : 150 + o,
								checkContents : true,
								template:'profile',
								color: 'dkblue',
								colorCode: '0, 87, 165',
								type :'profile',
								id:'teacher_'+o,
								randomnumber: Math.floor(Math.random()*51),
								description:item[6] +':'+item[11] +':'+item[3]+':'+item[13]+':'+item[8]+':'+item[9]+':'+item.year+':'+item.city+':'+item.state,
								favorite:'off',
								href:'/25thAnniversary/$/profile/'+item[16]+'/teacher_'+o
							});
							teachers.count=result.data.rows.length;
						}
					});
					return teachers;
				});
			});
		},
		wpProfile: function(year, name)
			{
				/////Brings in WordPress data for indiv teachers for their feature page
				return $http.get('/php/xml_json.php?q=' + year + '&n='+name).then(function(result) {
				///sorts the blogposts by descending date///
				result.data.items.sort(function(a, b){
					 var adate=new Date(a.date[0]).getTime();
					 var bdate =new Date(b.date[0]).getTime();
					 return bdate-adate
				});
				///sorts images by descending dates////
				if(year>2009)
				{
				result.data.gallery_images.sort(function(a,b){
					 var adate=new Date(a.date[0]).getTime();
					 var bdate =new Date(b.date[0]).getTime();
					 return bdate-adate
				});
				}
				WPdata = result.data;
				WPdata.dataLoaded = false;
				WPdata.Images = [];
				WPdata.Videos = [];
				WPdata.checkVideos = false;
				WPdata.checkBlogs = false;
				WPdata.checkPhotos = false;
				WPdata.YT = [];
				WPdata.WPVid = [];
				WPdata.VMVid = [];
				//WPdata.bigImage=false;
				var ImagesCap = {};
				ImagesCap.src = '';
				ImagesCap.caption = '';
				var ImagesArr = [];
				var VideosArr = [];
				var images_url = '';
				if (WPdata.items.length == 0) {
					WPdata.checkForItems = false;
				} else {
					WPdata.checkForItems = true;
				}
			
				for (var k = 0; k < WPdata.gallery_images.length; k++) {
					WPdata.gallery_images[k].matcher=WPdata.gallery_images[k].src[0].split('/')[5];
					
					if(!WPdata.gallery_images[k].post_url[0].match(/\?attachment/g))
					{
						var hyph_index = WPdata.gallery_images[k].post_url[0].lastIndexOf('-');
						if ((WPdata.gallery_images[k].post_url[0].length - hyph_index) < 4) {
							var posturl = WPdata.gallery_images[k].post_url[0].slice(0, hyph_index);
						} else {
							var posturl = WPdata.gallery_images[k].post_url[0];
						}
						
						if (WPdata.gallery_images.length > 0 && WPdata.gallery_images[k].src[0] != undefined && WPdata.gallery_images[k].src[0] != "") {
							WPdata.gallery_images[k].src[0] = WPdata.gallery_images[k].src[0].split('width')[0];
							
							if ((WPdata.gallery_images[k].src[0].match('.mov') || WPdata.gallery_images[k].src[0].match('.m4v') || WPdata.gallery_images[k].src[0].match('.ogg') || WPdata.gallery_images[k].src[0].match('.wmv') || WPdata.gallery_images[k].src[0].match('.m4a') || WPdata.gallery_images[k].src[0].match('.mp4') || WPdata.gallery_images[k].src[0].match('.avi') || WPdata.gallery_images[k].src[0].match('.doc') || WPdata.gallery_images[k].src[0].match('.docx') || WPdata.gallery_images[k].src[0].match('.pdf') || WPdata.gallery_images[k].src[0].match('.xlsx') || WPdata.gallery_images[k].src[0].match('.xls') || WPdata.gallery_images[k].src[0].match('.ppt') || WPdata.gallery_images[k].src[0].match('.pptx'))) {
								//var video_src = $sce.trustAsResourceUrl(WPdata.gallery_images[k].src[0]);
								var img_video = $sce.trustAsResourceUrl(WPdata.gallery_images[k].src[0].replace('.mp4', '_hd.original.jpg'));
								//VideosArr.push(video_src);
								//VideosArr.push(jQuery.parseJSON('{"vid":"'+video_src+'","img":"'+img_video+'"}'));
							} else if (!WPdata.gallery_images[k].src[0].match('.mov') || !WPdata.gallery_images[k].src[0].match('.mp4') || (WPdata.gallery_images[k].caption == "" && WPdata.gallery_images[k].excerpt == "")) {
								if(!images_url.match(posturl.replace(/\W/g,'')))
								{
									var gallery_src = WPdata.gallery_images[k].src[0];
	
									if (WPdata.gallery_images[k].caption != "" && !WPdata.gallery_images[k].caption.match('a:1')) {
										var gallery_caption = WPdata.gallery_images[k].caption;
									} else if (WPdata.gallery_images[k].excerpt != "") {
										var gallery_caption = WPdata.gallery_images[k].excerpt;
	
									} else {
										gallery_caption = 'Photo by ' + name;
									}
									gallery_caption = gallery_caption.replace(/"/g, '&quos;');
									gallery_caption = gallery_caption.replace(/'/g, '&#39;;');
									gallery_caption = gallery_caption.replace(/\n/g, '');
									gallery_caption = gallery_caption.replace(/\t/g, '');
									
									var post_url = WPdata.gallery_images[k].post_url[0];
									var post_title='View Post';
									ImagesArr.push(jQuery.parseJSON('{"src":"' + gallery_src + '","id":"' + ImagesArr.length + '","tabIndex":"' + ImagesArr.length + 250 + '","caption":"' + gallery_caption.replace(/&#39;;/g, '\'').replace(/&quos;/g, '\'') + '", "favorite":"off","parent":"' + WPdata.gallery_images[k].parent[0] + '","post_url":"' + post_url + '","matcher":"'+WPdata.gallery_images[k].matcher+'", "post_title":"' + post_title + '"}'));
									images_url += posturl.replace(/\W/g, '') + ',';
								}
	
							}
	
						}
					}	
				}

				for (var x = 0; x < (WPdata.items.length); x++) {

					WPdata.items[x].id = x;
					WPdata.items[x].favorite = 'off'
					var html = WPdata.items[x].MainContent.removeHTML();
					var index1 = html.indexOf('[caption');
					var index2 = html.indexOf('[/caption]') + 10;
					html = html.slice(0, index1) + ' ' + html.slice(index2, html.length);
					WPdata.items[x].contentSnipp =html.Slicer(380);
					var tmpstr = '';
					var imagesObj = {};
					WPdata.items[x].imagesArr = [];
					WPdata.items[x].CategoriesArr = [];
					imagesObj.src = '';
					imagesObj.caption = '';
					if (WPdata.items[x].YouTubeVideos.split(',') != "") {
						WPdata.YT.push($sce.trustAsResourceUrl('http://www.youtube.com/embed/' + WPdata.items[x].YouTubeVideos.split(',')[0] + '??&rel=0&showinfo=0&autohide=1'));
					}
					if (WPdata.items[x].WPVideos.split(',') != "") {
						var wpvideo = WPdata.items[x].WPVideos.split(',')[0].split(' w')[0].replace(' ', '');
						WPdata.WPVid.push(jQuery.parseJSON('{"title":"' + WPdata.items[x].BlogTitle + '","lnk":"' + WPdata.items[x].BlogUrl[0] + '", "src":"' + wpvideo + '"}'));

					}
					if (WPdata.items[x].VimeoVideos.split(',') != "") {
						WPdata.VMVid.push($sce.trustAsResourceUrl('http://player.vimeo.com/video/' + WPdata.items[x].VimeoVideos.split(',')[0].split(' w')[0].replace(' ', '')));
						//$sce.trustAsResourceUrl('http://player.vimeo.com/video/'+WPdata.items[x].VimeoVideos.split(',')[0].split(' w')[0]));
					}

					for (var f = 0; f < WPdata.items[x].Tags.split(',').length; f++) {

						if (!tmpstr.replace(/\W/g, '').match(WPdata.items[x].Tags.split(',')[f].replace(/\W/g, ''))) {
							WPdata.items[x].CategoriesArr.push(WPdata.items[x].Tags.split(',')[f]);
							tmpstr = tmpstr + WPdata.items[x].Tags.split(',')[f];
						}

					}
				}
				WPdata.Videos = VideosArr;
				WPdata.Images = ImagesArr.removeDuplicatesArrObj('matcher', true)
				return WPdata;
			});
			},
		createStateObj : function() {
			var usStates = [{
				name : 'ALABAMA',
				abbreviation : 'AL',
				num : 0,
				isThere : false
			}, {
				name : 'ALASKA',
				abbreviation : 'AK',
				num : 0,
				isThere : false
			}, {
				name : 'ARKANSAS',
				abbreviation : 'AR',
				num : 0,
				isThere : false
			}, {
				name : 'AMERICAN SAMOA',
				abbreviation : 'AS',
				num : 0,
				isThere : false
			}, {
				name : 'ARIZONA',
				abbreviation : 'AZ',
				num : 0,
				isThere : false
			}, {
				name : 'CALIFORNIA',
				abbreviation : 'CA',
				num : 0,
				isThere : false
			}, {
				name : 'COLORADO',
				abbreviation : 'CO',
				num : 0,
				isThere : false
			}, {
				name : 'CONNECTICUT',
				abbreviation : 'CT',
				num : 0,
				isThere : false
			}, {
				name : 'DISTRICT OF COLUMBIA',
				abbreviation : 'DC',
				num : 0,
				isThere : false
			}, {
				name : 'DELAWARE',
				abbreviation : 'DE',
				num : 0,
				isThere : false
			}, {
				name : 'FLORIDA',
				abbreviation : 'FL',
				num : 0,
				isThere : false
			}, {
				name : 'GEORGIA',
				abbreviation : 'GA',
				num : 0,
				isThere : false
			}, {
				name : 'GUAM',
				abbreviation : 'GU',
				num : 0,
				isThere : false
			}, {
				name : 'HAWAII',
				abbreviation : 'HI',
				num : 0,
				isThere : false
			}, {
				name : 'IOWA',
				abbreviation : 'IA',
				num : 0,
				isThere : false
			}, {
				name : 'IDAHO',
				abbreviation : 'ID',
				num : 0,
				isThere : false
			}, {
				name : 'ILLINOIS',
				abbreviation : 'IL',
				num : 0,
				isThere : false
			}, {
				name : 'INDIANA',
				abbreviation : 'IN',
				num : 0,
				isThere : false
			}, {
				name : 'KANSAS',
				abbreviation : 'KS',
				num : 0,
				isThere : false
			}, {
				name : 'KENTUCKY',
				abbreviation : 'KY',
				num : 0,
				isThere : false
			}, {
				name : 'LOUISIANA',
				abbreviation : 'LA',
				num : 0,
				isThere : false
			}, {
				name : 'MASSACHUSETTS',
				abbreviation : 'MA',
				num : 0,
				isThere : false
			}, {
				name : 'MARYLAND',
				abbreviation : 'MD',
				num : 0,
				isThere : false
			}, {
				name : 'MAINE',
				abbreviation : 'ME',
				num : 0,
				isThere : false
			}, {
				name : 'MICHIGAN',
				abbreviation : 'MI',
				num : 0,
				isThere : false
			}, {
				name : 'MINNESOTA',
				abbreviation : 'MN',
				num : 0,
				isThere : false
			}, {
				name : 'MISSOURI',
				abbreviation : 'MO',
				num : 0,
				isThere : false
			}, {
				name : 'MISSISSIPPI',
				abbreviation : 'MS',
				num : 0,
				isThere : false
			}, {
				name : 'MONTANA',
				abbreviation : 'MT',
				num : 0,
				isThere : false
			}, {
				name : 'NORTH CAROLINA',
				abbreviation : 'NC',
				num : 0,
				isThere : false
			}, {
				name : 'NORTH DAKOTA',
				abbreviation : 'ND',
				num : 0,
				isThere : false
			}, {
				name : 'NEBRASKA',
				abbreviation : 'NE',
				num : 0,
				isThere : false
			}, {
				name : 'NEW HAMPSHIRE',
				abbreviation : 'NH',
				num : 0,
				isThere : false
			}, {
				name : 'NEW JERSEY',
				abbreviation : 'NJ',
				num : 0,
				isThere : false
			}, {
				name : 'NEW MEXICO',
				abbreviation : 'NM',
				num : 0,
				isThere : false
			}, {
				name : 'NEVADA',
				abbreviation : 'NV',
				num : 0,
				isThere : false
			}, {
				name : 'NEW YORK',
				abbreviation : 'NY',
				num : 0,
				isThere : false
			}, {
				name : 'OHIO',
				abbreviation : 'OH',
				num : 0,
				isThere : false
			}, {
				name : 'OKLAHOMA',
				abbreviation : 'OK',
				num : 0,
				isThere : false
			}, {
				name : 'OREGON',
				abbreviation : 'OR',
				num : 0,
				isThere : false
			}, {
				name : 'PENNSYLVANIA',
				abbreviation : 'PA',
				num : 0,
				isThere : false
			}, {
				name : 'PUERTO RICO',
				abbreviation : 'PR',
				num : 0,
				isThere : false
			}, {
				name : 'RHODE ISLAND',
				abbreviation : 'RI',
				num : 0,
				isThere : false
			}, {
				name : 'SOUTH CAROLINA',
				abbreviation : 'SC',
				num : 0,
				isThere : false
			}, {
				name : 'SOUTH DAKOTA',
				abbreviation : 'SD',
				num : 0,
				isThere : false
			}, {
				name : 'TENNESSEE',
				abbreviation : 'TN',
				num : 0,
				isThere : false
			}, {
				name : 'TEXAS',
				abbreviation : 'TX',
				num : 0,
				isThere : false
			}, {
				name : 'UTAH',
				abbreviation : 'UT',
				num : 0,
				isThere : false
			}, {
				name : 'VIRGINIA',
				abbreviation : 'VA',
				num : 0,
				isThere : false
			}, {
				name : 'VIRGIN ISLANDS',
				abbreviation : 'VI',
				num : 0,
				isThere : false
			}, {
				name : 'VERMONT',
				abbreviation : 'VT',
				num : 0,
				isThere : false
			}, {
				name : 'WASHINGTON',
				abbreviation : 'WA',
				num : 0,
				isThere : false
			}, {
				name : 'WISCONSIN',
				abbreviation : 'WI',
				num : 0,
				isThere : false
			}, {
				name : 'WEST VIRGINIA',
				abbreviation : 'WV',
				num : 0,
				isThere : false
			}, {
				name : 'WYOMING',
				abbreviation : 'WY',
				num : 0,
				isThere : false
			}, {
				name : 'BREMUDA',
				abbreviation : 'BM',
				num : 0,
				isThere : false
			}];
			return usStates;
		},
	};
}]);
	TAS_Site.factory('News', ['$http', '$routeParams', '$location', '$rootScope', '$sce',
	function($http, $routeParams, $location, $rootScope, $sce) {
		/////////loads News Articles from the News DB Fusion Table api
		return{
		getNewsData :function(item){
				var news = [];
				var newsObj = {};
				newsObj.checkContents = false;
			return $http.jsonp('https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+ArticleYear%2C+Teacher%2C+MediaOutlet%2C+ArticleTitle%2C+MediaOutletURL%2C+ArticleURL+FROM+1-1IHQax0eNNwsWjd8rRtpdxTlukzIMHbZmttKXfF&key=AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0&callback=JSON_CALLBACK').then(function(result) {
				if (result.data.rows != undefined) {
					result.data.rows.forEach (function(item){ 
						
					var o =result.data.rows.indexOf(item)
						news.push({
							articleyear : item[0],
							year:item[0],
							teacher : item[1],
							mediaoutlet : item[2],
							headline : item[3],
							medioutleturl : item[4],
							url : item[5],
							checkContents : true,
							classy: 'icon-profile',
							template:'article',
							color:'green',
							colorCode: '25, 142, 129',
							type:'article',
							randomnumber: Math.floor(Math.random()*51),
							src: 'images/newspaper.png',
							id:'article_'+o,
							description:item[0]+':'+item[2]+':'+item[3],
							favorite:'off',
							href:item[5]
						});

					});
				return news;
				} else {
					
					/////////////if fusion table is empty but doesn't throw an error/////////
					return $http.get('/JSONBackups/NewsFusionTable.json').then(function(result) {
						result.data.rows.forEach (function(item){  
							news.push({
								articleyear : item[0],
								year:item[0],
								teacher : item[1],
								mediaoutlet : item[2],
								headline : item[3],
								medioutleturl : item[4],
								url : item[5],
								checkContents : true,
								classy: 'icon-profile',
								template:'article',
								color:'green',
								colorCode: '25, 142, 129',
								type:'article',
								randomnumber: Math.floor(Math.random()*51),
								src: 'images/newspaper.png',
								id:'article_'+o,
								description:item[0]+':'+item[2]+':'+item[3],
								favorite:'off',
								href:item[5]
							});

						});
				});
				return news;	
				}
			}, function(error) {
				var news = [];
				var newsObj = {};
				newsObj.checkContents = false;
				return $http.get('/JSONBackups/NewsFusionTable.json').then(function(result) {
							forEach (result.data.rows,function(item){ 
							news.push({
								articleyear : item[0],
								year:item[0],
								teacher : item[1],
								mediaoutlet : item[2],
								headline : item[3],
								medioutleturl : item[4],
								url : item[5],
								checkContents : true,
								classy: 'icon-profile',
								template:'article',
								colorCode: '25, 142, 129',
								color:'green',
								type:'article',
								randomnumber: Math.floor(Math.random()*51),
								src: 'images/newspaper.png',
								id:'article_'+o,
								description:item[0]+':'+item[2]+':'+item[3],
								favorite:'off',
								href:item[5]
							});

						});
					
					return news;
				});
			});
		},
	};	
}]);	

TAS_Site.factory('AlumniSpot', ['$http', '$routeParams', '$location', '$rootScope', '$sce',
function($http, $routeParams, $location, $rootScope, $sce) {

	return {
		//////Loads Alumni Spotlight Fusion Table data from api
		getSpotData : function(region) {
			var spot = [];
			return $http.jsonp('https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+FirstName,LastName,ShortBody,LongBody,image,caption,PublishDate,Region+FROM+1z6kUehyfSNqaAGinvARZLYyjb7Dhk2F9rt49xHIV+ORDER%20BY+PublishDate+%22&key=AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0&callback=JSON_CALLBACK').then(function(result) {
				if (result.data.rows != undefined) {
					var d = new Date();
					var td = d.valueOf();
					result.data.rows.reverse();
					result.data.rows.forEach (function(item){
       				 var i = result.data.rows.indexOf(item);	
       				 var pd = new Date(item[6]);
						var tpd = pd.valueOf();

						if (item[6] != '#' && td >= tpd) {
							spot.push({
								id : 'spot_'+i,
								headline:item[0]+' '+ item[1],
								headline_url: item[0].replace(/ /g, '_')+'_'+item[1].replace(/ /g, '_'),
								description : item[2].replace(/"/g, ''). replace(/<p>/g, '').replace(/<\/p>/g, ''),
								longbody : item[3].replace(/"/g, ''),
								src : item[4].split('?')[0],
								caption : item[5],
								date : item[6],
								year: item[6].split('/')[2],					
								region : item[7],
								more_url : item[5].replace(/ /g, '_'),
								dataloaded : true,
								tabIndex : 150 + i,
								classy: 'icon-profile',
								template:'news',
								colorCode: '25, 142, 129',
								color:'green',
								type:'article',
								randomnumber: Math.floor(Math.random()*51),
								favorite:'off',
								href:'/25thAnniversary/$/article/'+item[6]+'/spot_'+i
								});
						}
					});
				return spot
				}
				else{
					return $http.get('JSONBackups/AlumniSpotlightTable.json').then(function(result) {
						var d = new Date();
						var td = d.valueOf();
						result.data.rows.reverse();
						result.data.rows.forEach (function(item){
        					var i = result.data.rows.indexOf(item);		
        					var pd = new Date(item[6]);
							var tpd = pd.valueOf();

							if (item[6] != '#' && td >= tpd) {
								spot.push({
									id : 'spot_'+i,
									headline:item[0]+' '+ item[1],
									headline_url: item[0].replace(/ /g, '_')+'_'+item[1].replace(/ /g, '_'),
									description : item[2].replace(/"/g, ''),
									longbody : item[3].replace(/"/g, ''),
									src : item[4].split('?')[0],
									caption : item[5],
									date : item[6],
									year: item[6].split('/')[2],
									region : item[7],
									more_url : item[5].replace(/ /g, '_'),
									dataloaded : true,
									tabIndex : 150 + i,
									classy: 'icon-profile',
									template:'news',
									colorCode: '25, 142, 129',
									color:'green',
									type:'article',
									randomnumber: Math.floor(Math.random()*51),
									favorite:'off',
									href:'/25thAnniversary/$/article/'+item[6]+'/spot_'+i
								});
							}
					});
					return spot
				});
			}
			},function(error){ 
				return $http.get('JSONBackups/AlumniSpotlightTable.json').then(function(result) {
					
						var d = new Date();
						var td = d.valueOf();
						result.data.rows.reverse();
						result.data.rows.forEach (function(item){
        					var i = result.data.rows.indexOf(item);		
        					var pd = new Date(item[6]);
							var tpd = pd.valueOf();

							if (item[6] != '#' && td >= tpd) {
								spot.push({
									id : 'spot_'+i,
									headline:item[0]+' '+ item[1],
									headline_url: item[0].replace(/ /g, '_')+'_'+item[1].replace(/ /g, '_'),
									description : item[2].replace(/"/g, ''),
									longbody : item[3].replace(/"/g, ''),
									src : item[4].split('?')[0],
									caption : item[5],
									date : item[6],
									year: item[6].split('/')[2],
									region : item[7],
									more_url : item[5].replace(/ /g, '_'),
									dataloaded : true,
									tabIndex : 150 + i,
									classy: 'icon-profile',
									template:'news',
									colorCode: '25, 142, 129',
									color:'green',
									type:'article',
									randomnumber: Math.floor(Math.random()*51),
									favorite:'off',
									href:'/25thAnniversary/$/article/'+item[6]+'/spot_'+i
								});
							}
					});
					return spot;
				});
				
				});
		}
	};	
			
}]);

TAS_Site.factory('PhotosofWeek', ['$http', '$routeParams', '$location', '$rootScope', '$sce',
function($http, $routeParams, $location, $rootScope, $sce) {
	//////loads the Photos of Week Fusion Table data from  Api
	return {
		getPOW :function(item){
			var pow = [];
			return $http.jsonp('https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+PhotoURL,PhotoCaption,BlogQuote,Title,BlogURL,PhotoCredit,BlogTitle,PublishDate,Keywords,Tweet+FROM+1bJsFIm19ENw-U9vkm5B_hA6H_2VxTga2BYWm-CmN+ORDER%20BY+PublishDate+%22&key=AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0&callback=JSON_CALLBACK').then(function(result) {
				if (result.data.rows != null) {
					var d = new Date();
					var td = d.valueOf();
					result.data.rows.reverse();
					result.data.rows.forEach (function(item){
        			var i = result.data.rows.indexOf(item);	var pd = new Date(item[7]);
						var tpd = pd.valueOf();
						
						if (item[7] != '#' && td >= tpd) {
							pow.push({
								
								src : item[0],
								headline : item[1].replace(/<p>/g, '').replace(/<\/p>/g, '').replace(/"/g, ''),
								headline_url: item[1].replace(/ /g, '_'),
								description : item[2].replace(/<p>/g, '').replace(/<\/p>/g, '').replace(/"/g, ''),
								shortdescription : item[3].replace(/<p>/g, '').replace(/<\/p>/g, '').replace(/"/g, ''),
								parent : item[4],
								credit : item[5],
								post_title : item[6],
								date : item[7],
								year: item[7].split('/')[2],
								keywords : item[8],
								dataloaded : true,
								tabIndex : (150 + (i + 7)),
								classy:'icon-images',
								template:'pow',
								colorCode:'235, 189, 30',
								color:'yellow',
								type:'image',
								randomnumber: Math.floor(Math.random()*51),
								id:'image_'+i,
								favorite:'off',
								href:'/25thAnniversary/$/image/'+item[7].split('/')[2]+'/image_'+i
							});
						}

					});
				return pow;
				}
				else{
					return $http.get('/JSONBackups/POWFusionTable.json').then(function(result)
					{
					var d = new Date();
						var td = d.valueOf();
						result.data.rows.reverse();
						result.data.rows.forEach (function(item){
       						var i = result.data.rows.indexOf(item);		
       						var pd = new Date(item[7]);
							var tpd = pd.valueOf()

							if (item[7] != '#' && td >= tpd) {
								pow.push({
									
									src : item[0],
									headline : item[1].replace(/<p>/g, '').replace(/<\/p>/g, '').replace(/"/g, ''),
									headline_url: item[1].replace(/ /g, '_'),
									description : item[2].replace(/<p>/g, '').replace(/<\/p>/g, '').replace(/"/g, ''),
									shortdescription : item[3].replace(/<p>/g, '').replace(/<\/p>/g, '').replace(/"/g, ''),
									parent : item[4],
									credit : item[5],
									post_title : item[6],
									date : item[7],
									year: item[7].split('/')[2],
									keywords : item[8],
									dataloaded : true,
									tabIndex : (150 + (i + 7)),
									classy:'icon-images',
									template:'pow',
									colorCode:'235, 189, 30',
									color:'yellow',
									type:'image',
									randomnumber: Math.floor(Math.random()*51),
									id:'image_'+i,
									favorite:'off',
									href:'/25thAnniversary/$/image/'+item[7].split('/')[2]+'/image_'+i
								});
							}

						});
						return pow;
					});
				}
			}, function(error){
				return $http.get('/JSONBAckups/POWFusionTable.json').then(function(result)
					{
					var d = new Date();
						var td = d.valueOf();
						result.data.rows.reverse();
						result.data.rows.forEach (function(item){
        				var i = result.data.rows.indexOf(item);		var pd = new Date(item[7]);
							var tpd = pd.valueOf()

							if (item[7] != '#' && td >= tpd) {
								pow.push({
									
									src : item[0],
									headline : item[1].replace(/<p>/g, '').replace(/<\/p>/g, '').replace(/"/g, ''),
									headline_url: item[1].replace(/ /g, '_'),
									description : item[2].replace(/<p>/g, '').replace(/<\/p>/g, '').replace(/"/g, ''),
									shortdescription : item[3].replace(/<p>/g, '').replace(/<\/p>/g, '').replace(/"/g, ''),
									parent : item[4],
									credit : item[5],
									post_title : item[6],
									date : item[7],
									year: item[7].split('/')[2],
									keywords : item[8],
									dataloaded : true,
									tabIndex : (150 + (i + 7)),
									classy:'icon-images',
									template:'pow',
									colorCode:'235, 189, 30',
									color:'yellow',
									type:'image',
									randomnumber: Math.floor(Math.random()*51),
									id:'image_'+i,
									favorite:'off',
									href:'/25thAnniversary/$/image/'+item[7].split('/')[2]+'/image_'+i

								});
							}

						});
						return pow;
					});
			});
		},
		getNonPOW: function()
		{
			/////Loads photos from before Photos of Week was a part of website (pre-2012) from a Fusion Table
			var nonpow = [];
			return $http.jsonp('https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+ShortDescription,PhotoURL,PhotoCredit,BlogURL,BlogTitle,BlogExcerpt,PhotoCaption,Year+FROM+1kdK3LUF2jyyI0GCnoE3TihNmzJnr7azWtMNRdHuw&key=AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0&callback=JSON_CALLBACK').then(function(result) {
				if (result.data.rows != null) {
				
					
					result.data.rows.forEach (function(item){
       				 var i = result.data.rows.indexOf(item);
							nonpow.push({
								src : item[1],
								headline : item[6].replace(/<p>/g, '').replace(/<\/p>/g, '').replace(/"/g, ''),
								headline_url: item[6].replace(/ /g, '_'),
								description : item[0].replace(/<p>/g, '').replace(/<\/p>/g, '').replace(/"/g, ''),
								parent : item[3],
								credit : item[2],
								post_title : item[4],
								description:item[5],
								year:item[7],
								dataloaded : true,
								tabIndex : (150 + (i + 7)),
								classy:'icon-images',
								template:'pow',
								colorCode:'235, 189, 30',
								color:'yellow',
								type:'image',
								randomnumber: Math.floor(Math.random()*51),
								id:'nonpow_'+i,
								favorite:'off',
								href:'/25thAnniversary/$/image/'+item[7]+'/image_'+i
							});
					});
				return nonpow
				}
				else{
					return $http.get('/JSONBAckups/POWFusionTable.json').then(function(result)
					{
						result.data.rows.forEach (function(item){
        var i = result.data.rows.indexOf(item);
							nonpow.push({
								src : item[1],
								headline : item[6].replace(/<p>/g, '').replace(/<\/p>/g, '').replace(/"/g, ''),
								headline_url: item[6].replace(/ /g, '_'),
								description : item[0].replace(/<p>/g, '').replace(/<\/p>/g, '').replace(/"/g, ''),
								parent : item[3],
								credit : item[2],
								post_title : item[4],
								description:item[5],
								year:item[7],
								dataloaded : true,
								tabIndex : (150 + (i + 7)),
								classy:'icon-images',
								template:'pow',
								colorCode:'235, 189, 30',
								color:'yellow',
								type:'image',
								randomnumber: Math.floor(Math.random()*51),
								id:'nonpow_'+i,
								favorite:'off',
								href:'/25thAnniversary/$/image/'+item[7]+'/image_'+i
							});
						});
						return nonpow
					});
				}	
					
			}, function(error){
				return $http.get('/JSONBackups/POWFusionTable.json').then(function(result)
					{
						result.data.rows.forEach (function(item){
        					var i = result.data.rows.indexOf(item);
							nonpow.push({
								src : item[1],
								headline : item[6].replace(/<p>/g, '').replace(/<\/p>/g, ''),
								headline_url: item[6].replace(/ /g, '_'),
								description : item[0].replace(/<p>/g, '').replace(/<\/p>/g, ''),
								parent : item[3],
								credit : item[2],
								post_title : item[4],
								description:item[5],
								year:item[7],
								dataloaded : true,
								tabIndex : (150 + (i + 7)),
								classy:'icon-images',
								template:'pow',
								colorCode:'235, 189, 30',
								color:'yellow',
								type:'image',
								randomnumber: Math.floor(Math.random()*51),
								id:'nonpow_'+i,
								favorite:'off',
								href:'/25thAnniversary/$/image/'+item[7]+'/image_'+i
							});
						});
						return nonpow
					});
				});
		}
	};
}]);

TAS_Site.factory('Quotes', ['$http', '$routeParams', '$location', '$rootScope', '$sce',
function($http, $routeParams, $location, $rootScope, $sce){
return{
	getQuotesData :function(item){
		/////Loads Teacher Quotes data from the Quotes Fusion Table api
			var quotes = [];
			return $http.jsonp('https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+Teacher,Quote, Year,PhotoUrl+FROM+1dLPLwT20qdY3hYfgwO1nUTfRhzsX1aSXcPfCZKZ8&key=AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0&callback=JSON_CALLBACK').then(function(result) {
				if (result.data.rows != null) {
					result.data.rows.forEach (function(item){
						var i = result.data.rows.indexOf(item);
						
						quotes.push({
						id : 'quote_'+i,
						tabIndex: i + 200,
						//quote.headline=quote[0]+' '+ quote.item[1];
						classy:'icon-bubble',
						template: 'quotes',
						colorCode: '4, 146, 206',
						year : item[2],
						color:'blue',
						type:'quote',
						quote : item[1],
						teacher:item[0],
						src:item[3].split('?')[0],
						headline:item[1],
						favorite:'off',
						href:'/25thAnniversary/$/image/'+item[2]+'/quote'+i
						});
					});
				return quotes;
				}
				else{
					return $http.get('/JSONBackups/25thQuotes.json').then(function(result) {
					var i=quotes.indexOf(quote);
					result.data.rows.forEach (function(item){
						quotes.push( {
						id : 'quote_'+i,
						tabIndex: i + 200,
						//quote.headline=quote[0]+' '+ quote.item[1];
						classy:'icon-bubble',
						template: 'quotes',
						colorCode: '4, 146, 206',
						year : item[2],
						color:'blue',
						type:'quote',
						quote : item[1],
						teacher:item[0],
						src:item[3].split('?')[0],
						headline:item[1],
						favorite:'off',
						href:'/25thAnniversary/$/image/'+item[2]+'/quote'+i
						});
						return quotes;
					});
				});
				}
			}, function(error) {
				
				return $http.get('JSONBackups/25thQuotes.json').then(function(result) {
					quotes = result.data.feed.entry;
					var i=quotes.indexOf(quote);
					result.data.rows.forEach (function(item){
						quotes.push({				
						id : 'quote_'+i,
						tabIndex: i + 200,
						//quote.headline=quote[0]+' '+ quote.item[1];
						classy:'icon-bubble',
						template: 'quotes',
						colorCode: '4, 146, 206',
						year : item[2],
						color:'blue',
						type:'quote',
						quote : item[1],
						teacher:item[0],
						src:item[3].split('?')[0],
						headline:item[1],
						favorite:'off',
						href:'/25thAnniversary/$/image/'+item[2]+'/quote'+i
						});
						return quotes;
					});
				});
			});
		}
	};			
}]);	

TAS_Site.factory('Lessons', ['$http', '$routeParams', '$location', '$rootScope', '$sce',
function($http, $routeParams, $location, $rootScope, $sce){
return{
	getLessonData : function(teachername) {
			
			/////Loads Lessons data from Lessons DB Fusion Table api

			return $http.jsonp('https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+LastName%2CFirstName%2CState%2C+YearSailed%2C+GradeLevel%2C+Size%2C+Title%2C+Keywords%2C+Objective%2C+Description%2C+URL%2c+Topics+FROM+17OXuyYjiIvxjr1Yd3DZ-SI-dzp-soOuTDNOHoSOA&key=AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0&callback=JSON_CALLBACK').then(function(result) {
				if (result.data.rows != undefined) {
					var lesson = [];
					
					result.data.rows.forEach(function(item){
						var o = result.data.rows.indexOf(item);
						lesson.push({
							lastname : item[0],
							firstname : item[1],
							state : item[2],
							year : item[3],
							grades : item[4],
							gradesArr : item[4].split(','),
							size : item[5],
							headline : item[6],
							keywords : item[7],
							keywordArr : item[7].split(','),
							objective : item[8],
							description : item[9],
							url : item[10],
							topics : item[11],
							checkContents : true,
							id : 'lesson_'+o,
							favorite : 'off',
							classy: 'icon-chalkboard2' ,
							template: 'lesson',
							colorCode:'0, 51, 80',
							color:'dkstblue',
							type:'lesson',
							src: 'images/chalkboard.png',
							randomnumber: Math.floor(Math.random()*51),
							favorite:'off',
							href: item[10]
						});
						
					});
					
					return lesson;
				}
				else{
					var lesson = [];
					return $http.get('/JSONBackups/LessonsTable.json').then(function(result) {
					
					data.rows.forEach(function(item){
						var o = result.data.rows.indexOf(item);
						var name_comp = item[1] + ' ' + item[0]

						if (name.toLowerCase() == name_comp.toLowerCase()) {
							lesson.push({
								lastname : item[0],
								firstname : item[1],
								state : item[2],
								year : item[3],
								grades : item[4],
								gradesArr : item[4].split(','),
								size : item[5],
								headline : item[6],
								keywords : item[7],
								keywordArr : item[7].split(','),
								objective : item[8],
								description : item[9],
								url : item[10],
								topics : item[11],
								checkContents : true,
								id :'lesson'+ o,
								favorite : 'off',
								classy: 'icon-chalkboard2',
								template: 'lesson',
								colorCode:'0, 51, 80',
								color:'dkstblue',
								type:'lesson_',
								src: 'images/chalkboard.png',
								randomnumber: Math.floor(Math.random()*51),
								favorite:'off',
								href: item[10]

							});
						}
					});

					return lesson;
					});
					}

				

			}, function(error) {

				var lesson = [];
				return $http.get('/JSONBackups/LessonsTable.json').then(function(result) {
					var name = $routeParams.teachername.replace('*', ' ')

					data.rows.forEach(function(item){
						var o = result.data.rows.indexOf(item);
						var name_comp = item[1] + ' ' + item[0]

						if (name.toLowerCase() == name_comp.toLowerCase()) {
							lesson.push({
								lastname : item[0],
								firstname : item[1],
								state : item[2],
								year : item[3],
								grades : item[4],
								gradesArr : item[4].split(','),
								size : item[5],
								headline : item[6],
								keywords : item[7],
								keywordArr : item[7].split(','),
								objective : item[8],
								description : item[9],
								url : item[10],
								topics : item[11],
								checkContents : true,
								id :'lesson_'+ o,
								favorite : 'off', 
								classy: 'icon-chalkboard2',
								template: 'lesson',
								colorCode:'0, 51, 80',
								color:'dkstblue',
								type:'lesson',
								src: 'images/chalkboard.png',
								randomnumber: Math.floor(Math.random()*51),
								favorite:'off',
								href: item[10]
							});
						}
					});

					return lesson;
				});
			});
		},
	};
}]);

TAS_Site.factory('Stats', ['$http', '$routeParams', '$q','Teacher',
function($http, $routeParams, $q, Teacher) {
		return{
			
			correlateStats:function(teachers, years, stats)
			{
				/////Adds up stats for TAS over the years given info that was created by controller from the TAS (Multiple Years) controller
				var obj={}
				var arr =[];
				var deferred=$q.defer();
				for(var i=0; i<years.length; i++)
					{
					arr.push(i)
					var obj2=teachers.collectSameValues('year',years[i].year);
					for(var x=0; x<stats.length; x++){
							
							if(stats[x]!=undefined &&stats[x].year==years[i].year){
						
							stats[x].favorite='off';
							stats[x].map={}	;
							stats[x].map.statesArr=Teacher.createStateObj();
							stats[x].teachers=obj2	;
							stats[x].numofteachers=obj2.length;
							stats[x].hours=	obj2.length*12*12;
							stats[x].days= obj2.length*12;
							stats[x].students= obj2.length*100*5;
							stats[x].id='stat'+(x).toString();
							stats[x].map.states=[];
							stats[x].href='/25thAnniversary/$/cards'
							obj2.forEach(function(teacher){
								
								stats[x].map.type='stat';
								stats[x].map.id=i;
								stats[x].map.colorCode='140, 199, 192';
								stats[x].map.color='ltgreen';
								stats[x].map.year=years[i].year;
								stats[x].map.template='map';
								stats[x].map.classy= 'icon-stats';
								stats[x].map.headline="Map for "+years[i].year
								stats[x].map.states.push(teacher.state);
								stats[x].map.favorite='off';
								stats[x].map.href='/25thAnniversary/$/cards'
								stats[x].number = x;
								stats[x].map.src= 'images/stats.png';
								stats[x].map.description= years[i].year+ ' Teachers at Sea by state';
									stats[x].map.statesArr.forEach(function(state){
										if(state.abbreviation==teacher.state)
										{
										state.num = parseInt(state.num)+1;
										state.isThere=true;
										}
										
									});
								
							});
							stats[x].statesFinal=stats[x].map.states.removeDuplicatesArr();
							stats[x].stateStr=stats[x].statesFinal.join(', ');
							}
							
							
						};
					
					
					};
					
					if(arr.length==years.length)
					{
					obj.stats=stats;
					obj.maps=[];
					obj.stats.forEach(function(item){
						obj.maps.push(item.map)
					});
					deferred.resolve(obj);
					return deferred.promise;	
					}
				
			},
			wpStats: function(years)
			{
				//////////////Looks for the number of posts and images from a certain year using the xml_json_25th.php file
				var yearStr='';
				years.forEach(function(year){
					yearStr+=year.year+'$$$';
				});
				
				var obj={posts:[], images:[], stats:[]}

				return $http.get('/php/xml_json_25th.php?q='+yearStr).then(function(result){
				years.forEach(function(year){
					var arr=[];
					arr.year=Number();
					arr.posts=[];
					var images=[];
					images.year=Number();
					images.images=[];
					result.data.items.forEach(function(item){
					
						
					item.year=new Date(item.date["0"]).getFullYear();					
						
						
						if(item.year==year.year)
						{
							
							arr.push(item);
							arr.year=year.year;	
							arr.type='stat';
							arr.colorCode='140, 199, 192';
							arr.color='ltgreen';
							arr.year=year.year;
							arr.template='stat';
							arr.classy= 'icon-stats';
							arr.headline=year.year;
						}
						

					});
					result.data.images.forEach(function(image){
					
					image.year=new Date(image.date["0"]).getFullYear();					
						
						if(image.year==year.year)
						{
							images.push(image)
							images.year=year.year;	
							
						}
					});
					obj.images.push(images);
					obj.posts.push(arr);
					obj.stats.push({
							//images:images, 
							//arr:arr ,
							posts:arr.length,
							num_images:images.length,
							type:'stat',
							colorCode:'140, 199, 192',
							color:'ltgreen',
							year:year.year,
							template:'stat',
							classy:'icon-stats',
							headline:'Stats for ' +year.year.toString(),
							src: 'images/stats.png',
							description: year.year+ ' Teachers at Sea Stats'
							});
					
				});
				return obj;	
				
				
				});
			}
			
		};
		
}]);

TAS_Site.factory('Timeline', ['$http', '$routeParams', '$location', '$rootScope', '$sce',
function($http, $routeParams, $location, $rootScope, $sce) {
	return{
		getTimelineData:function()
		{
		////////////loads timeline data from a local JSON file	
		return $http.get('json/timeline.json').then(function(data){
				var items= (data.data.feed.entry),
				tmpTxt='',
				td=new Date();
				items.years=[];
				items.forEach( function(item)
				{
					var cutoffdate = new Date(item.gsx$date.$t);
					if(!tmpTxt.match(item.gsx$year.$t)&& cutoffdate.valueOf()<td.valueOf())
					{
						items.years.push(
							{'year':item.gsx$year.$t, 'state': 'notselected', color:item.gsx$color.$t, classy:'hider',noSubnav:true,
								subNav :[
								{type:"article", state:'notselected', checked:'notselected', color:'green', 'year':item.gsx$year.$t, on_off:'off','classy':'icon-newspaper' }, 
								{type:"image",state:'notselected', checked:'notselected', color:'yellow', 'year':item.gsx$year.$t, on_off:'off','classy':'icon-images ' },
								{type:'profile', state:'notselected', checked:'notselected', color:'dkblue', 'year':item.gsx$year.$t, on_off:'off', 'classy':'icon-profile' },
								{type:"quote", state:'notselected', checked:'notselected', color:'blue', 'year':item.gsx$year.$t, on_off:'off', 'classy':'icon-bubble' },  
								{type:"lesson", state:'notselected', checked:'notselected', color:'dkstblue', 'year':item.gsx$year.$t, on_off:'off', 'classy':'icon-chalkboard2' }, 
								{type:"stat", state:'notselected', checked:'notselected', color:'ltgreen', 'year':item.gsx$year.$t, on_off:'off', 'classy':'icon-stats' }, 
								]
						});
					}
					tmpTxt+=item.gsx$year.$t+',';
					
				});
				return items;
		});	
		
		}
	};
}]);	

TAS_Site.factory('BrowseSearch', ['$q', function( $q){
	return{
		////////////runs a specific filter on data
		SearchData :function(arr, query, properties, checkDupProperty)
		{
		var deferred = $q.defer();
		var searchArr={arr:[], fullArr:[]};
		var searchArr=arr.searchDataMatch(query, properties, checkDupProperty);
		deferred.resolve(searchArr);
		return deferred.promise;
		},
		
		FilterData: function(arr, query, properties, checkDupProperty,type, checking_prop)
		{
		
		var deferred = $q.defer();
		var filteredArr={arr:[], fullArr:[]};
		filteredArr=arr.searchObjProperties(query, properties, checkDupProperty, type, checking_prop);
		//filteredArr= filteredArr.removeDuplicatesArrObj('headline', false)
		deferred.resolve(filteredArr);
		return deferred.promise;	
		}
	};	
}]);


TAS_Site.factory('Favorites', ['$http', '$routeParams', '$location', '$rootScope', '$sce',
function($http, $routeParams, $location, $rootScope, $sce) {
	return {
		////looks through localStorage and adds items to FavoritesArr
		addFavorites:function()
		{
			if(localStorage.getItem('FavoriteArr25th')!=null && localStorage.getItem('FavoriteArr25th')!='')
			{
				var favorites = jQuery.parseJSON(localStorage.getItem('FavoriteArr25th'))

			}
			else
			{
				favorites=[];
				//favorites.blogHider=true;
			}
			favorites.forEach(function(favorite)
				{
					favorite.num_id=favorites.indexOf(favorite);
				});
			localStorage.setItem('FavoriteArr25th', JSON.stringify(favorites));
		},
		checkFavorites: function(obj)
		{
			////runs through localStorage's FavoritesArr object and checks items against it to see if they are starred
			if(localStorage.getItem('FavoriteArr25th')!=null && localStorage.getItem('FavoriteArr25th')!='')
			{
				var favoritesArr = jQuery.parseJSON(localStorage.getItem('FavoriteArr25th'))
				
			}
			else
			{
			favoritesArr=[];
			}
			favoritesArr.forEach(function(favorite)
			{
				favorite.favorite='off';
				if(favorite.id==obj.id)
				{
					obj.favorite='on';
				}
				

			});
		},
		///////////Sets up favorites for sharing via email and social media
		setUpEmail : function() {
			var favorites = [];
			var emailTxt = '';
			var imagesTxt = '';
			var lessonsTxt = '';
			var finalTxt = '';
			if (localStorage.getItem('FavoriteArr25th') != null && localStorage.getItem('FavoriteArr25th') != '') {
				var favorites = jQuery.parseJSON(localStorage.getItem('FavoriteArr25th'));

			} else {
				var favorites = [];
			}

			

			for (var x = 0; x < favorites.length; x++) {
				
				var mailImg = favorites[x].src;
				var mailUrl =  encodeURIComponent(favorites[x].href)
				
				var mailTitle = favorites[x].headline;
				emailTxt += mailImg + '**' + mailUrl + '**' + mailTitle + '@@'
			}
			

			finalTxt = '&message=' + emailTxt//&dyk=';
			

			return finalTxt;
		},
		////////creates short url for sharing
		getBitLy : function(url) {
			var bitly = 'http://api.bitly.com/v3/shorten?format=json&apiKey=R_06ae3d8226a246f2a0bb68afe44c8379&login=robostheimer&longUrl=' + url
			return $http.get(bitly).then(function(result) {
				
				return result.data.data;
			});
		}
	};
}]);


TAS_Site.factory('Sharer', ['$http', '$routeParams', '$location', '$rootScope', '$sce','$q',
function($http, $routeParams, $location, $rootScope, $sce, $q) {
	/////////Used for sharing on Facebooks sharer api.
	///////necessary because with the FB API, the above Favorites.setUpEmail method does not work
	return {
			getCards:function(){
			var deferred = $q.defer();	
			var emailTxt='';
			
			if(localStorage.getItem('FavoriteArr25th')!=null && localStorage.getItem('FavoriteArr25th')!='')
			{
				var favoritesArr = jQuery.parseJSON(localStorage.getItem('FavoriteArr25th'))
				
			}
			else
			{
			favoritesArr=[];
				//favorites.blogHider=true;
			}	
			
			favoritesArr.forEach(function(favorite)
			{
				
				var mailImg = favorite.src;
				var mailUrl =  favorite.type+'$$$'+favorite.year+'$$$'+favorite.id				
				var mailTitle = favorite.headline;
				emailTxt +=mailTitle+'**'+ mailImg + '**' + mailUrl + '@@'
			});
			
			deferred.resolve(emailTxt)
			return deferred.promise;
		},
		parseUrl:function(url){
			var deferred = $q.defer();
			var url = url.split('/')[3];
			
		}
	};
}]);