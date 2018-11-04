window.addEventListener('load', () => {

	const form = $('.form');
	let displayName;

	const localVideoEl = $('#localVid');

	const remoteVideosEl = $('#remoteVids');
	let numRemotes = 0;

	const webrtc = new SimpleWebRTC({
		localVideoEl: 'localVid',
		remoteVideosEl: 'remoteVids',
		autoRequestMedia: true,
	});

	webrtc.on('localStream', () => {
		localVideoEl.show();
	});
 

	$('#btnCreate').on('click', () => {
		displayName = $('#displayName').val();
		const roomKey = $('#roomKey').val().toLowerCase();
		createRoom(roomKey);
	});

	$('#btnJoin').on('click', () => {
		displayName = $('#displayName').val();
		const roomKey = $('#roomKey').val().toLowerCase();
		joinRoom(roomKey);
		
	});

	const createRoom = (roomKey) => {
		webrtc.createRoom(roomKey, (err, name) => {
			form.hide();
		});
	};

	const joinRoom = (roomKey) => {
		webrtc.joinRoom(roomKey);
		form.hide();
		webrtc.sendToAll("chat", {name: displayName, index: numRemotes});
	};

	webrtc.on('videoAdded', (video, peer) => {
		const id = webrtc.getDomId(peer);
		numRemotes++;
		remoteVideosEl.append(`<h4 id=h` + numRemotes + `>Display Name</h4>`);
		remoteVideosEl.append(`<video id=` + id + `></video>`);
		
		webrtc.sendToAll("chat", {name: displayName, index: numRemotes});
	});
	
	webrtc.connection.on('message', (data) => {
		if(data.type === 'chat') {
			$('#h' + data.payload.index).html(data.payload.name);
		}
	});
});