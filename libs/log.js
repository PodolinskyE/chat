var winston = require('winston');
var ENV = process.env.NODE_ENV;

function getLogger( module ) {
	var path = module.filename.split('/').slice(-2).join('/');
	var logger = new winston.Logger({
		transports : [
			new winston.transports.Console({
				colorize : true,
				level : (ENV === 'development') ? 'debug' : 'error',
				label : path
			})
		]
	});
	return logger;
}

module.exports = getLogger;



	/*
	log.error('error 31-39 red');
	log.info('info 32-39 green');
	log.warn('warn 33-39 yellow');
	log.debug('debug 34-39 blue');
	log.silly('silly 35-39 pink');
	log.verbose('verbose 36-39 cyan');
	*/