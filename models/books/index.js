// books

var config = require('config').get('databaseConfig');
var pgp = require("pg-promise")(config.initOptions);



function Books ( options ) {
	options = options || Object.create(null);
	
	var book = this;
	book.schema = config.schema;
	book.table = options.table || "books";
	book.sql = options.sql || Object.create(null);
	
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
	var book = this;
	var db = pgp( book.databaseConnectionString );
	
	book.sql.text = book.sql.text || " SELECT * FROM " + book.schema + "." + book.table;
	
	db.one( book.sql.text, book.sql.values )
		.then( function (data) {
			/*
				var count = 0, pages = 0;
				if ( result.rows.length ) {
					count = result.rows[0].ct;
					pages = Math.ceil( count / sql.rows );
					result.rows[0].page ? sql.page = result.rows[0].page + '' : '';
				} else {
					sql.page = '0';
				};
				
				var json = {
					page: sql.page,
					pages: pages, //дублирование для совместимости с чем?
					total: pages,
					records: count,
					rows: result.rows,
					userdata: crudp
				};
				res.status(200).json(json);
				// res.status(200).json([true, 'Успешно отредактировано', result.rows.length && result.rows[0].id ]);
			*/
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



module.exports = Books