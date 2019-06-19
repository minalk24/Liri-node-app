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

// Create a "Prompt" with a series of questions.
inquirer
  .prompt([
      {
    // Here we create a basic text prompt.
    
  },
   
    
  ])
  .then(function(inquirerResponse) {
    
 
  });