// set up ======================================================================
let express  = require('express');
let app      = express(); 								// create our app w/ express
// var mongoose = require('mongoose'); 					// mongoose for mongodb
let port  	 = process.env.PORT || 4000; 				// set the port
// var database = require('./config/database'); 			// load the database config

// let morgan = require('morgan'); 		// log requests to the console (express4)
let bodyParser = require('body-parser'); 	// pull information from HTML POST (express4)
let methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

// configuration ===============================================================
// mongoose.connect(database.url); 	// connect to mongoDB database on modulus.io

app.use(express.static(__dirname + '/public')); 				// set the static files location /public/img will be /img for users
// app.use(morgan('dev')); 										// log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'})); 			// parse application/x-www-form-urlencoded
app.use(bodyParser.json()); 									// parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
// routes ======================================================================
require('./app/index.js')(app);

// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);

module.exports = app;