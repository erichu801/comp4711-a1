window.addEventListener('load', () => {
	// Local Video
	const localVideoEl = $('#localVid');

	const remoteVideosEl = $('#remoteVids');
	let extUsrCount = 0;

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
		const id = webrtc.getDomId(peer);
		if (extUsrCount === 0) {
			remoteVideosEl.html(`<video id=` + id + `></video>`);
		} else {
			remoteVideosEl.append(`<video></video>`);
		}
		extUsrCount++;
	});
 
});