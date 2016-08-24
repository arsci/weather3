function pageLoadDefault(){		

	var currentDate = new Date();
	var yr = currentDate.getFullYear();
	var mo = currentDate.getMonth();
	var da = currentDate.getDate();
	
	if(Number(mo) < 10) mo = "0" + mo;
	if(Number(da) < 10) da = "0" = da;
	
	var urlAPI = "//api.wunderground.com/api/d95017df2847b211/conditions/forecast10day/" + yr + mo + da + "/q/94105.json";
	
	$("#url").text(urlAPI);
	
	$.ajax({
		type: 'GET',
		url: '',
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
			
			for(var l=0; l<10; l++){
				dataForecast[l] = (data.forecast.simpleforecast.forecastday[l].high.fahrenheit);
				labelsForecast[l] = (data.forecast.simpleforecast.forecastday[l].date.month + "/" + data.forecast.simpleforecast.forecastday[l].date.day + "/" + data.forecast.simpleforecast.forecastday[l].date.year);
			}
			
			for(var l=0; l<27; l++){
				dataHistorical[l] = (data.history.observations[l].tempi);
				labelsHistorical[l] = (data.history.observations[l].date.hour + ":" + data.history.observations[l].date.min);
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
					},
					scales: {
						yAxes: [{
							ticks: {
								min: 55,
								max: 75
							}	
						}],
						xAxes: [{
							display: true
						}]
					}
				}
			});
			
			// Generate graph data
			var ctxHistorical = document.getElementById("chartHistorical").getContext("2d");
			ctxHistorical.canvas.height = 25;
			var chartHistorical = new Chart(ctxHistorical , {
				responsive: 'true',
				type: 'line',
				data: { 
					labels: labelsHistorical,
					datasets:[{
						label: 'Temperature (F)',
						data: dataHistorical
					}]	
				},	
				options: {
					hover: {
						mode: 'label'
					},
					title: {
						display: true,
						text: 'Historical Conditions (Previous Day - Hourly)'
					},
					scales: {
						yAxes: [{
							ticks: {
								min: 55,
								max: 75
							}	
						}],
						xAxes: [{
							display: true
						}]
					}
				}
			});
		}
	})
}		