var settings = require('./settings');
var mongodb = require('mongodb');
var Server = new mongodb.Server(settings.hosts, settings.ports,{safe:true});

module.exports = new mongodb.Db(settings.db, Server, {safe: true});


// var  mongodb = require('mongodb');
// var  server  = new mongodb.Server('localhost', 27017, {auto_reconnect:true});
// module.exports = new mongodb.Db('mydb', server, {safe:true});