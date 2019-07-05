require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios")
var Spotify = require("node-spotify-api")


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
            break;
        })
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
        

                
        
}
