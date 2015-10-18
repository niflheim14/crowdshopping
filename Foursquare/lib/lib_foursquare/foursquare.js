var config = require('./config'),
// API utilizada : https://github.com/clintandrewhall/node-foursquare
Foursquare = require('node-foursquare')(config);
/*
	Obtiene informacion mas relevante del usuario, y con el uso de 'explore'
	podemos obtener los sitios de interes para el usuario, para mas referencia
	consultar: 

	https://developer.foursquare.com/docs/
	https://developer.foursquare.com/docs/users/users
	https://developer.foursquare.com/docs/venues/explore

*/
function getUser(accessToken, fn) {
	Foursquare.Users.getUser('self', accessToken, function (error, data) {
		fn(data);
     });
}
function getVenueHistory(accessToken, fn) {
	Foursquare.Users.getVenueHistory(null, null, accessToken, function (error, data) {
		fn(data);
     });
}
/*
	Los primeros dos parametros son la latitud a buscar.
	La latitud de un usuario se puede obtener mediante su direccion IP
	con el uso de las APIS: 
		https://github.com/un33k/node-ipware
		https://github.com/bluesmoon/node-geoip
	Se puede implementar un radio, query y seccion para obtener lugares mas especificos:
	https://developer.foursquare.com/docs/venues/explore
*/
function explore(accessToken, fn) {
	Foursquare.Venues.explore(null, null, 'Queretaro', ['sushi'], accessToken, function (error, data) {
		fn(data);
     });
}
module.exports.getUser = getUser;
module.exports.getVenueHistory = getVenueHistory;
module.exports.explore = explore;

