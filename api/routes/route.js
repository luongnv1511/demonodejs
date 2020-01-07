var bodyParser = require('body-parser');
var loginController = require('../controllers/loginController');
var fs = require('fs');

module.exports = function(app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.route('/users')
        .get(function(req, res) {
            // res.setHeader('Access-Control-Allow-Origin', '*');
            // res.json(req.body);
            loginController.getUser(req, res);
        })
        .post(function(req, res) {
            loginController.login(req, res);
        });

    app.route('/tasks')
        .post(function(req, res) {
            loginController.getTasks(req, res);
        });
}