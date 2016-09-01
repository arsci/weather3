var express = require('express');
var request = require('request');

var app = express();
app.set('port', process.env.PORT || 5000);
app.use(express.static('public'));

var weather_host = "http://api.wunderground.com/api/d95017df2847b211";

function weatherAPI(path, done) {
    var url = weather_host + path;
    console.log(url);
    request({
        url: url,
        method: "GET",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Accept": "application/json"
        },
    }, function(err, req, data) {
        if (err) {
            done(err);
        } else {
            if (req.statusCode >= 200 && req.statusCode < 400) {
                try {
                    done(null, JSON.parse(data));
                } catch(e) {
                    console.log(e);
                    done(e);
                }
            } else {
                console.log(err);
                done({ message: req.statusCode, data: data });
            }
        }
    });
}

app.get('/api/weather', function(req, res) {
	//var day = req.param('date');
  	//var zipcode = req.param('zip');	
  	//res.redirect("/");
  	
    	weatherAPI("/history_" + "20160825" + "/q/" + "94523" + ".json", function(err, result) {
        if (err) {
        	console.log(err);
            res.send(err).status(400);
        } else {
        	console.log("10 days Forecast");
            res.json(result);
        }
    });
});

app.listen(app.get('port'), function () {
	console.log('Express server listening on port ' + app.get('port'));
});
