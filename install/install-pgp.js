

var config = require('../config').get('databaseConfig');
var path = require('path');
var promise = require('bluebird');
var pgp = require("pg-promise")(config.initOptions);
// var User = require('../models/users');
// var async = require('async');

// 1. drop database
// 2. create & save 3 users
// 3. close connection




