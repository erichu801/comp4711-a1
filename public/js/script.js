window.addEventListener('load', () => {
	// Local Video
	const localVid = $('#localVid');

	const webrtc = new SimpleWebRTC({
		// the id/element dom element that will hold "our" video
		localVid: 'localVid',
		// immediately ask for camera access
		autoRequestMedia: true,
	});
	// Local camera
	webrtc.on('localStream', () => {
		localVid.show();
	});
});