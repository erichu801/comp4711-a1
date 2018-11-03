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
			postMessage(displayName + ` created chatroom`);
		});
	};

	const joinRoom = (roomKey) => {
		webrtc.joinRoom(roomKey);
		form.hide();
		postMessage(displayName + ` joined chatroom`);
	};

	webrtc.on('videoAdded', (video, peer) => {
		const id = webrtc.getDomId(peer);
		if (numRemotes === 0) {
			remoteVideosEl.append('<video id=' + id + '></video>');
		} else {
			remoteVideosEl.append('<video id=' + id + '></video>');
		}
		numRemotes++;
	});

	let postMessage = (data) => {
		console.log(displayName);
		webrtc.sendToAll('chat', {message: displayName});
	};
	
	webrtc.connection.on('message', (data) => {
		console.log(data.type);
		if(data.type === 'chat'){
			console.log('chat received', data);
			console.log('<br><br>' + data.payload.message);
		}
	});
});