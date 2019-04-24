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

