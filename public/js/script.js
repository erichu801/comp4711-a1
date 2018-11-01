window.addEventListener('load', () => {
	// Local Video
	const localVideoEl = $('#localVid');

	// Remote Videos
	const remoteVideoTemplate = Handlebars.compile($('#remote-video-template').html());
	const remoteVideosEl = $('#remoteVid');
	let remoteVideosCount = 0;

	const webrtc = new SimpleWebRTC({
		// the id/element dom element that will hold "our" video
		localVideoEl: 'localVid',
		// the id/element dom element that will hold remote videos
		remoteVideosEl: 'remoteVid',
		// immediately ask for camera access
		autoRequestMedia: true,
	});
	// We got access to local camera
	webrtc.on('localStream', () => {
		localVideoEl.show();
	});
});