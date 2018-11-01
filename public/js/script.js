window.addEventListener('load', () => {
	// Local Video
	const localVid = $('#localVid');

	// Remote Videos
	const remoteVideoTemplate = Handlebars.compile($('#remote-video-template').html());
	const remoteVid = $('#remoteVid');
	let linksCount = 0;

	const webrtc = new SimpleWebRTC({
		// the id/element dom element that will hold "our" video
		localVid: 'localVid',
		// the id/element dom element that will hold remote videos
		remoteVid: 'remoteVid',
		// immediately ask for camera access
		autoRequestMedia: true,
	});
	// We got access to local camera
	webrtc.on('localStream', () => {
		localVid.show();
	});

	// Remote video was added
	webrtc.on('videoAdded', (video, peer) => {
		const id = webrtc.getDomId(peer);
		const html = remoteVideoTemplate({ id });
		if (linksCount === 0) {
			remoteVid.html(html);
		} else {
			remoteVid.append(html);
		}
		$(`#${id}`).html(video);
		$(`#${id} video`).addClass('ui image medium'); // Make video element responsive
		linksCount ++;
	});
});