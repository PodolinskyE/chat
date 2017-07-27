const pg = require('pg');

const config = require("../settings/settings.json");
var dbData = config.dbData;


var connstr = "postgres://"
	+ dbData.login
	+ ":" + dbData.password
	+ "@" + dbData.domain
	+ ":" + dbData.port
	+ "/" + dbData.dbName
	;


const connectionString = process.env.DATABASE_URL || connstr;
const db = new pg.Client(connectionString);
db.connect();


(function add1Record(){
	var tbl = config.dbTable;
	var data = {
		"name" : "name1",
		"phone" : "phone1",
		"birthdate" : '09.08.2015',
		"home_address" : "home_address1"
	};


	add1RecordRun();



	function add1RecordRun(){
		db.query('INSERT INTO '+tbl.schema+'.'+tbl.name+'(name, phone, birthdate, home_address) values($1, $2, $3, $4)',
    	[data.name, data.phone, data.birthdate, data.home_address]
    	);
	};

})();

