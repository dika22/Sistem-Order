// make variable from package module
const express    = require('express'),
	  bodyParser = require('body-parser'),
	  dbConfig   = require('./config/database.js'),
	  mongoose   = require('mongoose');

require('dotenv').config()
// Make App Express
const app = express();

// Parse request content-type : application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// Parsing request of content-type : application/json
app.use(bodyParser.json())

// mongose promise
mongoose.Promise = global.Promise;	  

// Connection Database
mongoose.connect(dbConfig.url, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log("Successfully Connection Database");    
}).catch(err => {
    console.log('Error Connection!', err);
    process.exit();
});

// Routes setup
var routes = require('./routers/router');
routes(app);

// Listen for requests
app.listen(process.env.PORT, () => {
    console.log("Server is listening on port 3000");
});