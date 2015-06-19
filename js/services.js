//'use strict';

/* Services */
/////////////////////////////////HomePage/////////////////////////////////////////////
TAS_Site.factory('Teacher', ['$http', '$routeParams', '$location', '$rootScope', '$sce',
function($http, $routeParams, $location, $rootScope, $sce) {
	return{
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
							description:item[1]+' '+item[0]+'  of '+ item[10]+', ' +item[11]+ ' teaches '+item[8]+' at ' + item[9]+ 'and  will be aboard' + item[2]+' '+item[3]+ ' '+item[5]+ 'while scientist conduct a'+item[6] +' survey'
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
					console.log($routeParams.year)
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
								description:item[6] +':'+item[11] +':'+item[3]+':'+item[13]+':'+item[8]+':'+item[9]+':'+item.year+':'+item.city+':'+item.state
							
							});
							teachers.count=result.data.rows.length;
							
							

						}
					});
					return teachers;
				});
			});
		}
	};
}]);
TAS_Site.factory('News', ['$http', '$routeParams', '$location', '$rootScope', '$sce',
function($http, $routeParams, $location, $rootScope, $sce) {
	return{
	getNewsData :function(item){
			///////////////////////////////Start Here////////////////////
			var news = [];
			var newsObj = {};
			newsObj.checkContents = false;
			return $http.jsonp('https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+ArticleYear%2C+Teacher%2C+MediaOutlet%2C+ArticleTitle%2C+MediaOutletURL%2C+ArticleURL+FROM+1EaTTZDozzJ0k3K2FMoD0O6JAfeiHcc6SB95f0hYv&key=AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0&callback=JSON_CALLBACK').then(function(result) {
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
							});

						});
					
					
					
				});
				return news;	
				}
				//console.log(news);
				

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
								hash : '/indiv_spotlight/' + item[0].replace(/ /g, '_') + '_' + item[1].replace(/ /g, '_'),
								dataloaded : true,
								tabIndex : 150 + i,
								classy: 'icon-profile',
								template:'news',
								colorCode: '25, 142, 129',
								color:'green',
								type:'article',
								randomnumber: Math.floor(Math.random()*51),
								
								


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
									hash : '/indiv_spotlight/' + item[0].replace(/ /g, '_') + '_' + item[1].replace(/ /g, '_'),
									dataloaded : true,
									tabIndex : 150 + i,
									classy: 'icon-profile',
									template:'news',
									colorCode: '25, 142, 129',
									color:'green',
									type:'article',
									randomnumber: Math.floor(Math.random()*51),
									

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
									hash : '/indiv_spotlight/' + item[0].replace(/ /g, '_') + '_' + item[1].replace(/ /g, '_'),
									dataloaded : true,
									tabIndex : 150 + i,
									classy: 'icon-profile',
									template:'news',
									colorCode: '25, 142, 129',
									color:'green',
									type:'article',
									randomnumber: Math.floor(Math.random()*51),
									
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

	return {
		getPOW :function(item){
			var pow = [];
			return $http.jsonp('https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+PhotoURL,PhotoCaption,Facebook,ShortDescription,BlogURL,PhotoCredit,BlogTitle,PublishDate,Keywords,Tweet+FROM+19WBCSYuVJh1O2KaThKQJpLLn0VF6w3rHhbKtZMVf+ORDER%20BY+PublishDate+%22&key=AIzaSyBBcCEirvYGEa2QoGas7w2uaWQweDF2pi0&callback=JSON_CALLBACK').then(function(result) {
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
								id:'image_'+i
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
									id:'image_'+i

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
									id:'image_'+i

								});
							}

						});
						return pow;
					});
			});
		},
		getNonPOW: function()
		{
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
								id:'nonpow_'+i

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
								id:'nonpow_'+i

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
								id:'nonpow_'+i

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
						colorCode: '25, 142, 129',
						year : item[2],
						color:'green',
						type:'quote',
						quote : item[1],
						teacher:item[0],
						src:item[3].split('?')[0],
						headline:item[1]
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
						colorCode: '25, 142, 129',
						year : item[2],
						color:'green',
						type:'quote',
						quote : item[1],
						teacher:item[0],
						src:item[3].split('?')[0],
						headline:item[1]
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
						colorCode: '25, 142, 129',
						year : item[2],
						color:'green',
						type:'quote',
						quote : item[1],
						teacher:item[0],
						src:item[3].split('?')[0],
						headline:item[1]
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
							randomnumber: Math.floor(Math.random()*51)
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
								randomnumber: Math.floor(Math.random()*51)

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
								randomnumber: Math.floor(Math.random()*51)


							});
						}
					});

					return lesson;
				});
			});
		},
	};
}]);

