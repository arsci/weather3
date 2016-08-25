function pageLoadDefault(){			

	var yesterayDate = new Date(new Date() - 86400000);
	var yr = yesterayDate.getFullYear();
	var mo = yesterayDate.getMonth() + 1;
	var da = yesterayDate.getDate();
	
	if(Number(mo) < 10) mo = "0" + mo;
	if(Number(da) < 10) da = "0" + da;
	
	var urlAPI = "//api.wunderground.com/api/d95017df2847b211/conditions/forecast10day/history_" + yr + mo + da + "/q/94105.json";

	$.ajax({
		type: 'GET',
		url: urlAPI,
		success: function(data) {	
		
			var labelsForecast = [];
			var dataForecast = [];
			var dataForecastSky = [];
			
			var labelsHistorical = [];
			var dataHistorical = [];
			var dataHistoricalSky = [];
			var dataHistoricalPre = [];
			var dataHistoricalHum = [];
			var dataHistoricalVis = [];
			var m = 24;
			var n = 0;
			
			var foreMax, foreMin;
			var histMax, histMin;
			
			var toHTMLForecast;
			var toHTMLHistorical;
			
			var ctxForecast = document.getElementById("chartForecast").getContext("2d");
			var ctxHistorical = document.getElementById("chartHistorical").getContext("2d");
			
			document.getElementById("location").innerHTML = data.current_observation.observation_location.full;
			document.getElementById("temp_f").innerHTML = data.current_observation.temperature_string;
			document.getElementById("visibility_mi").innerHTML =data.current_observation.visibility_mi + 'mi';
			document.getElementById("pressure_in").innerHTML = data.current_observation.pressure_in + 'inHg';
			document.getElementById("observation_time").innerHTML = data.current_observation.observation_time;
			document.getElementById("relative_humidity").innerHTML = data.current_observation.relative_humidity;
			document.getElementById("wind_string").innerHTML = data.current_observation.wind_string;
			
			for(var l=0; l<10; l++){
				dataForecast[l] = (data.forecast.simpleforecast.forecastday[l].high.fahrenheit);
				labelsForecast[l] = (data.forecast.simpleforecast.forecastday[l].date.month + "/" + data.forecast.simpleforecast.forecastday[l].date.day + "/" + data.forecast.simpleforecast.forecastday[l].date.year);
				dataForecastSky[l] = (data.forecast.simpleforecast.forecastday[l].conditions);
			}
			
			for(var l=0; l<m; l++){
				if(l>0){
					if(data.history.observations[n].tempi.substring(0,1) == data.history.observations[n-1].tempi.substring(0,1) {
						m++;
						n++;
					}
				}
				dataHistorical[l] = (data.history.observations[n].tempi);
				labelsHistorical[l] = (data.history.observations[n].date.hour + ":" + data.history.observations[n].date.min);
				dataHistoricalSky[l] = (data.history.observations[n].conds);
				dataHistoricalPre[l] = (data.history.observations[n].pressurei) + 'inHg';
				dataHistoricalHum[l] = (data.history.observations[n].hum) + '%';
				dataHistoricalVis[l] = (data.history.observations[n].vism) + 'mi';		

				n++
			}
			
			toHTMLForecast = "<table width=100%><tr><th width=10%>Date:</th>";
			for(var l=0; l<10; l++) toHTMLForecast = toHTMLForecast + "<th width=9%>" + labelsForecast[l] + "</th>";
			toHTMLForecast = toHTMLForecast + "</tr><tr><th width=10%>Tmp:</th>";
			for(var l=0; l<10; l++) toHTMLForecast = toHTMLForecast + "<td width=9%>" + dataForecast[l] + "&#8457;</td>";
			toHTMLForecast = toHTMLForecast + "</tr><tr><th width=10%>Sky:</th>";
			for(var l=0; l<10; l++) toHTMLForecast = toHTMLForecast + "<td width=9%>" + dataForecastSky[l] + "</td>";
			toHTMLForecast = toHTMLForecast + "</tr></table>";
			
			toHTMLHistorical = "<table width=100%><tr><th width=4%>Time:</th>";
			for(var l=0; l<12; l++) toHTMLHistorical = toHTMLHistorical + "<th width=8%>" + labelsHistorical[l] + "</th>";
			toHTMLHistorical = toHTMLHistorical + "</tr><tr><th width=4%>Tmp:</th>";
			for(var l=0; l<12; l++) toHTMLHistorical = toHTMLHistorical + "<td width=8%>" + dataHistorical[l] + "&#8457;</td>";
			toHTMLHistorical = toHTMLHistorical + "</tr><tr><th width=4%>Sky:</th>";
			for(var l=0; l<12; l++) toHTMLHistorical = toHTMLHistorical + "<td width=8%>" + dataHistoricalSky[l] + "</td>";
			toHTMLHistorical = toHTMLHistorical + "</tr><tr><th width=4%>Pres:</th>";
			for(var l=0; l<12; l++) toHTMLHistorical = toHTMLHistorical + "<td width=8%>" + dataHistoricalPre[l] + "</td>";
			toHTMLHistorical = toHTMLHistorical + "</tr><tr><th width=4%>Hum:</th>";
			for(var l=0; l<12; l++) toHTMLHistorical = toHTMLHistorical + "<td width=8%>" + dataHistoricalHum[l] + "</td>"; 
			toHTMLHistorical = toHTMLHistorical + "</tr><tr><th width=4%>Visb:</th>";
			for(var l=0; l<12; l++) toHTMLHistorical = toHTMLHistorical + "<td width=8%>" + dataHistoricalVis[l] + "</td>";
			toHTMLHistorical = toHTMLHistorical + "</tr></table>";
			
			toHTMLHistorical = toHTMLHistorical + "<br><table width=100%><tr><th width=4%>Time:</th>";
			for(var l=12; l<24; l++) toHTMLHistorical = toHTMLHistorical + "<th width=8%>" + labelsHistorical[l] + "</th>";
			toHTMLHistorical = toHTMLHistorical + "</tr><tr><th width=4%>Tmp:</th>";
			for(var l=12; l<24; l++) toHTMLHistorical = toHTMLHistorical + "<td width=8%>" + dataHistorical[l] + "&#8457;</td>";
			toHTMLHistorical = toHTMLHistorical + "</tr><tr><th width=4%>Sky:</th>";
			for(var l=12; l<24; l++) toHTMLHistorical = toHTMLHistorical + "<td width=8%>" + dataHistoricalSky[l] + "</td>";
			toHTMLHistorical = toHTMLHistorical + "</tr><tr><th width=4%>Pres:</th>";
			for(var l=12; l<24; l++) toHTMLHistorical = toHTMLHistorical + "<td width=8%>" + dataHistoricalPre[l] + "</td>";
			toHTMLHistorical = toHTMLHistorical + "</tr><tr><th width=4%>Hum:</th>";
			for(var l=12; l<24; l++) toHTMLHistorical = toHTMLHistorical + "<td width=8%>" + dataHistoricalHum[l] + "</td>"; 
			toHTMLHistorical = toHTMLHistorical + "</tr><tr><th width=4%>Visb:</th>";
			for(var l=12; l<24; l++) toHTMLHistorical = toHTMLHistorical + "<td>" + dataHistoricalVis[l] + "</td>";
			toHTMLHistorical = toHTMLHistorical + "</tr></table>";
			
			document.getElementById("dataTableForecast").innerHTML = toHTMLForecast;
			document.getElementById("dataTableHistorical").innerHTML = toHTMLHistorical;
			
			foreMax = (Math.round(Math.max.apply(Math, dataForecast)/2) * 2) + 2;
			foreMin = (Math.round(Math.min.apply(Math, dataForecast)/2) * 2) - 2;
				
			histMax = (Math.round(Math.max.apply(Math, dataHistorical)/2) * 2) + 2;
			histMin = (Math.round(Math.min.apply(Math, dataHistorical)/2) * 2) - 2;
			
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