
var xhr = new XMLHttpRequest();
var twitchjson = new XMLHttpRequest();

xhr.onload = function () {
	if (xhr.status === 200) {
		res = JSON.parse(xhr.responseText).streamers;

		var streamers = res.map(function (streamer) {
			return streamer.stream;
		});
		//build string with new content (can also use DOM manip

		var html = [];
		console.log(streamers);
		//for (var i = 0; i < responseObject.streamers.length; i++) {
		streamers.forEach(function (name) {
			streamBio(name, function (bio) {
				var newStreamer = '';
				newStreamer += '<div class="streamers">';
				newStreamer += '<h1>' + bio.display_name + '</h1>';
				newStreamer += '<iframe src="http://player.twitch.tv/?channel=' + name + '&muted=true"';
				newStreamer += ' height="300"';
				newStreamer += ' width="400"';
				newStreamer += ' frameborder="0"';
				newStreamer += ' scrolling="no"';
				newStreamer += ' allowfullscreen="true"></iframe>';
				//newStreamer += '<iframe src="https://twitch.tv/chat/embed?channel=' + responseObject.streamers[i].stream + '" height="300" width="300"></iframe>';
				newStreamer += '</div>';
				html.push(newStreamer);
				document.getElementById('stream-table').insertAdjacentHTML('beforeEnd', newStreamer);
			});
		});
		console.log(html);
	}
};

function streamBio(user, cb) {
	console.log('user', user);
	twitchjson.open('GET', 'https://api.twitch.tv/kraken/users/?login=' + user + '&client_id=<clientid>&api_version=5', false);
	twitchjson.onreadystatechange = function () {
		if (twitchjson.readyState === XMLHttpRequest.DONE && twitchjson.status === 200) {
			userInfo = JSON.parse(twitchjson.responseText);
			console.log(userInfo.users[0]);
			cb(userInfo.users[0]);
		}
	}
	twitchjson.send();
};

xhr.open('GET', 'js/streamers.json', true);
xhr.send(null); 
