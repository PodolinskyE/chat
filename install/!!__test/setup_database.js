const pg = require('pg');

const config = require("../settings/settings.json");
var initDbData = config.initDbData;
/*
var initDbData = {
		"login": "postgres",
		"password": "qwe123",
		"domain": "localhost",
		"port": 5432,
		"dbName": "postgres"
};

var dbData = {
	"login": "hello_phonebook_user",
	"password": "admin",
	"domain": "localhost",
	"port": 5432,
	"dbName": "hello_phonebook"
};
*/

var connstr = "postgres://"
	+ initDbData.login
	+ ":" + initDbData.password
	+ "@" + initDbData.domain
	+ ":" + initDbData.port
	+ "/" + initDbData.dbName
	;

const connectionString = process.env.DATABASE_URL || connstr;
const pgClient = new pg.Client(connectionString);
pgClient.connect();

	/*
	//var qstring = "SELECT * FROM pg_roles WHERE rolname = '" + dbData.login + "';";
	var qstring = "CREATE USER " + dbData.login + " WITH password '" + dbData.password + "'";
	const query = pgClient.query( qstring );
	query.on('end', function(){ pgClient.end(); });
	*/


(function initializeDatabase(){
	var dbData = config.dbData;

	checkUser(pgClient);

		
	function checkUser(pgClient){
		var qstring = "SELECT * FROM pg_roles WHERE rolname = '" + dbData.login + "';";
		pgClient.query(qstring, function (err, res){
			if(err) { console.log("Не смог выбрать FROM pg_roles..."); throw err; };
			if(res.rowCount == 0){ createUser(pgClient); }
			else{ console.log("User " + dbData.login + " is already present."); checkDatabase(pgClient)}
		});
	};
	
	function createUser(pgClient){
		var qstring = 
			"CREATE USER " + dbData.login +
			" WITH password '" + dbData.password + "';"
			//+ "COMMENT ON ROLE " + dbData.dbName
			//+ "IS " + "'hello_phonebook study project user';"
			;
		pgClient.query(qstring, function (err){ 
			if(err){ console.log("Не смог создать usera..."); throw err; }
			console.log("User " + dbData.login + " was created.");

			checkDatabase(pgClient);
		});
	};
	
	
	function checkDatabase(pgClient){
		var qstring = "SELECT * FROM pg_database WHERE datname = '" + dbData.dbName + "'";
		pgClient.query(qstring, function (err, res){
			if(err) { console.log("Не смог выбрать FROM pg_database..."); throw err; };
			if(res.rowCount == 0){ createDatabase(pgClient); }
			else{ console.log("DATABASE " + dbData.dbName + " already present."); grantRules(pgClient);};
		});
	};
	
	function createDatabase(pgClient){
		var qstring =
			"CREATE DATABASE " + dbData.dbName + " " +
			"WITH OWNER = " + dbData.login + " " +
			"ENCODING = " + "'UTF8';"
			//+ "COMMENT ON DATABASE " + dbData.dbName +
			//+ "IS " + "'hello_phonebook study project database';"
		;
		pgClient.query(qstring, function (err){ 
			if(err){ console.log("Не смог создать базу..."); throw err; }
			console.log("DATABASE " + dbData.dbName + " was created.");
			grantRules(pgClient);
		});
	};
	
	
	function grantRules(pgClient) {
		var qstring = "GRANT ALL privileges ON DATABASE " + dbData.dbName + " TO  " + dbData.login + ";";
		pgClient.query(qstring, function (err){ 
			if(err){ console.log("Не могу наделить правами юзера..."); throw err; }
			console.log("permissions granted");
			endClient();
		});
	}
	
	function endClient(next){
		pgClient.end(function (err){ 
				if (err) { console.log("Ошибка в завершении соединения..."); throw err; }
				console.log("connection closed, database initialize done...");
				if (next) next();
			});
	}

})();

