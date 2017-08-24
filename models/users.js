// books

var config = require('config').get('databaseConfig');
// var pgp = require("pg-promise")(config.initOptions);



function Users ( options ) {
	options = options || Object.create(null);
	
	var user = this;
	user.schema = config.schema;
	user.table = options.table || "users";
	user.sql = options.sql || Object.create(null);
	
	// 'postgres://localhost:5432/hello_phonebook'
	// 'postgres://admin:qwe123@localhost:5432/hello_phonebook'
	var connstr = 
		"postgres" + "://" +
		config.login + ":" +
		config.password + "@" +
		config.host + ":" +
		config.port + "/" +
		config.database;
	this.databaseConnectionString = connstr;
};


Books.prototype.create = function () {
};

Books.prototype.read = function () {
	var user = this;
	var db = pgp( user.databaseConnectionString );
	
	user.sql.text = user.sql.text || " SELECT * FROM " + user.schema + "." + user.table;
	
	db.one( user.sql.text, user.sql.values )
		.then( function (data) {
			console.log( "result : ", JSON.stringify( data ) );
		})
		.catch(function (error) {
			console.log("ERROR:", error);
		});
};

Books.prototype.update = function () {
};

Books.prototype.delete = function () {
};



module.exports = Users
