/**
* Express App
* @author Emmanuel Awa <eawa@brandeis.edu>
**/

/** Require modules **/
var express = require("express"),
    ejs = require("ejs"),
    jade = require("jade"),
    bodyParser = require("body-parser"),
    fs = require("fs"),
    multipart = require("connect-multiparty");


/** Initialize Express app object **/
var app = new express();



// Server will be browsed at http://localhost:3000
var root = __dirname,
    port = 3000;

/** Configure express app **/
app.use( express.static( root + "/public" ) );


app.set( "views", root + "/views" ),
    app.set( "view engine", "jade" );


// ADD Middlewares

/** Add a middleware to return the data from the pages when requests are made
 *  - It looks for data encoded in the url when posts are made.
 *  - Variables will be available to use through a body object.
 **/
app.use(bodyParser.urlencoded( { extended : true }));


/**
 * Add a middleware for Multiplart files upload
 * - Method receives an options object, and will be using app_root_dir/tmp where we'll upload from
 */
app.use( multipart({ uploadDir: root + "/tmp" }) );

/** Creating some express routes (get/post) **/

// GET edit profile
app.get( "/settings/profile", function profile_editCallback ( req, res ) {
    //res.send("You there already?");
    res.render( "profile-form" );
});

// GET profile page
/** Creating a redirect page after data is submitted to server **/
app.get( "/profile", function profile_pageCallback ( req, res ) {


    // Read file ** Asynchronously ** from data file back to the profile page
    fs.readFile("data.json", function readFileCallback ( err, data ) {
        if ( err )  {

            res.json({
                err: true,
                msg: err.msg
            });
            return console.log( err );
        }

        // No error, continue process

        // Convert JSON string to JavaScript object using Chrome V8 processing for NODE.
        var profileData = JSON.parse( data );

        console.log("Data read from file: ", profileData);

        res.render( "profile", {
            firstname: profileData.firstNameField,
            lastname: profileData.lastNameField,
            bio: profileData.bioField
        });
    });

});



// POST edit profile page
app.post( "/settings/profile", function postProfileCb ( req, res ) {

    // this callback is fired after a POST is sent to the server
    console.log("POST RECEIVED");

    // Error handling from server response
    if (!req.body) {

        return res.sendStatus(400)
    }

    var data = req.body;

    // Report to console
    console.log( "Fields Received", data );

    // =================================

    // You can inspect the req and res objects using console
    // To see what they contain

    console.log ("=====> Files: ", req.files );
    // =================================

    // GET file

    if ( req.files.photoField != undefined ) {

    }

    // Write JSON with POST data using core node methods
    // Asynchronously write data to a file

    fs.writeFile( "data.json", JSON.stringify( req.body, null, 2 ),    function writeCb( err ) {
        // reply to browser that something has happened and close the loop

        // Error handling
        if ( err ) {
            res.json( {
                err: true, msg: err.msg
            });

            return console.log ( err );
        }

        // Report success to console
        console.log ( "Post Data Saved", req.body );

        // Reply to browser with a redirect directive
        res.redirect("/profile");

        //
        //return res.json({
        //    "firstName": req.body.firstNameField,
        //    "lastName": req.body.lastNameField,
        //    "bio": req.body.bioField
        //}); // end writeCb
    }); // end app.post


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