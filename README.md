# LIRI-NODE-APP


***PROJECT OVERVIEW***

LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data from the following APIs: Bandsintown, Spotify and OMDb.


***HOW IT WORKS***

Type into the command line...

* node liri.js concert-this "artist/band name" to return concert information from Bandsintown.

* node liri.js spotify-this-song "song name" to search and return song information from Sotify. If no song is provided then your program will default to "The Sign" by Ace of Base.

* node liri.js movie-this "movie name" to return movie information from OMDb. If the user desn't type a movie in, the program will output data for a default movie.

* node liri.js do-what-it-says to return information stored in random.txt 


***TECHNOLOGY AND PACKAGES USED***

* Node.js

* fs

* request

* Bandsintown API

* OMDb API

* Spotify API

* Moment

* DotEnv


***BRIEF DESCRIPTION OF STEPS FOLLOWED TO CREATE AND RUN THE APP***

1. Navigate to the root of your project and run `npm init -y` &mdash; this initializes a `package.json` 	file for the project. 

2. Make a `.gitignore` file 

3. Make a JavaScript file named keys.js with spotify keys for export

4. Next, create a file named .env, add the Spotify API keys

5. Make a file called random.txt and store default result for do-what-it-says command

6. Make a JavaScript file named `liri.js`.

7. At the top of the `liri.js` file, add code to read and set any environment variables with the dotenv package.



***WHAT EACH COMMAND SHOULD DO***

1. `node liri.js concert-this 'artist/band name'`

   * This will search the Bands in Town Artist Events API (`"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"`) for an artist and render the following information about each event to the terminal:

     * Name of the venue

     * Venue location

     * Date of the Event (use moment to format this as "MM/DD/YYYY")

2. `node liri.js spotify-this-song 'song name'`

   * This will show the following information about the song in your terminal/bash window

     * Artist(s)

     * The song's name

     * A preview link of the song from Spotify

     * The album that the song is from

   * If no song is provided then your program will default to "The Sign" by Ace of Base.

  3. `node liri.js movie-this 'movie name'`

   * This will output the following information to your terminal/bash window:

       * Title of the movie.
       
       * Year the movie came out.
       
       * IMDB Rating of the movie.
       
       * Rotten Tomatoes Rating of the movie.
       
       * Country where the movie was produced.
       
       * Language of the movie.
       
       * Plot of the movie.
       
       * Actors in the movie.
     

   * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

   * You'll use the `axios` package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. 

4. `node liri.js do-what-it-says`

   * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.


    ***Link to some of the app images***

[packages-used](https://github.com/Tyawo/liri-node-app/blob/master/images/app-packages.gif)
   
[omdb](https://github.com/Tyawo/liri-node-app/blob/master/images/OMDB-search-results.gif)

[Bandsintown](https://github.com/Tyawo/liri-node-app/blob/master/images/bandsintown-search.gif)


 ***Link to all liri-node images***

 
[More-images](https://github.com/Tyawo/liri-node-app/tree/master/images)

   
