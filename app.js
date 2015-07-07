/**
* Express App
* @author Emmanuel Awa <eawa@brandeis.edu>
**/

/** Require modules **/
var express = require("express");


/** Initialize Express app object **/
var app = new express();


// Server will be browsed at http://localhost:3000
var root = __dirname,
    port = 3000;

/** Configure express app **/
app.use( express.static( root + "/public" ) );

/** Creating some express routes (get/post) **/
app.get( "/hello", function helloCallback ( req, res ) {
    res.send("You there already?");
});

app.get("/back", function backCallback( req, res ) {
    res.send("We are back home!");
});

/**
 * Serving JSON api to be consumed by other applications
 */
app.get("/someJSON", function  someJSONCallback( req, res ) {
    res.json({
        "one": {
            "so": "cool"
        },
        "two": "super cool",
        "three": ["reaching", "the", "end"],
        "four": "buckle my shoes"
    });
});



/** Start server on port 3000 **/
app.listen( port, function listenCallback() {
    console.log("Express server listening on port " + port);
    console.log("Launch webpage using http://localhost:" + port);
});