/**
* Express App
* @author Emmanuel Awa <eawa@brandeis.edu>
**/

/** Require modules **/
var express = require("express"),
    ejs = require("ejs"),
    jade = require("jade"),
    bodyParser = require("body-parser");


/** Initialize Express app object **/
var app = new express();



// Server will be browsed at http://localhost:3000
var root = __dirname,
    port = 3000;

/** Configure express app **/
app.use( express.static( root + "/public" ) );


app.set( "views", root + "/views" ),
    app.set( "view engine", "jade" );

/** Add a middleware to return the data from the pages when requests are made
 *  - It looks for data encoded in the url when posts are made.
 *  - Variables will be available to use through a body object.
 **/
app.use(bodyParser.urlencoded( { extended : true }));


/** Creating some express routes (get/post) **/
app.get( "/settings/profile", function profile_editCallback ( req, res ) {
    //res.send("You there already?");
    res.render( "profile-form" );
});

app.post( "/settings/profile", function postProfileCb ( req, res ) {

    // this callback is fired after a POST is sent to the server
    console.log("POST RECEIVED");

    // Error handling from server response.ss
    if (!req.body) {

        return res.sendStatus(400)
    }


    // report post data to console
    console.log( req.body );

    // reply to browser that something has happened and close the loop
    res.json({
        "firstName": req.body.firstNameField,
        "lastName": req.body.lastNameField,
        "bio": req.body.bioField
    })
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