var passport                = require('passport');
var YoutubeV3Strategy = require('passport-youtube-v3').Strategy;
var YOUTUBE_APP_ID = "352660396666-oueitc7qa8ds43d3119nbto432estv0c.apps.googleusercontent.com";
var YOUTUBE_APP_SECRET = "57oDWwd0LIt8MO7cchnR8dLv";

passport.use(new YoutubeV3Strategy({
    clientID: YOUTUBE_APP_ID,
    clientSecret: YOUTUBE_APP_SECRET,
    callbackURL: "http://localhost:3000/oauth2callback",
    profileURL: 'https://www.googleapis.com/youtube/v3/channels?part=contentDetails%2C+snippet%2C+status%2C+statistics%2C+contentOwnerDetails+&maxResults=50&mine=true',
    scope: [
        'https://www.googleapis.com/auth/youtube',
        'https://www.googleapis.com/auth/youtube.force-ssl',
        'https://www.googleapis.com/auth/youtube.readonly',
        'https://www.googleapis.com/auth/youtube.upload',
        'https://www.googleapis.com/auth/youtubepartner',
        'https://www.googleapis.com/auth/youtubepartner-channel-audit']
  },
  function(accessToken, refreshToken, profile, done) {
        access = accessToken;
        //console.log(profile);
        /*
            console.log(YoutubeV3Strategy.channels);
            console.log(YoutubeV3Strategy.channelSections);
            console.log(YoutubeV3Strategy.activities);
            console.log(YoutubeV3Strategy.commentThreads);
            console.log(YoutubeV3Strategy.allCommentThreads);
            console.log(YoutubeV3Strategy.playListItems);
            console.log(YoutubeV3Strategy.videos);
            */
            console.log(YoutubeV3Strategy.getChannel());
            console.log(YoutubeV3Strategy.getChannelSections());
            console.log(YoutubeV3Strategy.getActivities());
            console.log(YoutubeV3Strategy.getCommentThreads());
            console.log(YoutubeV3Strategy.getAllCommentThreads());
            console.log(YoutubeV3Strategy.getPlayListItems());
            console.log(YoutubeV3Strategy.getVideos());

            proccessUserData(accessToken,profile);
            
        return done(null, false);   
  }
));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(id, done) {
    done(null, user);
});

