// models/index.js

var log = require('libs/log')(module);


/** @module lib/models/models */

var links = {
	
	books					: './books'
	
	/*
	index: require('./index'),
	search: require('./search'),
	dall: require('./docs/dall'),
	dinc: require('./docs/dinc'),
	dout: require('./docs/dout'),
	dins: require('./docs/dins'),
	dapl: require('./docs/dapl'),
	dprelost: require('./docs/dprelost'),
	dlost: require('./docs/dlost'),
	dprearch: require('./docs/dprearch'),
	donctrl: require('./docs/donctrl'),
	dcontrol: require('./docs/dcontrol'),
	
	dreview: require('./docs/dreview'),
	dagreed: require('./docs/dagreed'),
	dmeet: require('./docs/dmeet'),
	dapprove: require('./docs/dapprove'),
	
	dsearch: require('./docs/dsearch'),
	fullTextSearch: require('./docs/fullTextSearch'),
	
	tdoc: require('./directories/tdoc'),
	passport: require('./directories/passport'),
	citizen: require('./directories/citizen'),
	org: require('./directories/org'),
	nmncl: require('./directories/nmncl'),
	article: require('./directories/article'),
	repres: require('./directories/repres'),
	unit: require('./directories/unit'),
	resrev: require('./directories/resrev'),
	priv: require('./directories/priv'),
	staff: require('./directories/staff'),
	post: require('./directories/post'),
	filter: require('./directories/filter'),
	term: require('./directories/term'),
	peoplestatus: require('./directories/peoplestatus'),
	theme: require('./directories/theme'),
	ctrl: require('./directories/ctrl'),
	period: require('./directories/period'),
	// from cache, binder ignored
	// binder: require('./directories/binder'),
	ate: require('./directories/ate'),
	emp: require('./directories/emp'),
	delivery: require('./directories/delivery'),
	atepopulation: require('./directories/atepopulation'),
	tquest: require('./directories/tquest'),
	numerators: require('./directories/numerators'),
	te: require('./directories/te'),
	serial: require('./directories/serial'),
	transfer: require('./directories/transfer'),
	docstatus: require('./directories/docstatus'),
	phase: require('./directories/phase'),
	statustotransit: require('./directories/statustotransit'),
	docroute: require('./directories/docroute'),
	
	users: require('./settings/users'),
	roles: require('./settings/roles'),
	perks: require('./settings/perks'),	
	settings: require('./settings/settings'),
	audit: require('./settings/audit'),
	auditevents: require('./settings/auditevents'),
	systemSettings: require('./settings/systemSettings'),
	
	select2: require('./select2'),
	login: require('./login'),
	sql: require('./sql'),
	reports: require('./reports'),
	
	fromwh: require('./fromwh'),
	forwh: require('./forwh'),
	links: require('./links'),
	files: require('./files'),
	jobs: require('./jobs'),
	jobsFiles: require('./jobsFiles'),
	execs: require('./execs'),
	
	addr: require('./addr'),
	mail: require('./smdo/mail'),	
	msg: require('./smdo/msg'),	
	seq: require('./seq'),
	smddir:require('./smdo/smddir'),
	tdocsToEmps: require('./settings/tdocsToEmps'),
	jobsPersonal: require('./jobsPersonal'),
	jobsPersonalFiles: require('./jobsPersonalFiles'),
	jobsExecsFiles: require('./jobsExecsFiles'),
	jobsreviewbig: require('./jobsreviewbig'),
	
	abonents: require('./abonents'),
	
	reviewPhase: require('./route/reviewPhase'),
	agreedPhase: require('./route/agreedPhase'),
	meetPhase: require('./route/meetPhase'),
	approvePhase: require('./route/approvePhase'),
	template: require('./template'),
	djobsonexec: require('./docs/djobsonexec'),
	scan: require('./scan/scan'),
	scanFileGrid: require('./scan/scanFileGrid'),
	
	numeratorstype: require('./directories/numeratorstype'),
	numeratorssettings: require('./directories/numeratorssettings'),
	
	barcode: require('./barcode'),
	incmail: require('./utils/incmail')
	*/
};


var methodgen = function( methodname ) {
	function getModel ( req, res, next ) {
		var modelName = req.params.model;
		var link = links[ modelName ];
		if ( link ) {
			var model = require( link );
			model[ methodname ]( req, res, next );
		} else {
			var errStr = 'missed model ' + modelName + ' in models';
			var err = new Error( errStr );
			log.info(errStr);
			next(err);
		}
	}
};


var models = Object.create(null);
models.create = methodgen('create');
models.read = methodgen('read');
models.update = methodgen('update');
models.delete = methodgen('delete');
// models.restore = methodgen('restore');
models.services = methodgen('services');

module.exports = models; 