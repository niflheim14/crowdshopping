var express = require('express'),
bodyParser = require('body-parser'),
passport = require('passport'),
//Uso de node-foursquare para obtener user, venues.
Foursquare = require('./lib/lib_foursquare/foursquare');

require('./lib/auth');

var app = express();
app.set('view engine','ejs');
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

app.set('port', (process.env.PORT || 3000))
app.use(express.static(__dirname + '/public'))
app.set('views', __dirname+'/views');

app.get('/', function(req, res, next) {
	res.redirect('/login');
});			

app.get('/login', function(req, res, next) {
	res.render('index');
});

app.get('/auth/foursquare',
	passport.authenticate('foursquare'));

app.get('/auth/foursquare/callback', 
	passport.authenticate('foursquare', { failureRedirect: '/login' }),
	function(req, res) {
    	// Successful authentication, redirect home.
    	res.redirect('/');
});

proccessFoursquareUserData = function(accessToken,profile){
	Foursquare.getUser(accessToken, function(fullProfile){
		console.log(fullProfile);
	})
	Foursquare.getVenueHistory(accessToken, function(venues){
		console.log(venues);
	})
	Foursquare.explore(accessToken, function(explore){
		console.log(explore);
	})
	
}

app.listen(app.get('port'), function() {
	console.log("Node app is running at localhost:" + app.get('port'))
});

