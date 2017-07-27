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


(function initializeTable(){
	var dbTable = config.dbTable;
	checkSchema(db);


	function checkSchema(db){
		var qstring = "select oid from pg_catalog.pg_namespace where nspname='" + dbTable.schema + "';";
		//console.log(qstring);
		db.query(qstring, function (err, res){
			if(err) { console.log("Не смог выбрать " + qstring + " ..."); throw err; };
			//console.log(res);
			if(res.rowCount == 0){ createSchema(db); }
			else{ console.log("Schema " + dbTable.schema + " is already present."); checkTable(db);};
		});
	};


	function createSchema(db){
		var qstring = "CREATE SCHEMA " + dbTable.schema + " AUTHORIZATION " + dbData.login + ";"
		db.query(qstring, function (err, res){
			if(err) { console.log("Не смог создать " + qstring + " ..."); throw err; };
			console.log("SCHEMA " + dbTable.schema + " was created.");
			checkTable(db);
		});
	};




	function checkTable(db){
		var qstring = "SELECT * FROM pg_tables WHERE tablename = '" + dbTable.name + "';";
		//var qstring = "select '" + dbTable.name + "' from pg_catalog.pg_namespace where nspname='" + dbTable.schema + "';";
		//var qstring = "SELECT * FROM " + dbTable.schema + ".pg_tables WHERE tablename = '" + dbTable.name + "';";

		//console.log(qstring);
		db.query(qstring, function (err, res){
			if(err) { console.log("Не смог выбрать " + qstring + " ..."); throw err; };
			//console.log(res);
			if(res.rowCount == 0){ createTable(db); }
			else{ console.log("Table " + dbTable.name + " is already present."); endClient();};
		});
	};



	function createTable(db){


		//var qstring = "CREATE SEQUENCE " + dbTable.schema + "." + dbTable.sequence + " INCREMENT 1 MINVALUE 1;";
		var qstring = "CREATE SEQUENCE " + dbTable.schema + "." + dbTable.sequence + " START 1;";
		//var qstring = "CREATE SEQUENCE main.asdf START 101;";


		db.query(qstring, function(err, res){
			if(err){ console.log("Не смог создать SEQUENCE..."); throw err; }
			var qstring = ''
				+ "CREATE TABLE " + dbTable.schema + "." + dbTable.name + " "
				+ "(id INTEGER  NOT NULL DEFAULT nextval('" + dbTable.schema + "." + dbTable.sequence + "'), "
				+ "name VARCHAR(40) NOT NULL, "
				+ "phone VARCHAR(25) NOT NULL, "
				+ "birthdate DATE NOT NULL, "
				+ "home_address VARCHAR(60) NOT NULL, "
				+ "organization_name VARCHAR(20), "
				+ "organization_address VARCHAR(20), "
				+ "PRIMARY KEY (id)"
				+ ");";
			//console.log(qstring);
			db.query(qstring, function(err, res){
				if(err) { console.log("Не смог создать TABLE ..."); throw err; };
				console.log("TABLE " + dbTable.name + " was created...");
				endClient();
			});
		});
	};

	function endClient(next){
	db.end(function (err){ 
			if (err) { console.log("Ошибка в завершении соединения..."); throw err; }
			console.log("connection closed, table initialize done...");
			if (next) next();
		});
	};

})();

