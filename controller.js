'use strict';

var response = require('./res');
var connection = require('./conn');

exports.users = function(req, res) {
    connection.query('SELECT * FROM user', function (error, rows, fields){
        if(error){
            // console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};

exports.index = function(req, res) {
    response.ok("Hello from the Node JS RESTful side!", res)
};

exports.findUsers = function(req, res) {
    
    var userId = req.params.userId;

    connection.query('SELECT * FROM user where id = ?',
    [ userId ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};

exports.createUsers = function(req, res) {

    var firstName = req.body.firstName;
    var lastName = req.body.lastName;

	const jwt = require('jsonwebtoken');
	const token = jwt.sign({ firstName: firstName, lastName: lastName}, 'mafmudin');

    connection.query('INSERT INTO user (firstName, lastName, token) values (?,?,?)',
    [ firstName, lastName, token ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
            response.failed(error.sqlMessage, res)
        } else{
            response.ok("Berhasil menambahkan user!", res)
        }
    });
};

exports.updateUsers = function(req, res) {
    
    var userId = req.body.userId;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;

    connection.query('UPDATE user SET firstName = ?, lastName = ? WHERE id = ?',
    [ firstName, lastName, userId ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Berhasil merubah user!", res)
        }
    });
};

exports.deleteUsers = function(req, res) {
    
    var userId = req.body.userId;

    connection.query('DELETE FROM user WHERE id = ?',
    [ userId ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Berhasil menghapus user!", res)
        }
    });
};	