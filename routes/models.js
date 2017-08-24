var express = require('express');
var router = express.Router();
var models = require('models');

/* GET models listing. */





router.get( '/:model.:format/:id?', function () {
	debugger
	models.read();
});


router.post( '/:model.:format/read/:id?', function () {
	debugger
	models.read();
});

router.get ('/', function(req, res, next) {
	// var m = new Model();
	debugger
	//res.send('respond with a model');
	next();
});

router.get ('*', function(req, res, next) {
	// var m = new Model();
	debugger
	res.send('respond with a model');
});

module.exports = router;
