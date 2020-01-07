// khoi tao const de  su dung duoc cac lenh ma mysql cung cap cho node
const mysql = require('mysql');

const LocalStrategy = require('passport-local').Strategy;

const cookieSession = require('cookie-session');

const bodyParser = require('body-parser');

// khoi tao express
const express = require('express');

// khoi tao connection voi database local
var mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345678",
    port: "3306",
    database: "User"
});

app.use(cookieSession({
    name: 'mysession',
    keys: ['vueauthrandomkey'],
    maxAge: 24 * 60 * 60 * 1000 // cai nay co tac dung trong 24h
}))

// check connection voi mysql
mysqlConnection.connect((err) => {
    if (!err) {
        console.log('Connection successfully');
    } else
        console.log('Connection failed!' + JSON.stringify(err, undefined, 2));
});

// ham lay tat ca cac user
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

// ham login cho account
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

// ham get het tat cua user do
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