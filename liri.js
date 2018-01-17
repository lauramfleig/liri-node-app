require("dotenv").config();


var appKeys = require('./keys.js');

var inputString = process.argv;

var spotify = Spotify(keys.spotify);
var client = Twitter(keys.twitter);

console.log(appKeys);