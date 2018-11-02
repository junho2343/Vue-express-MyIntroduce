let express = require('express');
let router = express.Router();

const fs = require('fs')


/* GET home page. */
router.get('/', function(req, res, next) {
});
router.get('/get', function(req, res, next) {

	fs.readFile("data.json", function (err, data) {
		if(err) throw err;
		res.send(data)

	})
});
router.post('/set', function(req, res, next) {
	let data = JSON.stringify(req.body);

	fs.writeFile('data.json', data, 'utf8', function (err) {
		if(err) throw err
	})
});

module.exports = router;
