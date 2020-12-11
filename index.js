/*
*    Sets up dotenv as soon as our application starts.
*/
require('dotenv').config();

/*
*    Include required dependencies
*/
const express = require('express'); 
const bodyParser = require('body-parser');
const fs = require('fs');
const http = require('http');
const https = require('https');

/*
*    Include development dependencies.
*/
const logger = require('morgan');

/*
*    Create a new express application and router
*/
const app = express();
const router = express.Router();

/*
*    Include our routing function
*/
const routes = require('./routes/index.js');

/*
*    Define an environment and its configuration
*/
const environment = process.env.NODE_ENV;
const environment_config = require('./config')[environment];

/*
*    Use body parser
*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

/*
*   Add CORS policy middleware
*/
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

/*
*    Use morgan for request logging in development environment
*/
if (environment !== 'production') {
    app.use(logger('dev'));
} else {
    // app.use(logger('dev'));
    // TODO - Write logs to file
}

app.use('/api', routes(router));

if(environment === 'production') {
    // var sslOptions = {
    //     key: fs.readFileSync('/etc/apache2/ssl/key/skilramp_com.key'),
    //     cert: fs.readFileSync('/etc/apache2/ssl/certs/skilramp_com.crt'),
    // };
    // https.createServer(sslOptions, app).listen(`${environment_config.port}`, function() {
    //     console.log(`Server now listening at port:${environment_config.port}`);
    // });
} else {
    app.listen(`${environment_config.port}`, () => {
        console.log(`Server now listening at port:${environment_config.port}`);
    });
}

module.exports = app;