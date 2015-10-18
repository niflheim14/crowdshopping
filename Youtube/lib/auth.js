var passport                = require('passport');
// API utilizada : https://github.com/yanatan16/passport-youtube-v3
var YoutubeV3Strategy = require('passport-youtube-v3').Strategy;
//Llaves youtube
var YOUTUBE_APP_ID = "352660396666-oueitc7qa8ds43d3119nbto432estv0c.apps.googleusercontent.com";
var YOUTUBE_APP_SECRET = "57oDWwd0LIt8MO7cchnR8dLv";

passport.use('youtube', new YoutubeV3Strategy({
    clientID: YOUTUBE_APP_ID,
    clientSecret: YOUTUBE_APP_SECRET,
    callbackURL: '/oauth2callback',
    scope: [
        'https://www.googleapis.com/auth/youtube',
        'https://www.googleapis.com/auth/youtube.force-ssl',
        'https://www.googleapis.com/auth/youtube.readonly',
        'https://www.googleapis.com/auth/youtube.upload',
        'https://www.googleapis.com/auth/youtubepartner',
        'https://www.googleapis.com/auth/youtubepartner-channel-audit']
  },
  function(accessToken, refreshToken, profile, done) {
    proccessYoutubeData(accessToken, profile);
    return done(null, false);
  }
));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(id, done) {
    done(null, user);
});
