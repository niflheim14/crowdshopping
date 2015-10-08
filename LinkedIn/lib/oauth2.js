var oauth2orize         = require('oauth2orize');
var passport            = require('passport');
var crypto              = require('crypto');

var server = oauth2orize.createServer();

// Grant
server.grant(oauth2orize.grant.code(function(client, redirectURI, user, ares, done) {   
  var code = 'utils.uid(16)'; 
  console.log('MAMI'.green);
    done(null, code);

}));


// token endpoint
exports.token = [
    passport.authenticate(['basic', 'oauth2-client-password'], { session: false }),
    server.token(),
    server.errorHandler()
];