require('dotenv').config();

const express = require('express');
const hbs = require('hbs');

// require spotify-web-api-node package here:
const SpotifyWebApi = require('spotify-web-api-node');

const app = express();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));


// setting the spotify-api goes here:
const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
  });
  
  // Retrieve an access token
  spotifyApi
    .clientCredentialsGrant()
    .then(data => spotifyApi.setAccessToken(data.body['access_token']))
    .catch(error => console.log('Something went wrong when retrieving an access token', error));

// Our routes go here:

// Route for home page :
app.get("/", (req, res, next) => {
    console.log("we received a request for the HOME page");
    
    res.render("home");
  });

// Search route creation
app.get("/artist-search",(req,res,next) =>{
    console.log(req.query);
    let artistName = req.query.artistName;
    spotifyApi
    .searchArtists(artistName)
    .then(data => {
     // ----> 'HERE WHAT WE WANT TO DO AFTER RECEIVING THE DATA FROM THE API'
let artists = data.body.artists;
artists.items.forEach(element => {
   console.log(element.images);
});




res.render("artist-search-results", artists)
    })
    .catch(err => console.log('The error while searching artists occurred: ', err));
   

    })
    






/*app.get('/',(req,res,next) =>{
    spotifyApi.searchArtists('madonna')
    .then((data) =>{
        console.log(data.body.artists);
        res.send("check console");
    })
    .catch(err =>{
        console.log(err);
    })*/




/////////////////////////////////////////////////////////////////////////////////////////////////
app.listen(3000, () => console.log('My Spotify project running on port 3000 🎧 🥁 🎸 🔊'));
