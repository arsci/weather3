function pageLoadDefault(){			
	
	var urlAPI = "/api/weather";
		$.ajax({
		type: 'GET',
		url: urlAPI,
		success: function(data) {	
	
		var a = "<table>";
		
		for (var i=0; i<25; i++){
		
			a += "<tr><td>" + data.history.observations[i].date.hour + ":" + data.history.observations[i].date.min;
			a += "</td><td>" + data.history.observations[i].tempi + "</td><td>" + data.history.observations[i].conds;
			a += "</td></tr>";
		
		}
		
		a += "</table>";
		
		document.getElementById("outputdata").innerHTML = a;
		
		}
	})
}		
