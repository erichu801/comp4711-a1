window.addEventListener('load', () => {

	const formEl = $('.form');
	let displayName;

	// Local Video
	const localVideoEl = $('#localVid');

	const remoteVideosEl = $('#remoteVids');
	let extUsrCount = 0;

	// Add validation rules to Create/Join Room Form
	formEl.form({
		fields: {
			roomKey: 'empty',
			username: 'empty',
		},
	});

	console.log("load");

	// create our WebRTC connection
	const webrtc = new SimpleWebRTC({
		// the id/element dom element that will hold "our" video
		localVideoEl: 'localVid',
		// the id/element dom element that will hold remote videos
		remoteVideosEl: 'remoteVids',
		// immediately ask for camera access
		autoRequestMedia: true,
	});

	// We got access to local camera
	webrtc.on('localStream', () => {
		localVideoEl.show();
	});

	// Remote video was added
	webrtc.on('videoAdded', (video, peer) => {
		console.log("here");
		const id = webrtc.getDomId(peer);
		if (extUsrCount === 0) {
			remoteVideosEl.html('<video id=' + id + '></video>');
		} else {
			remoteVideosEl.append('<video id=' + id + '></video>');
		}
		extUsrCount++;
	});
 

	$('.submit').on('click', (event) => {
		if (!formEl.form('is valid')) {
		  return false;
		}
		displayName = $('#displayName').val();
		const roomKey = $('#roomKey').val().toLowerCase();
		if (event.target.id === 'create-btn') {
		  createRoom(roomKey);
		} else {
		  joinRoom(roomKey);
		}
		return false;
	  });
});