var express = require('express'),
bodyParser = require('body-parser'),
passport = require('passport'),
cookieSession = require('cookie-session');
//Uso de node-linkedin
// API utilizada : https://github.com/ArkeologeN/node-linkedin
var Linkedin = require('node-linkedin')('78o57t1q9klrb5', 'ClTqv24AmtiHWpK2');
//Archivo para invocar diferentes metodos
var linkedin_data = require('./lib/lib_linkedin/linkedin');

//require('./lib/auth');

var app = express();
app.set('view engine','ejs');
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieSession({

    keys: ['secret1']
}));

app.use(passport.initialize());
app.use(passport.session());


app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))
app.set('views', __dirname+'/views');

app.get('/', function(req, res, next) {
	res.redirect('/login');
});			

app.get('/login', function(req, res, next) {
	res.render('index');
});

/*
	Los scopes estan limitados a solo el uso de r_basicprofile, se espera a que linkedin otorge acceso 
	a r_fullprofile en un plazo de 15 dias (21 oct 2015)
	Para mayor información:
		https://developer.linkedin.com/docs/fields 
		https://developer.linkedin.com/docs/fields/full-profile
*/
app.get('/oauth/linkedin',function (req, res){
	var scope = ['r_basicprofile'];
	console.log(Linkedin.auth);
    Linkedin.auth.setCallback(req.protocol + '://' + req.headers.host + '/oauth/linkedin/callback');
    Linkedin.auth.authorize(res, scope);
});

app.get('/oauth/linkedin/callback', function(req, res) {
    Linkedin.auth.getAccessToken(res, req.query.code, req.query.state, function(err, results) {
	// Solicitamos accessToken para poder acceder a la información permitida de la API desde linkedin.
      var linkedin = Linkedin.init(results.access_token);
      proccessLinkedInData(linkedin);
      red.redirect('/');
  	});
  	//Fail 
  	res.redirect('/')
 });


/*
Passport LinkedIn

app.get('/auth/linkedin/callback', 
  passport.authenticate('linkedin');

app.get('/auth/linkedin/callback', 
  passport.authenticate('linkedin', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

proccessLinkedInData = function(accessToken, profile){
	console.log(accessToken);
	console.log(profile);
}

*/

proccessLinkedInData = function(linkedin){
	linkedin_data.getUser(linkedin, function(user) {
		console.log(user);
	});
}

app.listen(app.get('port'), function() {
	console.log("Node app is running at localhost:" + app.get('port'))
});


