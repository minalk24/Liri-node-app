// add code to read and set any environment variables with the dotenv package
require("dotenv").config();

//require packages

var fs = require("fs");
var axios = require("axios");
var moment = require("moment");
var inquirer = require("inquirer");
var Spotify = require("node-spotify-api");


//require variable
// code required to import the keys.js file and store it in a variable
var keys = require("./keys.js");
// to access your keys information
var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var search = process.argv[3];

var movieName = process.argv.slice(2).join("+");
console.log(movieName);

queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy"
// Then run a request with axios to the OMDB API with the movie specified
axios.get(queryURL)
.then(
  function(response) {
    
      console.log("Title of the movie: " + response.data.Title + "\n\n" +
      "Year the movie came out: " + response.data.Year + "\n\n" +
      "IMDB Rating of the movie: " + response.data.Rated + "\n\n" +
      "Rotten Tomatoes Rating of the movie: " + response.data.Ratings[1].Value + "\n\n" +
      "Country where the movie was produced: " + response.data.Country + "\n\n" +
      "Language of the movie: " + response.data.Language + "\n\n" +
      "Plot of the movie: " + response.data.Plot + "\n\n" +
      "Actors in the movie: " + response.data.Actors + "\n\n" 
      );
  })
  .catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
     
      
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
  });