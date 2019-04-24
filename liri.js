// REQUIRE .env FILE
require("dotenv").config();

// Require REQUEST
var request = require("request");

// Require moment
var moment = require("moment");

// Require file systems
var fs = require("fs");

// Link keys file
var keys = require("./keys.js");

// var axios = require("axios");

// Initialize Spotify
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

// OMDB and BANDS in TOWN API'S
var omdb = (keys.omdb);
var bandsintown = (keys.bandsintown);

// Take user command and input
var userInput = process.argv[2];
var userQuery = process.argv.slice(3).join(" ");

// APP LOGIC
function userCommand(userInput, userQuery) {
    switch (userInput) {
        case "concert-this":
            concertThis();
            break;
        case "spotify-this-song":
            spotifyThisSong();
            break;
        case "movie-this":
            movieThis();
            break;
        case "do-what-it-says":
            doWhatItSays(userQuery);
            break;
        default:
            console.log("I don't understand");
            break;
    }
};
userCommand(userInput, userQuery);

function concertThis() {
    console.log(`\n-----\n\nSEARCHING FOR ...${userQuery}'s next show...`);
    // use request a our query URL using our user query variable as the parameters of our search
    request("https://rest.bandsintown.com/artists/" + userQuery + "/events?app_id=" + bandsintown, 
    function(error,response,body) {

        //  If there is no error
        if (!error && response.statusCode === 200) {
        // capture data and use JSON
        var userBand = JSON.parse(body);
        // parse data and use for loop to access paths of data
        if (userBand.length > 0) {
            for (i = 0; i < 5; i++) {

                // console log desired data
                console.log(`\nHERE ARE THE RESULTS...\n
                            \nArtist: ${userBand[i].lineup[0]}
                            \nVenue: ${userBand[i].venue.name}
                            \nVenue Location: ${userBand[i].venue.latitude},${userBand[i].venue.longitude}
                            \nVenue City: ${userBand[i].venue.city}, ${userBand[i].venue.country}`)

                // Formatting the date with moment.js
                var concertDate = moment(userBand[i].datetime).format("MM/DD/YYYY hh:00 A");
                console.log(`\nDate and Time: ${concertDate}\n\n---------------------------------------------`);
            };
        } else {
            console.log('Band or concert not found!');
        };
    };
});
}



    