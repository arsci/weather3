var express = require('express');
var request = require('request');
var cfenv = require('cfenv');

var app = express();
app.use(express.static(__dirname + '/public'));

function weatherAPI(path, qs, done) {
    var url = "http://api.wunderground.com/api/d95017df2847b211" + path;
    console.log(url, qs);
    request({
        url: url,
        method: "GET",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Accept": "application/json"
        },
        qs: qs
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
    	weatherAPI("/conditions/forecast10day/q/94105.json", {
        units: req.query.units || "e",
        language: req.query.language || "en"
    }, function(err, result) {
        if (err) {
        	console.log(err);
            res.send(err).status(400);
        } else {
        	console.log("10 days Forecast");
            res.json(result);
        }
    });
});

app.listen(appEnv.port, appEnv.bind, function() {
  console.log("server starting on " + appEnv.url);
});
