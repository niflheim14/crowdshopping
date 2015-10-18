var passport                = require('passport');
// API utilizada : https://github.com/jaredhanson/passport-foursquare
var FoursquareStrategy = require('passport-foursquare');
//Llaves foursquare
var FOURSQUARE_CLIENT_ID = "JFJYHSZ1DWURSLTJTSHCO2HLQYROA2BQZXYZXFIA4XINVM4E";
var FOURSQUARE_CLIENT_SECRET = "V5LYFABZUB3CPBLNNQO2DE1YLTZSHQ4SRIOVLLUFWYLFHMKM";

passport.use('foursquare',new FoursquareStrategy({
    clientID: FOURSQUARE_CLIENT_ID,
    clientSecret: FOURSQUARE_CLIENT_SECRET,
    callbackURL: '/auth/foursquare/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    proccessFoursquareUserData(accessToken, profile);
    return done(null, false);
  }
));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(id, done) {
    done(null, user);
});
