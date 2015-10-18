// API utilizada : https://github.com/nodenica/youtube-node
/*
	Modificaciones a la API:
	Se comento codigo de la API empezando en la linea 110.
	Se cambio el metodo, 'key' por 'access_token'
		self.setKey = function(key) {
    		self.addParam('key', key);
  		};
  	Se agrego el metodo
  		self.clearParams = function() {
    		self.Params = {};
  		};
*/
var YouTube = require('youtube-node');
var youTube = new YouTube();

/*
	Consultar API reference: https://developers.google.com/youtube/v3/docs/
	Metodo utilizado:
		-list :  	Returns a list of channel activity events that match the request criteria. 
					For example, you can retrieve events associated with a particular channel, 
					events associated with the user's subscriptions and Google+ friends, or the YouTube home page feed, 
					which is customized for each user.
	Posibles URIs a implementar:
		Lista de videos del usuario:
			https://developers.google.com/youtube/v3/docs/videos/list
		Subscripciones del usuario:
			https://developers.google.com/youtube/v3/docs/subscriptions/list
		Coleccion de una playlist mediante el id_playlist o playlists del usuario
			https://developers.google.com/youtube/v3/docs/playlists/list
			https://developers.google.com/youtube/v3/docs/playlistItems/list
		Regresa una coleccion de resultados en videos, listas y canales que coinciden con el query de busqueda
			https://developers.google.com/youtube/v3/docs/search/list
*/

/*
	Ejemplo de URI
	https://www.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2CcontentOwnerDetails%2Cstatistics%2Cstatus&mine=true&access_token=ya29.DwIf10FdFApgLXBYoD0P-3RNvhYvRs8rcYP1fysYHdYGARkPKdP2JMg31mLcE6hL3QNo
*/

/*
	Se obtiene informacion del canal del usuario autentificado
	Para mayor referencia consultar: https://developers.google.com/youtube/v3/docs/channels/list
*/
function getChannel (accessToken, fn) {
	youTube.clearParts();
	youTube.clearParams();
	youTube.addPart('snippet');
	youTube.addPart('contentDetails');
	youTube.addPart('contentOwnerDetails');
	youTube.addPart('statistics');
	youTube.addPart('status');

	youTube.addParam('part', youTube.getParts());
	youTube.addParam('mine', 'true');
	youTube.setKey(accessToken);
	youTube.request(youTube.getUrl('channels'), function(error, result) {
		fn(result);
	});
}
/*
	Actividad del usuario de su pagina de inicio
	Para mayor referencia consultar: https://developers.google.com/youtube/v3/docs/activities/list
*/

function getActivities (accessToken, id, fn) {
	youTube.clearParts();
	youTube.clearParams();
	youTube.addPart('snippet');
	youTube.addPart('contentDetails');

	youTube.addParam('part', youTube.getParts());
	youTube.addParam('mine', 'true');
	youTube.addParam('id', id);
	youTube.setKey(accessToken);
	youTube.request(youTube.getUrl('activities'), function(error, result) {
		fn(result);
	});
}
/*
	Obtiene los comentarios relacionados con el id del canal, se puede hacer un filtrado con una palabra clave:
		youTube.addParam('searchTerms', 'keyword');
	Se pueden obtener comentarios de un video en especifico
		youTube.addParam('videoId', video_id);
	Para mayor referencia consultar: https://developers.google.com/youtube/v3/docs/commentThreads/list
*/
function getComments (accessToken, id, fn) {
	youTube.clearParts();
	youTube.clearParams();
	youTube.addPart('snippet');
	//youTube.addPart('replies');

	youTube.addParam('part', youTube.getParts());
	youTube.addParam('channelId', id);
	youTube.setKey(accessToken);
	youTube.request(youTube.getUrl('commentThreads'), function(error, result) {
		fn(result);
	});
}

module.exports.getChannel = getChannel;
module.exports.getActivities = getActivities;
module.exports.getComments = getComments;