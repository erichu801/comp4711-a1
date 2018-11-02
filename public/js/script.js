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
		const html = remoteVideoTemplate({ id });
		if (extUsrCount === 0) {
			remoteVideosEl.html(html);
		} else {
			remoteVideosEl.append(html);
		}
		$(`#${id}`).html(video);
		extUsrCount++;
	});
 
});