var express = require('express'),
bodyParser = require('body-parser'),
passport = require('passport'),
//Uso de youtube-node
Youtube = require('./lib/lib_youtube/youtube'),
cookieSession = require('cookie-session');

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

app.get('/auth/youtube',
	passport.authenticate('youtube'));

app.get('/oauth2callback', 
	passport.authenticate('youtube', { failureRedirect: '/login' }),
	function(req, res) {
    	// Successful authentication, redirect home.
    	res.redirect('/');
});

proccessYoutubeData = function(accessToken,profile){
	//console.log(profile);
	Youtube.getChannel(accessToken, function(channel){
		console.log(channel);
		Youtube.getActivities(accessToken, channel.items[0].id ,function(activities){
			console.log(activities);
		});
		Youtube.getComments(accessToken, 'UC-2Y8dQb0S6DtpxNgAKoJKA' ,function(comments){
			console.log(comments);
		});
	});
}

app.listen(app.get('port'), function() {
	console.log("Node app is running at localhost:" + app.get('port'))
});
