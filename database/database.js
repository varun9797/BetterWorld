
var pg = require('pg');
var conString = "postgres://wsrrbjocaymlos:956d67da3f6a4ad9d4e26feb07c9513dde47284edb0a9cebe6c7e75fa36ad56c@ec2-54-83-27-165.compute-1.amazonaws.com:5432/dah42qg107lb3c";

var connection = new pg.Client(conString);
connection.connect();

/*var mysql = require('mysql');

var connection = mysql.createPool({
    connectionLimit: 100,
    host:'ec2-54-83-27-165.compute-1.amazonaws.com',
    user:'wsrrbjocaymlos',
    password:'956d67da3f6a4ad9d4e26feb07c9513dde47284edb0a9cebe6c7e75fa36ad56c',
    database:'dah42qg107lb3c',
    port: 5432,
    debug: false,
    multipleStatements: true
});*/

module.exports.connection = connection;