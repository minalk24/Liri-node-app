// add code to read and set any environment variables with the dotenv package
require("dotenv").config();

//require packages

var fs = require("fs");
var axios = require("axios");
var moment = require("moment");
var inquirer = require("inquirer");
var Spotify = require("node-spotify-api");


//require variable
var keys = require("./keys.js");  // code required to import the keys.js file and store it in a variable
console.log(keys);
var spotify = new Spotify(keys.spotify); // to access your keys information

// movies function
var movies = function () {

    inquirer
        .prompt([
            {
                type: "input",
                message: "Which movie do you want to know about",
                name: "NameOfMovie"
            }
        ]).then(function (resultMovie) {

            if (resultMovie.NameOfMovie) {
                var queryURL = "http://www.omdbapi.com/?t=" + resultMovie.NameOfMovie.split(" ").join("+") + "&y=&plot=short&apikey=trilogy";
                // console.log(queryURL);
            }else{
                var queryURL = "http://www.omdbapi.com/?t=Mr.+Nobody&y=&plot=short&apikey=trilogy"
            }

            axios.get(queryURL)
                .then(
                    function (responseMovie) {

                        console.log("Title of the movie: " + responseMovie.data.Title + "\n\n" +
                            "Year the movie came out: " + responseMovie.data.Year + "\n\n" +
                            "IMDB Rating of the movie: " + responseMovie.data.Rated + "\n\n" +
                            "Rotten Tomatoes Rating of the movie: " + responseMovie.data.Ratings[1].Value + "\n\n" +
                            "Country where the movie was produced: " + responseMovie.data.Country + "\n\n" +
                            "Language of the movie: " + responseMovie.data.Language + "\n\n" +
                            "Plot of the movie: " + responseMovie.data.Plot + "\n\n" +
                            "Actors in the movie: " + responseMovie.data.Actors + "\n\n"
                        );
                        selectOption()
                    })
                .catch(function () {

                    console.log("Enter Correct movie Name");

                    if (NameOfMovie === "Mr. Nobody") {
                        console.log("If you havn't watch this movie, Watch it")
                    }
                });
        });
}

// band In town function
var bandsintown = function () {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Which band DO you want?",
                name: "artist"
            }
        ])
        .then(function (inquirerResponse) {
            if (inquirerResponse.artist) {
                var queryURL = "https://rest.bandsintown.com/artists/" + inquirerResponse.artist + "/events?app_id=codingbootcamp";
            }
            axios.get(queryURL)
                .then(function (responseAxios) {

                    if (responseAxios.data.length === 0) {
                        console.log("Sorry Enter correct Band Name or Artist Name");
                    } else {
                        for (var i = 0; i < responseAxios.data.length; i++) {
                            console.log(" The name of the venue is :" + responseAxios.data[i].venue.name + "\n\n" +
                                "Venue location : " + responseAxios.data[i].venue.city + "\n\n" +
                                "Date of the Event" + moment(responseAxios.data[i].datetime).format("MM/DD/YYYY HH:mm A")
                            ); //console close
                        } // for loop close
                    } //else close
                    selectOption()
                }); //promise for axios close
        }); //promise for inquirer close
} //bandsInTown function close


var options = ["concert-this", "spotify-this-song", "movie-this", "do-what-it-says"];
// var search = process.argv.slice(3).join(" ");


function selectOption() {
    // ask the user to choose an option
    inquirer
        .prompt([
            {
                type: "rawlist",
                message: "Select option",
                choices: options,
                name: "userOption"
            }
        ]).then(function (resultOption) {
            //node liri.js movie-this  enter-movie-name
            if (resultOption.userOption === options[0]) {
                bandsintown();
                //node liri.js movie-this  enter-band/artist-name
            } else if (resultOption.userOption === options[2]) {

                movies();
            }
            else if (resultOption.userOption === options[1]) {
                spotifySong();
            }
        });
}
selectOption();

// var inputType = process.argv[2];

var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
})
// console.log(data);

var spotifySong = function () {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Which Song info do you want",
                name: "songName"
            }
        ]).then(function (resultSongInfo) {
           
            spotify.search({ type: "track", query: "'" + resultSongInfo.songName + "'", limit: 1 }, function (err, data) {

                console.log(data.tracks.items[0]);

                var songResult = data.tracks.items[0];

                console.log("Artists: " + songResult.artists[0].name + "\n\n" +
                    "Name of the song: " + songResult.name + "\n\n" +
                    "Spotify link of the song: " + songResult.external_urls.spotify + "\n\n" +
                    "Name of the album: " + songResult.album.name + "\n\n"
                );
                selectOption()

            });
        }

        )
}

// console.log(`This is my Spotify id ${keys.spotify.id}`);