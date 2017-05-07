
var xhr = new XMLHttpRequest();
var twitchjson = new XMLHttpRequest();

xhr.onload = function() {

	if(xhr.status === 200) {
		res = JSON.parse(xhr.responseText).streamers;

		var streamers = res.map(function(streamer) {
			return streamer.stream;
		});
		//build string with new content (can also use DOM manip
		var newStreamer = '';

		//for (var i = 0; i < responseObject.streamers.length; i++) {
		streamers.forEach(function(name) {
			streamBio(name, function(bio) {
				console.log('bio',bio);
				newStreamer += '<div class="streamers">';
				newStreamer += '<h1>' + bio[0] + '</h1>';
				newStreamer += '<iframe src="http://player.twitch.tv/?channel=' + name + '&muted=true"'; 
				newStreamer += ' height="300"'; 
				newStreamer += ' width="400"';
				newStreamer += ' frameborder="0"'; 
				newStreamer += ' scrolling="no"';
				newStreamer += ' allowfullscreen="true"></iframe>';
				//newStreamer += '<iframe src="https://twitch.tv/chat/embed?channel=' + responseObject.streamers[i].stream + '" height="300" width="300"></iframe>';
				newStreamer += '</div>';
			});
		});
		document.getElementById('stream-table').insertAdjacentHTML('beforeEnd',newStreamer);
	}
};

function streamBio(user, cb) {
	twitchjson.open('GET', 'https://api.twitch.tv/kraken/users/?login=' + user + '&client_id=wxir5k9okp0mxg8m7px83zel59x6gs&api_version=5', true);
	twitchjson.send();

	twitchjson.addEventListener('readystatechange', processRequest, false);
	var info = '';
	function processRequest(e) {
		if (twitchjson.readyState == 4 && twitchjson.status === 200) {
			userInfo = JSON.parse(twitchjson.responseText);
			var name = userInfo.users[0].display_name;
			var bio =  userInfo.users[0].bio;
			var logo = userInfo.users[0].logo;
			var info = [name,bio,logo];
		}
	}
	cb(info);
	console.log('cb',info);
};

xhr.open('GET', 'js/streamers.json', true);
xhr.send(null); 
