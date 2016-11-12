"use strict";

const express        = require('express');
const path           = require('path');
const config         = require('./config');
const bodyParser     = require('body-parser');
const app            = express();

app.set('port', process.env.PORT || config.PORT);
app.set('json spaces', 2);

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());


var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

app.use(allowCrossDomain);

app.get('/', function(req, res){
  res.send({ status: "Server up and running" });
});

const router = require('./routes')(app);

app.listen(config.PORT, function(){
	console.log('Server listening on port '+ config.PORT);
});