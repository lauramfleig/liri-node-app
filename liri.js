

require('dotenv').config();
// console.log(filePck);
const appKeys = require('./keys.js');
// console.log(appKeys);
const Twitter = require('twitter');
// require twitter npm
const Spotify = require('node-spotify-api');

const rq = require('request');

const input = process.argv;

const command = process.argv[2];

var songName = process.argv[3];



if (command === 'my-tweets') {
	getTweets();
}

if (command === 'spotify-this-song') {
	getSpotify();
}

if (command === 'movie-this') {
	getMovie();
}

if (command === 'do-what-it-says') {
	searchTxtFiles();
}


function getTweets() {

	var client = new Twitter({
 		consumer_key: process.env.TWITTER_CONSUMER_KEY,
 		consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
 		access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
 		access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
	});

	var params = {screen_name: 'NoThanksTweeter',
			  count: '20'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
  		if (error) {
  		console.log(error);
  	}

  	for (var i = 0; i < tweets.length; i++) {
  		//console logging the tweets
  		console.log(tweets[i].text);
  		//console logging the creation date
  		console.log(tweets[i].created_at);
  	}
	
	});

}

function getSpotify() {
	
	var spotify = new Spotify({
  		id: process.env.SPOTIFY_ID,
  		secret: process.env.SPOTIFY_SECRET
	});

	//--------------------------Set Default song to "The Sign"
	if (songName === undefined) {
 		 songName = "The Sign"; 
 	}

	spotify.search({ type: 'track', query: songName, limit: '1' }, function(err, data) {
  		if (err) {
    	return console.log('Error occurred: ' + err);
 		} 
 		console.log(songName);
 		
 		//console logging the artist name
 		console.log(data.tracks.items[0].album.artists[0].name);
 		//console logging the song name
 		console.log(data.tracks.items[0].name);
 		//console logging the link to the song
 		console.log(data.tracks.items[0].album.artists[0].href);
 		//console logging the album name
 		console.log(data.tracks.items[0].album.name);


	});	
	
}

function getMovie() {








}










// console.log(JSON.stringify(client.request('https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=NoThanksTweeter&count=2')).split(','));
















