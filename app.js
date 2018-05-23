let express = require('express');
let path = require('path');
let logger = require('morgan');
let bodyParser = require('body-parser');
let routes = require('./routes');
let app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use(function(req, res, next) {
    var err = new Error('X');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send('error'+err.message);
});

module.exports = app;