TAS_Site.factory('Stats', ['$http', '$routeParams', '$q',
function($http, $routeParams, $q) {
		return{
			
			correlateStats:function(teachers, years, stats)
			{
				var arr=[];
				
				var deferred=$q.defer();
				
					
					
					for(var i=0; i<years.length; i++)
					{
					
					var obj2=teachers.collectSameValues('year',years[i].year);
					console.log(obj2)
					for(var x=0; x<stats.length; x++){
							if(stats[x]!=undefined &&stats[x].year==years[i].year){
							stats[x].teachers=obj2	;
							console.log(stats[x].teachers)
							stats[x].hours=Number();
							stats[x].hours=	obj2.length*12*12;
							stats[x].days=Number();
							stats[x].days= obj2.length*12;
							stats[x].students=Number();
							stats[x].students= obj2.length*100*5;
							stats[x].id='stat'+(x).toString();
							stats[x].states=[];
							obj2.forEach(function(teacher){
								stats[x].states.push(teacher.state);
								
							});
							stats[x].states=stats[x].states.removeDuplicatesArr();
							stats[x].stateStr=stats[x].states.join(', ');
							}
							
					};
					
					};
					if(i==years.length)
					{
					console.log(stats);
					deferred.resolve(stats);
					return deferred.promise;	
					}
				
			},
			wpStats: function(year)
			{
				var obj={}
				return $http.get('/php/xml_json_home.php?q='+year.year).then(function(result){
				if(typeof(result.data)=='object')
				{
					obj.posts = result.data.items.length;
					obj.images=result.data.gallery_images.length;
					obj.type='stat';
					obj.colorCode='140, 199, 192';
					obj.color='ltgreen';
					obj.year=year.year;
					obj.template='stat';
					obj.classy= 'icon-stats';
					obj.headline=year.year;
					
					return obj;
				}
				else{
					obj.posts = 0;
					obj.images=0;
					obj.year=year.year;
					obj.type='stat';
					obj.colorCode='140, 199, 192';
					obj.color='ltgreen';
					obj.year=year.year;
					obj.template='stat';
					obj.classy= 'icon-stats';
					obj.headline=year.year;
					return obj;
				}
				
				
				//deferred.resolve(obj);
				//return deferred.promise;	
				});
			}
		};
}]);

TAS_Site.factory('Timeline', ['$http', '$routeParams', '$location', '$rootScope', '$sce',
function($http, $routeParams, $location, $rootScope, $sce) {
	return{
		getTimelineData:function()
		{
		return $http.get('json/timeline.json').then(function(data){
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
				
				items.forEach( function(item)
				{
					if(!tmpTxt.match(item.gsx$year.$t))
					{
						items.years.push(
							{'year':item.gsx$year.$t, 'state': 'notselected', color:item.gsx$color.$t, classy:'hider',noSubnav:true,
								subNav :[
								{type:"article", state:'notselected', checked:'notselected', color:'green', 'year':item.gsx$year.$t, on_off:'off','classy':'icon-newspaper green' }, 
								{type:"image",state:'notselected', checked:'notselected', color:'yellow', 'year':item.gsx$year.$t, on_off:'off','classy':'icon-images yellow' },
								{type:'profile', state:'notselected', checked:'notselected', color:'dkblue', 'year':item.gsx$year.$t, on_off:'off', 'classy':'icon-profile dkblue' },
								{type:"quote", state:'notselected', checked:'notselected', color:'blue', 'year':item.gsx$year.$t, on_off:'off', 'classy':'icon-bubble blue' },  
								{type:"lesson", state:'notselected', checked:'notselected', color:'dkstblue', 'year':item.gsx$year.$t, on_off:'off', 'classy':'icon-chalkboard2 dkstblue' }, 
								{type:"stat", state:'notselected', checked:'notselected', color:'ltgreen', 'year':item.gsx$year.$t, on_off:'off', 'classy':'icon-stats ltgreen' }, 
								]
						});
					}
					tmpTxt+=item.gsx$year.$t+',';
					
				});
				//console.log(items)
				return items;
		});	
		
		}
	};
}]);	

TAS_Site.factory('BrowseSearch', ['$q', function( $q){
	return{
		
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
