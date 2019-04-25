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
function spotifyThisSong() {
    console.log(`\n----\n\nSEARCHING FOR..."${userQuery}"`);

    // if the query not found, pass value of "The sign of ace of base"
    if (!userQuery) { userQuery = "The sign of the Ace of base" };

    // SPOTIFY SEARCH QUERY FORMAT
    spotify.search({ type: 'track', query: userQuery, limit: 1 }, function (error, data) {
        if (error) {
            return console.log('Error occured: ' + error);
        }
        // Collect selected data in an array
        var spotifyArr = data.tracks.items;

        for (i = 0; i < spotifyArr.length; i++) {
            console.log(`\nSONG SEARCH RESULTS...\n\nTitle: ${data.tracks.items[i].name}
                        \nArtist: ${data.tracks.items[i].album.artists[0].name}
                        \nSong:  ${data.tracks.items[i].name}
                        \nSpotify link: ${data.tracks.items[i].external_urls.spotify}
                        \nAlbum: ${data.tracks.items[i].album.name}\n\n---------------------------------------------`)
        };
    });
}

function movieThis() {
    console.log(`\n-----\n\nSEARCH FOR ..."${userQuery}"`);
    if (!userQuery) {userQuery = "Mr nobody";};

    // REQUEST USING OMDB API
    request("http://www.omdbapi.com/?t=" + userQuery + "&apikey=95e09f14", function(error, response, body){
        var userMovie = JSON.parse(body);
        
        // create an array to capture nested Rotten tomatoes values
        var ratingsArr = userMovie.Ratings;
        if (ratingsArr.length > 2) {
        }

        if (!error && response.statusCode === 200) {
            console.log(`\nMOVIE SEARCH RESULTS...\n\nTitle: ${userMovie.Title}
                        \nCast: ${userMovie.Actors}
                        \nReleased: ${userMovie.Year}
                        \nIMDb Rating: ${userMovie.imdbRating}
                        \nRotten Tomatoes Rating: ${userMovie.Ratings[1].Value}
                        \nCountry: ${userMovie.Country}
                        \nLanguage: ${userMovie.Language}
                        \nPlot: ${userMovie.Plot}\n\n---`)
        }else {
            return console.log("Movie not found. Error:" + error)
        };

    })

}

// function doWhatItSays() {
//     // use READFILE to access random.txt
//     fs.readFile("random.txt", "utf8", function(error, data) {
//         if (error) { return console.log(error);}

//     // catch data and use the split(" ") method to separate objects in the new array
//     var dataArr = data.split(",");

//     // Take objects from random.txt and pass as parameters
//     userInput = dataArr[0];
//     userQuery = dataArr[1];
//     // Call command with the new parameters
//     userCommand(userInput, userQuery);
//     });
// };






    