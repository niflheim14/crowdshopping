var passport                = require('passport');
var LinkedInStrategy = require('passport-linkedin')
var LINKEDIN_APP_KEY = "78o57t1q9klrb5";
var LINKEDIN_APP_SECRET = "ClTqv24AmtiHWpK2";
//Keys of my account of LinkedIn developer

passport.use(new LinkedInStrategy({
    consumerKey: LINKEDIN_APP_KEY,
    consumerSecret: LINKEDIN_APP_SECRET,
    callbackURL: "/auth/linkedin/callback",
     profileFields: ['id', 'first-name', 'last-name', 'email-address', 'headline', 'industry',
     'maiden-name', 'formatted-name',
 'phonetic-first-name', 'phonetic-last-name', 'formatted-phonetic-name', 'location', 'current-share', 'num-connections', 'num-connections-capped',
 'summary', 'specialties', 'positions', 'picture-url', 'site-standard-profile-request',
 'api-standard-profile-request', 'public-profile-url'],
//ProfileFields is the data what i want to extract, this parameter is send to a URL to request
//to LinkedIn the list of parameters in base to all what the scope can authorize. In this case, only
//can authorize the parameters of r_basicprofile and r_emailaddress. This because,
//we need a partner authorization to request more data (Im in standby).

  },
  function(accessToken, refreshToken, profile, done) {
        if(profile){

                proccessUserData(accessToken,profile);

      }
        return done(null, false);
  }
));




passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(id, done) {
    done(null, user);
});
