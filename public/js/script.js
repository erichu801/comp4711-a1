window.addEventListener('load', () => {
	// Local Video
	const localVideoEl = $('#vid');

	const webrtc = new SimpleWebRTC({
		// the id/element dom element that will hold "our" video
		localVideoEl: 'vid',
		// immediately ask for camera access
		autoRequestMedia: true,
	});
	// We got access to local camera
	webrtc.on('localStream', () => {
		localVideoEl.show();
	});
});