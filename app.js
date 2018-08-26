/*
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
*/



// routers
/*
var index = require('routes/index');
var services = require('routes/services');
var users = require('routes/users');
var models = require('routes/models');
*/

// middleWares
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// system
var express = require('express');
var http = require('http');
var path = require('path');
var config = require('config');
var log = require('libs/log')(module);



var app = express();


// после применения webpack-a поменять в конфиге на [folder with bundled files]
app.use(favicon(path.join(__dirname, config.get('rendered'), 'img', 'favicon.ico')));

//app.use(logger('dev'));
app.use(logger( 'dev', {immediate : true} ));




// get all data/stuff of the body (POST) parameters
// parse application/json 
app.use(bodyParser.json());
// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser('secret'));
app.use(cookieParser());



// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, config.get('rendered'))));


app.use(function ( req, res, next ) {
	if ( req.url == '/forbidden' ) {
		// res.send(401);
		next(new Error('woops, denied!'));
	} else {
		next();
	}
});


app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};
	// res.locals.error = (config.get('runMode') === 'development') ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});





/************************************************************************************/

function normalizePort(val) {
	var port = parseInt(val, 10);
	return isNaN( port ) ? val : ( port >= 0 ) ? port : false;
}



var server = http.createServer(app);
server.listen(config.get('port'), function () {
	console.log('\n');
	var arrdess = this.address();
	var host = arrdess.address === "::" ? 'localhost' : arrdess.address;
	log.info('Node server listening on ' + host + ':' + arrdess.port );
});