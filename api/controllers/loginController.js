const mysql = require('mysql');
const express = require('express');

var mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345678",
    port: "3306",
    database: "User"
});

mysqlConnection.connect((err) => {
    if (!err) {
        console.log('Connection successfully');
    } else
        console.log('Connection failed!' + JSON.stringify(err, undefined, 2));
});

exports.getUser = function(req, res) {
    mysqlConnection.query('SELECT * FROM Users;', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    });
};

exports.login = function(req, res) {
    if (!req.body.username || !req.body.password) {
        res.send('Login failed');
        return;
    }
    var username = req.body.username;
    var password = req.body.password;
    // var sqlq = 'SELECT * FROM Users WHERE username = "' + username + '" and password = "' + password + '";';
    mysqlConnection.query(sqlq, (err, rows, fields) => {
        if (!err) {
            if (rows.length > 0) {
                res.send('Login Success');
            } else {
                res.send('Login failed');
            }
        } else
            console.log(err);
    });
};
exports.getTasks = function(req, res) {
    if (!req.body.username || !req.body.password) {
        res.send('Login failed');
        return;
    }
    var username = req.body.username;
    var password = req.body.password;
    // var sqlq = 'SELECT * FROM Users WHERE username = "' + username + '" and password = "' + password + '";';
    var sqlq = fs.readFile('../../sqlscript/getUsers.sql', function(err, data) {
        return data;
    });
    mysqlConnection.query(sqlq, (err, rows, fields) => {
        if (!err) {
            if (rows.length > 0) {
                res.send('Login Success');
            } else {
                res.send('Login failed');
            }
        } else
            console.log(err);
    });
};