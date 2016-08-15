var express = require('express');
var bodyParser = require('body-parser');
var pg = require('pg');
var app = express();
app.set('port', process.env.PORT || 5000);
app.use(express.static('public'));
app.use(bodyParser.json());
app.get('/update', function(req, res) {
	pg.connect(process.env.DATABASE_URL, function (err, conn, done) {
		conn.query('SELECT * FROM salesforce.sensorData__c ORDER BY id DESC LIMIT 20',
			function(err, result) {
				done();
				if (err) {
					res.status(400).json({error: err.message});
				}
				else {
					res.json(result);
				}
			}
		);
	});
});
app.listen(app.get('port'), function () {
	console.log('Express server listening on port ' + app.get('port'));
});