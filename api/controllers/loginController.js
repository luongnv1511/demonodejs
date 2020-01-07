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
    var sqlq = `SELECT * 
                FROM Users;`;
    mysqlConnection.query(sqlq, (err, rows, fields) => {
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
    var sqlq = `SELECT * 
                FROM Users 
                WHERE username = '${username}' and password = '${password}';`;
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
    var sqlq = `SELECT * 
                FROM Tasks as t, Users as u
                WHERE u.username = '${username}' and u.id = t.userid;`;
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