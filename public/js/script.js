window.addEventListener('load', () => {
	// Local Video
	const localVidObj = $('#localVid');

	const webrtc = new SimpleWebRTC({
		// the id/element dom element that will hold "our" video
		remoteVidObj: 'localVid',
		// immediately ask for camera access
		autoRequestMedia: true,
	});
	// We got access to local camera
	webrtc.on('localStream', () => {
		localVidObj.show();
	});
});