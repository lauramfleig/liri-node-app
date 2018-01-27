
require('dotenv').config();
// console.log(filePck);
const appKeys = require('./keys.js');
// console.log(appKeys);
const Twitter = require('twitter');
// require twitter npm
const Spotify = require('node-spotify-api');
//require request
const request = require('request');
//require fs
const fs = require('fs');
//require inquirer
const inquirer = require('inquirer');

const input = process.argv;

var command = process.argv[2];

let songName = process.argv[3];

let movieTitle = process.argv[3];


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

//------------------------------------Launch Twitter 
function getTweets() {

  console.log('GET TWEETS!')

	var client = new Twitter({
 		consumer_key: process.env.TWITTER_CONSUMER_KEY,
 		consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
 		access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
 		access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
	});

   inquirer.prompt([
  {
    name: 'username',
    message: 'Enter the Twitter Username of the Tweets to be Searched: '
  }, {
    name: 'numTweets',
    message: 'How Many Tweets Would You Like to Read? : '
  }

  ]).then(function(answers) {
    var answersObj = answers
    var usernameAnswer = answers.username;
    var countAnswer = answers.numTweets;
	  var params = {screen_name: usernameAnswer,
			  count: countAnswer};
	      client.get('statuses/user_timeline', params, function(error, tweets, response) {
  		    if (error) {
  		      console.log(error);
  	      }

  	for (var i = 0; i < tweets.length; i++) {
  		//console logging the tweets
  		console.log(tweets[i].text);
  		//console logging the creation date
  		console.log('Created at ' + tweets[i].created_at);
  	}
	
	 });
  
  });


}

//-------------------------------------Launch Spotify
function getSpotify() {
	
	var spotify = new Spotify({
  		id: process.env.SPOTIFY_ID,
  		secret: process.env.SPOTIFY_SECRET
	});


  inquirer.prompt([
  {
    name: 'songName',
    message: 'What Song would you like to Search? : '
  }
  ]).then(function(answers) {
    var songAnswer = answers.songName;
      //--------------------------Set Default song to "The Sign"
    if (songAnswer === '') {
      songAnswer = "The Sign by Ace of Base"; 
    }

	  spotify.search({ type: 'track', query: songAnswer }, function(err, data) {
  		if (err) {
    	return console.log('Error occurred: ' + err);
 		} 

 		//console logging the artist name
 		console.log('Artist Name: ' + data.tracks.items[0].album.artists[0].name);
 		//console logging the song name
 		console.log('Song Name: ' + data.tracks.items[0].name);
 		//console logging the link to the song
 		console.log('Link to Song: ' + data.tracks.items[0].album.external_urls.spotify);
 		//console logging the album name
 		console.log('Album Name: ' + data.tracks.items[0].album.name);


	  });	


  });

	
}

//------------------------------Launch OMDB using Request
function getMovie() {

  inquirer.prompt([
  {
    name: 'movieName',
    message: 'What Movie would you like to Search? :'
  }
  ]).then(function(answers) {
     var movieAnswer = answers.movieName;
	//--------------------------Set Default Movie to "Mr Nobody"
	    if (movieAnswer === '') {
			   movieAnswer = 'Mr+Nobody';
	    }

	   request('http://www.omdbapi.com/?apikey=c628a260&t=' + movieAnswer, function (error, response) {
  	   var obj = JSON.parse(response.body);
  	   //console logging the Movie Title
  		    console.log('Movie Title: ' + obj.Title);
  	   //console logging the release Year
  		    console.log('Release Year: ' + obj.Year);
  	   //console logging the IMDB rating
  		    console.log('IMDB Rating: ' + obj.Ratings[0].Value);
  	   //console logging the RT rating
  		    console.log('Rotten Tomatoes Rating: ' + obj.Ratings[1].Value);
  	   //console logging country of production
  		    console.log('Produced in: ' + obj.Country);
  	   //console logging the movie language(s)
  		    console.log('Movie Language: ' + obj.Language);
  	   //console logging the plot of the movie
  		    console.log('Plot: ' + obj.Plot);
  	   //console logging the actors in the movie
  		    console.log('Actors: ' + obj.Actors)
	   });
  });

}

//-----------------------------------------Using read file to access random text file
function searchTxtFiles() {

  fs.readFile('random.txt', "utf8", function(err, data) {
  // If there was an error reading the file, we log it and return immediately
  	if (err) {
    	return console.log(err);
    } 

  	var returnedData = data;

  	var splitData = returnedData.split(',');

  	command = splitData[0];
  	songName = splitData[1];
  	movieTitle = splitData[1];

  	if (command === 'my-tweets') {
		getTweets();
    }

    if (command === 'spotify-this-song') {
		getSpotify();
    }

  	if (command === 'movie-this') {
		getMovie();
    }

  });

}


















