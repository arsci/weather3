function pageLoadDefault(){	

	var yesterayDate = new Date(new Date() - 86400000);
	var yr = yesterayDate.getFullYear();
	var mo = yesterayDate.getMonth();
	var da = yesterayDate.getDate();
	
	if(Number(mo) < 10) mo = "0" + mo;
	if(Number(da) < 10) da = "0" + da;
	
	var urlAPI = "//api.wunderground.com/api/d95017df2847b211/conditions/forecast10day/history_" + yr + mo + da + "/q/94105.json";
	
	$.ajax({
		type: 'GET',
		url: urlAPI,
		success: function(data) {	
		
			//Current Conditions
			$("#location").text(data.current_observation.observation_location.full);
			$("#temp_f").text(data.current_observation.temperature_string);
			$("#visibility_mi").text(data.current_observation.visibility_mi);
			$("#pressure_in").text(data.current_observation.pressure_in);
			$("#observation_time").text(data.current_observation.observation_time);
			$("#relative_humidity").text(data.current_observation.relative_humidity);
			$("#wind_string").text(data.current_observation.wind_string);
				
			var labelsForecast = [];
			var dataForecast = [];
			var labelsHistorical = [];
			var dataHistorical = [];
			var dataHistoricalSky = [];
			
			var test1;
			var test2;
			var test3;
			var test4;
			
			for(var l=0; l<10; l++){
				dataForecast[l] = (data.forecast.simpleforecast.forecastday[l].high.fahrenheit);
				labelsForecast[l] = (data.forecast.simpleforecast.forecastday[l].date.month + "/" + data.forecast.simpleforecast.forecastday[l].date.day + "/" + data.forecast.simpleforecast.forecastday[l].date.year);
			}
			
			
			
				
			// Generate graph data
			var ctxForecast = document.getElementById("chartForecast").getContext("2d");
			ctxForecast.canvas.height = 25;
			var chartForecast = new Chart(ctxForecast , {
				responsive: 'true',
				type: 'line',
				data: { 
					labels: labelsForecast,
					datasets:[{
						label: 'Temperature (F)',
						data: dataForecast
					}]	
				},	
				options: {
					hover: {
						mode: 'label'
					},
					title: {
						display: true,
						text: '10 Day Forecast Conditions'
					}
				}
			});
			
			// Generate graph data
			var ctxHistorical = document.getElementById("chartHistorical").getContext("2d");
			ctxHistorical.canvas.height = 25;
			var chartHistorical = new Chart(ctxHistorical , {
				multiTooltipTemplate: "<%= datasetLabel %> - <%= value %>" ,
				responsive: 'true',
				showTooltips: 'true',
				type: 'line',
				data: { 
					labels: labelsHistorical,
					dataPoints: [       
						{ x: new Date(2012, 06, 18), y: 2000000 }, 
						{ x: new Date(2012, 06, 23), y: 6000000 }, 
						{ x: new Date(2012, 07, 1), y: 10000000, indexLabel:"10m"}, 
						{ x: new Date(2012, 07, 11), y: 21000000 }, 
						{ x: new Date(2012, 07, 23), y: 50000000 }, 
						{ x: new Date(2012, 07, 31), y: 75000000  }, 
						{ x: new Date(2012, 08, 04), y: 100000000, indexLabel:"100m" },
						{ x: new Date(2012, 08, 10), y: 125000000 },
						{ x: new Date(2012, 08, 13), y: 150000000},	
						{ x: new Date(2012, 08, 16), y: 175000000},	
						{ x: new Date(2012, 08, 18), y: 200000000, indexLabel:"200m"},	
						{ x: new Date(2012, 08, 21), y: 225000000},	
						{ x: new Date(2012, 08, 24), y: 250000000},	
						{ x: new Date(2012, 08, 26), y: 275000000},	
						{ x: new Date(2012, 08, 28), y: 302000000, indexLabel:"300m"}	
					]	
				},	
				options: {
					hover: {
						mode: 'label'
					},
					title: {
						display: true,
						text: 'Historical Conditions (Previous Day - Hourly)'
					}
				}
			});
		}
	})
}		