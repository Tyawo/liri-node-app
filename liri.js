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

// Request axios
var axios = require("axios");

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

// Bonus- To append each command to the log.txt
fs.appendFile("log.txt", userQuery + "\n", function (err) {


    // If an error was experienced we will log it.
    if (err) {
        console.log(err);
    }

    // If no error is experienced, we'll log the phrase "Command Added" to our node console.
    else {
        console.log("The command is added!");
    }

});

function concertThis() {
    console.log(`\nSEARCH RESULTS... ${userQuery}'s next show...`);
    // use request a our query URL using our user query variable as the parameters of our search
    request("https://rest.bandsintown.com/artists/" + userQuery + "/events?app_id=" + bandsintown,
        function (error, response, body) {

            //  If there is no error
            if (!error && response.statusCode === 200) {
                // capture data and use JSON
                var userBand = JSON.parse(body);

                // parse data and use for loop to access paths of data
                if (userBand.length > 0) {
                    for (i = 0; i < 5; i++) {

                        // console log desired data
                        console.log(`\nVenue: ${userBand[i].venue.name},
                                    \nVenue City: ${userBand[i].venue.city}, 
                                    \nVenue Country:${userBand[i].venue.country}`)

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
function spotifyThisSong() {
    console.log(`\n----\n\nSEARCH RESULTS FOR..."${userQuery}"`);

    // if the query not found, pass value of "The sign of ace of base"
    if (!userQuery) { userQuery = "The sign of the Ace of base" };

    // SPOTIFY SEARCH QUERY FORMAT
    spotify.search({ type: 'track', query: userQuery, limit: 2 }, function (error, data) {
        if (error) {
            return console.log('Error occured: ' + error);
        }
        // Collect selected data in an array
        var spotifyArr = data.tracks.items;

        for (i = 0; i < spotifyArr.length; i++) {
            console.log(`\nTitle: ${data.tracks.items[i].name}
                        \nArtist: ${data.tracks.items[i].album.artists[0].name}
                        \nSong:  ${data.tracks.items[i].name}
                        \nSpotify link: ${data.tracks.items[i].external_urls.spotify}
                        \nAlbum: ${data.tracks.items[i].album.name}\n\n---------------------------------------------`)
        };
    });
}
function movieThis() {
    console.log(`\n-----\n\nSEARCH FOR ..."${userQuery}"`);
    if (!userQuery) { userQuery = "Mr nobody"; };

    var queryUrl = "http://www.omdbapi.com/?t=" + userQuery + "&y=&plot=short&apikey=95e09f14";

    // // This line is just to help us debug against the actual URL.
    // console.log(queryUrl);

    axios.get(queryUrl).then(
        function (response) {
            console.log("\nTitle: " + response.data.Title);
            console.log("\nYear: " + response.data.Year);
            console.log("\nIMDB Rating: " + response.data.imdbRating);
            console.log("\nRotten Tomatoes Rating: " + response.data.Ratings[0].Value);
            console.log("\nCountry: " + response.data.Country);
            console.log("\nLanguage: " + response.data.Language);
            console.log("\nPlot: " + response.data.Plot);
            console.log("\nActor: " + response.data.Actors);
        }
    );

}










