// Require Modules
var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var oauth2 = require('./lib/oauth2');
var cookieSession = require('cookie-session');

var app = express();

require('./lib/auth');
Auth = require('./lib/authorization');

app.set('view engine','ejs');
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieSession({
    keys: ['secret1']
}));

app.use(passport.initialize());
app.use(passport.session());
app.set('port', (process.env.PORT || 3000))
app.use(express.static(__dirname + '/public'))
app.set('views', __dirname+'/views');

app.get('/', Auth.isAuthenticated, function(req, res, next) {
	res.render('home');
});

app.get('/login', function(req, res, next) {
	res.render('index');
});

app.get('/home', Auth.isAuthenticated, function(req, res, next) {
	res.render('home');
});

app.get('/logout',function(req,res,next){
	req.logout();
	res.redirect('/');
});
app.get('/auth/linkedin',
  passport.authenticate('linkedin', { scope: ['r_emailaddress', 'r_basicprofile'] }));
  //Implementation of scopes, its in standby for r_fullprofile. Im limited to basicprofile for information of
  //the user, in 15 days max. (21 Oct 2015)

app.get('/auth/linkedin/callback',
	passport.authenticate('linkedin', {
		successRedirect: '/home',
		failureRedirect: '/home'
	})
);


proccessUserData = function(accessToken,profile){
	//console.log('accessToken: '+ accessToken);
    //var fb = new fbgraph.Facebook(accessToken, 'v2.2');
    //var items = profile.items;
    //console.log(accessToken);
    console.log(profile._json );

};

app.listen(app.get('port'), function() {
	console.log("Node app is running at localhost:" + app.get('port'))
})
