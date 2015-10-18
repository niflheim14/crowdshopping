var passport                = require('passport');
// API utilizada : https://github.com/jaredhanson/passport-linkedin
var LinkedInStrategy = require('passport-linkedin');
//Llaves LinkedIn
var LINKEDIN_APP_KEY = "78o57t1q9klrb5";
var LINKEDIN_APP_SECRET = "ClTqv24AmtiHWpK2";

passport.use(new LinkedInStrategy({
    consumerKey: LINKEDIN_APP_KEY,
    consumerSecret: LINKEDIN_APP_SECRET,
    callbackURL: '/auth/linkedin/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    proccessLinkedInData(accessToken,profile);
    return done(null, false);
  }
));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(id, done) {
    done(null, user);
});