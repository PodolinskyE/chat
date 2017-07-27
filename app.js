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
var index = require('routes/index');
var services = require('routes/services');
var users = require('routes/users');

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
app.set('port', config.get('port'));

// view engine setup
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'pug');


// после применения webpack-a поменять в конфиге на [folder with bundled files]
var publicFolder = config.get('publicFolder');
app.use(favicon(path.join(__dirname, publicFolder, 'images', 'favicon.ico')));
//app.use(logger('dev'));
app.use(logger( 'dev', {immediate : true} ));
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser('secret'));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, publicFolder)));



/*
app.get('/', function ( req, res, next ) {
	res.render('index', {title : 'my title as parameter', developer : 'kakt00z'});
});
*/


app.use('/', index);
app.use('/users', users);




/******************************** moddlewares ***************************************/
/*
app.use(function ( req, res, next ) {
	if ( req.url == '/' ) {
		res.end('Hello');
	} else {
		next();
	}
});

app.use(function ( req, res, next ) {
	if ( req.url == '/forbidden' ) {
		// res.send(401);
		next(new Error('woops, denied!'));
	} else {
		next();
	}
});

app.use(function ( req, res ) {
	res.send(404, 'Page not found!');
});
*/



/***************************** error handlers ***************************************/
// error handlers
/*
app.use(function (err, req, res, next ) {
	var env = app.get('env');
	if ( env == 'development' ) {
	} else {
	}
});
*/


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
/*
function normalizePort(val) {
	var port = parseInt(val, 10);
	if (isNaN(port)) { // named pipe
		return val;
	};
	if (port >= 0) { // port number
		return port;
	}
	return false;
}
*/





var server = http.createServer(app);
server.listen(config.get('port'), function () {
	log.info('listening on port ' + config.get('port'));
});