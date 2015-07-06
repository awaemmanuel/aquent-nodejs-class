/**
* Express App
* @author Emmanuel Awa <eawa@brandeis.edu>
**/

/** Require modules **/
var express = require("express");

/** Initialize Express app object **/

var app = express();

// Server will be browsed at http://localhost:3000
var root = __dirname,
    port = 3000;

/** Configure express app **/

app.use( express.static( root + "/public" ));

/** Start server on port 3000 **/

app.listen( port, function listenCallback() {
    console.log("Express server is listening on port" + port);
    console.log("To test, browse to http://localhost:" + port);
});