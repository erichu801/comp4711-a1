window.addEventListener('load', () => {

	const form = $('.form-group');

	const localVideoEl = $('#localVid');

	const remoteVideosEl = $('#remoteVids');

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
		$('#localId').html(displayName);
	});

	$('#btnJoin').on('click', () => {
		displayName = $('#displayName').val();
		const roomKey = $('#roomKey').val().toLowerCase();
		joinRoom(roomKey);
		$('#localId').html(displayName);
	});

	const createRoom = (roomKey) => {
		webrtc.createRoom(roomKey, (err, name) => {
			form.hide("slow");
		});
	};

	const joinRoom = (roomKey) => {
		webrtc.joinRoom(roomKey);
		form.hide("slow");
	};

	webrtc.on('videoAdded', (video, peer) => {
		const id = webrtc.getDomId(peer);
		numRemotes++;
        
        remoteVideosEl.append(
            `<h4 id=h` + numRemotes + `>Display Name</h4>`
        );
		
		webrtc.sendToAll("chat", {name: displayName, index: numRemotes});
	});
	
	webrtc.connection.on('message', (data) => {
		if(data.type === 'chat') {
			remoteNames = [];
			remoteNames.push(data.payload.name);
			
			for(let i = 0; i < remoteNames.length; i += data.payload.index) {
				$('#h' + data.payload.index).html(data.payload.name);
			}
		}
	});

});