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
			var histMax, histMin;
			var foreMax, foreMin;
			var dataHistoricalSky = [];
			var dataHistoricalPre = [];
			var dataHistoricalHum = [];
			var dataHistoricalVis = [];
			
			var toHTML;
			
			
			for(var l=0; l<10; l++){
				dataForecast[l] = (data.forecast.simpleforecast.forecastday[l].high.fahrenheit);
				labelsForecast[l] = (data.forecast.simpleforecast.forecastday[l].date.month + "/" + data.forecast.simpleforecast.forecastday[l].date.day + "/" + data.forecast.simpleforecast.forecastday[l].date.year);
			}
			
			for(var l=0; l<24; l++){
				dataHistorical[l] = (data.history.observations[l].tempi);
				labelsHistorical[l] = (data.history.observations[l].date.hour + ":" + data.history.observations[l].date.min);
				dataHistoricalSky[l] = (data.history.observations[l].conds);
				dataHistoricalPre[l] = (data.history.observations[l].pressurei);
				dataHistoricalHum[l] = (data.history.observations[l].hum) + '%';
				dataHistoricalVis[l] = (data.history.observations[l].vism);			
			}
			
			document.getElementById("dataTable").innerHTML = toHTML;
			
			var toHTML = "<table><tr>";
			for(var l=0; l<24; l++) toHTML = "<td>" + dataHistoricalSky[l] + "</td>";
			toHTML = toHTML + "</tr><tr>"
			for(var l=0; l<24; l++) toHTML = "<td>" + dataHistoricalPre[l] + "</td>";
			toHTML = toHTML + "</tr><tr>"
			for(var l=0; l<24; l++) toHTML = "<td>" + dataHistoricalHum[l] + "</td>"; 
			toHTML = toHTML + "</tr><tr>"
			for(var l=0; l<24; l++) toHTML = "<td>" + dataHistoricalVis[l] + "</td>";
			toHTML = toHTML + "</tr></table>"
			
			histMax = (Math.round(Math.max.apply(Math, dataHistorical)/2) * 2) + 2;
			histMin = (Math.round(Math.min.apply(Math, dataHistorical)/2) * 2) - 2;
			
			foreMax = (Math.round(Math.max.apply(Math, dataForecast)/2) * 2) + 2;
			foreMin = (Math.round(Math.min.apply(Math, dataForecast)/2) * 2) - 2;
				
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
								min: foreMin,
								max: foreMax
							}
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
						text: 'Historical Conditions (' + mo + '/' + da + '/' + yr + ' - Hourly)'
					},
					scales: {
						yAxes: [{
							ticks: {
								min: histMin,
								max: histMax
							}
						}]
					}
				}
			});
		}
	})
}		