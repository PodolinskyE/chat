var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', {title : 'my title as parameter', developer : 'kakt00z'});
});

module.exports = router;
