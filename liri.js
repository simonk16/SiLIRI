require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var Spotify = require("node-spotify-api");
var fs = require("fs");


var command = process.argv[2];

switch (command) {
    case "concert-this": 
        var artist = process.argv[3];
        var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
        
        axios.get(queryURL)
        .then(function(response){
            console.log("Venue name: " + response.data[0].venue.name)
            console.log("Location: " + response.data[0].venue.city + ", " + response.data[0].venue.country)
            console.log("Date: " + response.data[0].datetime)
            return

        })
        return
        
    case "spotify-song":
        var song = process.argv[3];
        var spotify = new Spotify(keys.spotify);
        if (song === undefined){
        
            console.log("No song parameter recieved, so i'm just gonna fetch the default data: ")
            spotify.search({
                type: "track",
                query: "The Sign ace of base" },
                function(err, data) {
                    if (err) {
                       console.log("Error occurred: " + err)
                    }  
                        var songResult = data.tracks.items[0];
                        // console.log(data.tracks.items[0]);
                        console.log("Song: " + songResult.name);
                    
                        var artists = data.tracks.items[0].artists;
                        for (var i = 0; i < artists.length; i++) {
                            console.log("Artist" + " " + (i+1) + ":" + " " + artists[i].name)
                            };
                    
                        console.log("Preview: " + songResult.preview_url)
                        return console.log("Album: " + songResult.album.name)
                    });
                
                
        } else {
            spotify.search({
                type: "track",
                query: song },
                function(err, data) {
                    if (err) {
                    console.log("Error occurred: " + err)
                    return
                    }  
                        var songResult = data.tracks.items[0];
                        // console.log(data.tracks.items[0]);
                        console.log("Song: " + songResult.name);
                    
                        var artists = data.tracks.items[0].artists;
                        for (var i = 0; i < artists.length; i++) {
                            console.log("Artist" + " " + (i+1) + ":" + " " + artists[i].name)
                            };
                    
                        console.log("Preview: " + songResult.preview_url)
                    return console.log("Album: " + songResult.album.name)
                });
                
            
        }
    case "movie":
        var userInput = process.argv[3];

        var queryURL = "http://www.omdbapi.com/?t=" + userInput + "&apikey=c53e4fe";
        if (userInput === undefined) {
            axios.get("http://www.omdbapi.com/?t=mr+nobody&apikey=c53e4fe")
            .then(function(response){
                console.log(response.data.Title);
                return
            }).catch(function(response){
                console.log(response)
                return
            })
        } else {
            axios.get(queryURL)
            .then(function(response){
                console.log("<-----------START----------->");
                console.log(response.data.Title);
                console.log(response.data.Year);
                console.log("Starring: " + response.data.Actors);
                console.log(response.data.imdbRating + " on IMDB");
                console.log(response.data.Ratings[1].Source + ": " + response.data.Ratings[1].Value);
                console.log("<---------------------->");
                console.log("Production location(s): " + response.data.Country);
                console.log("Language(s): " + response.data.Language);
                console.log("<---------------------->");
                console.log("Plot: " + response.data.Plot);
                console.log("<---------END---------->");
                return

            })
        }
    
    case "random":
        fs.readFile("random.txt", "utf8", function(err, data){
            if (err) {
                return console.log("Big error ;(")
            }


            var dataArr = data.split(",")


            var swag = dataArr[1]
            var spotify = new Spotify(keys.spotify);
            randomFunc(swag)
            function randomFunc(song){
                spotify.search({
                    type: "track",
                    query: song },
                    function(err, data){
                        if (err) {
                            console.log("ya don goofed!")
                        }

                        var songData = data.tracks.items[0]
                         console.log("Song: " + songData.name)
                         console.log("Artist: " + songData.artists[0].name)
                         console.log("Preview: " + songData.preview_url)
                

                })
        
                
            }
        })
                
        
}
