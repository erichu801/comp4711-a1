window.addEventListener('load', () => {
	// Local Video
	const localVidObj = $('#localVid');

	// Remote Videos
	const remoteVidObj = $('#remoteVid');
	let linksCount = 0;

	const webrtc = new SimpleWebRTC({
		// the id/element dom element that will hold "our" video
		remoteVidObj: 'localVid',
		// the id/element dom element that will hold remote videos
		remoteVidObj: 'remoteVid',
		// immediately ask for camera access
		autoRequestMedia: true,
	});
	// We got access to local camera
	webrtc.on('localStream', () => {
		localVidObj.show();
	});

	// Remote video was added
	webrtc.on('videoAdded', (video, peer) => {
		const id = webrtc.getDomId(peer);
		const html = remoteVideoTemplate({ id });
		if (linksCount == 0) {
			remoteVidObj.html(html);
		} else {
			remoteVidObj.append(html);
		}
		$(`#${id}`).html(video);
		linksCount ++;
	});
});