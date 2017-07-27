

var colorer = require('colors'); //extend String.prototype
var path = require('path');
var Loader = require('./db.loader'); //функции работы с базой
var loader = new Loader( { }, { cwd: __dirname });
var config = require('../config').get('databaseConfig');

loader.pgoptions({host: null, port: null, db: null, quiet: true, echo: false});




//  array of arrays [ text, color ]
var messagesColored = [
	
		['Установка СЭД \'DocNode\' на локальной машине', 'yellow']
	, ['PosgreSQL 9.4.4^ должен быть установлен.', 'gray']
	, ['Директория установки postgreSQL\\bin должна быть прописана в переменной PATH', 'gray']
	
	// , ['1. Создание системных ролей', 'white']
	// , ['2. Создание базы admin и инициализация структуры']
	// , ['3. Создание базы шаблона и инициализация структуры']
	// , ['4. Инициализация системных данных']
	, ['1. Создания базы приложения']
	, ['2. Заполнение тестовыми данными']

];

//  output message with selected or last color
var wcolor = ( function() {
	var prevColor = 'white'; //private member
	return function( text, color ) {
		text = '' + text; //convert to string
		color = color || prevColor;
		console.log( colorer[ color ](text) );
	};
})();

// вывод информации о действии шага
var message = function() {
	var msg = messagesColored.shift(); //colored text
	wcolor( msg[0], msg[1] || null );
};


// var absolutePath = function ( file ) { return '"' + path.resolve( __dirname, file ) + '"'; };

function logResult ( err, out, eout ) {
	console.log( colorer.gray( out ) );
	if (err) { console.log( colorer.red( eout ) ); }
};



function Installator () {
	var i = this;
	i.loader = loader;
	i.messagesColored = messagesColored;
	i.wcolor = wcolor;
	i.message = message;
	i.start();
};

Installator.prototype.start = function () {
	this.createRoles( function ( e, o, eo ) {
		logResult( e, o, eo );
		// this.message();
		// next();
		console.log('Install Completed!');
	});
};


Installator.prototype.createRoles = function ( cb ) {
	var file = "./sql/roles.dml";
	this.loader.load( file, cb );
	// return this;
};





new Installator();



/*
//  create application roles
var roles = function( cb ){

	var file = absolutePath( './lib/sql/roles.dml' );
	loader.pgoptions({host: null, port: null, db: null, quiet: true, echo: false});
	loader.load( file, cb );
};

function rolesAfter(e,o,eo){ w(e,o,eo); message(); dbAdmin( dbAdminAfter ); }

//  create admin db and init structure
var dbAdmin = function ( cb ){

	var file = absolutePath( './lib/sql/db.admin.ddl' );
	loader.load( file, cb );

};

function dbAdminAfter( e, o, eo ){ w(e,o,eo); message(); dbBlank( dbBlankAfter ); }

var dbBlank = function ( cb ) {
	// var file = absolutePath( './lib/sql/db.blank.ddl' );
	var filePath = './sql/db.blank.ddl';
	loader.load( null, file, cb );
};

function dbBlankAfter(e,o,eo){ w(e,o,eo); message();	dbBlankData( dbBlankDataAfter ); }


/// import system data for blank db
var dbBlankData = function ( cb ){

	var file = absolutePath( './lib/sql/db.blank.dml' );
	loader
		.pgoptions({ db:'blank', quiet:true, echo: false })
		.load( file, cb )
	;
};
function dbBlankDataAfter(e,o,eo){ w(e,o,eo); message(); dbSample( dbSampleAfter ); }

// create example db
var dbSample = function ( cb ){
	var file = absolutePath( './lib/sql/db.sample.ddl' );
	loader
		.pgoptions('db', null)
		.load( file, cb)
	;
};


function dbSampleAfter(e,o,eo){ w(e,o,eo); message(); dbSampleData( dbSampleDataAfter ); }

var dbSampleData = function ( cb ){
	var file = absolutePath( './lib/sql/db.sample.dml' );
	loader
		.pgoptions('db', 'dblank')
		.load( file, cb)
	;
};
function dbSampleDataAfter(e,o,eo){ w(e,o,eo); console.log('Install Completed!'); }

message(); // Install started
for ( var i = 1; i<3; i++ ){ message(); } // disclaimer

// sync executuion available only for version 0.12 or greater
message(); 
roles( rolesAfter );
*/



