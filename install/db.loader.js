/** load file into postgreSQL
* psql.exe must be in enviroment path
* @param {object} pgo - options for psql.exe - 
* {host: '127.0.0.1', port: 5432, user: 'postgres', db: null, file: null, echo: false, quiet: false}
* @param {object} pro - psql proccess options
*  { cwd: null // {string} - current working directory of the child process
*	, env: null // {object} - environment key-value pairs
*	, encoding: null //{string} (Default: 'utf8')
* }
* { cwd: null }
*/



module.exports = function dbLoaderSync( pgo, pro ) {
	
	var exec = require('child_process').exec //run and retrieve child process
	, colorer = require('colors')
	, _extend = function _extendDefaults( defaults, options ){ //
			if (( !options ) || ( typeof options != 'object' )) {
				return defaults;
			}

			for ( var property in defaults ){ 
				if ( !options.hasOwnProperty( property ) ) continue;
				defaults[property] = options[property];
			}

		return defaults;
	};

	var _pgo = { 
			host: '127.0.0.1'
		, port: 5432
		, user: 'postgres'
		, 'no-password' : true
		, db: null
		, file: null
		, echo: false 
		, quiet: false 
	}; 

	_pgo = _extend( _pgo, pgo ); //psql options  

	// accessor for options
	var fnPgOptions = function pgoAccessor( key, value ) {
		if ( key ) {
			if ( typeof key =='object' ) {
				_pgo = _extend( _pgo, key );
				return this;
			};
			
			if ( _pgo.hasOwnProperty( key ) ) {
				//getter
				if ( value === undefined ) {
					return _pgo[key];
				}
			}
			//else - setter return it self
			_pgo[ key ] = value;
			return this;
		};
		// return whole options 
		return _pgo;
	};


	/*proccess defaults*/
	var _pro = { 
		cwd: null // {string} - current working directory of the child process
		, env: null // Object Environment key-value pairs
		, encoding: null //String (Default: 'utf8')
	}; 
	_pro = _extend( _pro, pro ); //child_proccess options
	
	var fnProcOptions = function procoAccessor( key, value ){

		if ( key === undefined ){ //return all
			var obj = {};
			for (var p in _pro){ 
				if ( !_pro.hasOwnProperty(p) ) continue;
				if ( !_pro[p] ) continue; //supress empty values
				obj[p] = _pro[p];
			}
			return obj; 
		}

		// set few options at once 
		if ( typeof key == 'object' ){
			_pro = _extend( _pro, key );
			return this;
		}

		if ( !_pro.hasOwnProperty( key ) ) return '';
		// getter
		if ( value === undefined ) return _pro[key];

		//setter
		_pro[key] = value; return this;

	};



	/** build psql command line options array
	* @param {object} args - options { host:, port:, user:, db:, file:, echo: }
	* @return {array}
	*/

	var fnCmd = function cmdExecute( opts ) {
		
		// process.platform
		var cmd;
		if ( process.platform == "linux" ) {
			cmd = ['sudo -u postgres psql'];
		} else {
			cmd = ['psql'];
		};
		
		/**Translate options to command line keys*/
		var translator = {
			'user': 'username',
			'db': 'dbname',
			'echo': 'echo-all'
		};
		
		var append = function( key, value ) {
			var tkey = ( translator.hasOwnProperty(key) ) ? translator[key] : key;
			var param = '';
			if ( value ) {
				param = '--' + tkey;
				
				if ( !~["quiet", "no-password", "password"].indexOf(key) ) {
					param += '=' + value;
				}
				cmd.push( param );
			};
			return;
		};
		
		for ( var i in opts ) {
			if ( !opts.hasOwnProperty(i) ) continue;
			append( i, opts[i] );
		}
		return cmd.join(' ');
	};

	/** import file ( with sql commands ) into postgres */
	var fnLoad = function( file, cb ) {
		var options = fnPgOptions();
		var procoptions = fnProcOptions();
		options.file = file;
		var cmd = fnCmd( options );
		console.log( colorer.gray( cmd ) );
		exec(cmd, procoptions, cb);
	};

	return {
		pgoptions: fnPgOptions,
		prcoptions: fnProcOptions,
		cmd: fnCmd, //for test purpose
		load: fnLoad
	};
};
