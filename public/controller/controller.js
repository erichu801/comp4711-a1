window.addEventListener('load', () => {
    genUI();

    urlString = window.location.href;
    url = new URL(urlString);
    let roomKey = url.searchParams.get("roomKey");
    let captcha = url.searchParams.get("captcha");

    //Form element
	const form = $('.form-group');

    //Local video element
	const localVideoEl = $('#localVid');

    //Div to add remote videos
	const remoteVideosEl = $('#remoteVids');

    //Create new SimpleWebRTC object
	const webrtc = new SimpleWebRTC({
		localVideoEl: 'localVid',
		remoteVideosEl: 'remoteVids',
        autoRequestMedia: true,
        media: { 
            audio: true,
            video: {
                mandatory: {
                    maxWidth: 320,
                    maxHeight: 240
                }
            }
        }
	});

    //Displays local video when available
	webrtc.on('localStream', () => {
		localVideoEl.show();
	});

    //Join room when Join Room button is clicked
	$('#btnJoin').on('click', () => {
        if($('#displayName').val() != '') {
            displayName = $('#displayName').val();
            //const roomKey = $('#roomKey').val().toLowerCase();
            joinRoom(roomKey);
            $('#localId').html(displayName);
        } else {
            alert("Please enter a display name");
        }
	});

    //Creates a chat room
	const createRoom = (roomKey) => {
		webrtc.createRoom(roomKey, (err, name) => {
			form.hide("slow");
		});
	};

    //Joins a chat room using roomKey
	const joinRoom = (roomKey) => {
		webrtc.joinRoom(roomKey);
		form.hide("slow");
	};

    //Adds a new video stream when a remote video is connected
	webrtc.on('videoAdded', (video, peer) => {
		numRemotes++;
        remoteVideosEl.append(
            `<h4 id=h` + numRemotes + `>Display Name</h4>`
        );
		
		webrtc.sendToAll("chat", {name: displayName, index: numRemotes});
	});
    
    //Removes display name when a remote video disconnects
    webrtc.on('videoRemoved', (video, peer) => {
        numRemotes--;
        $("#h" + numRemotes).remove();
    });

    //Updates display names when a message arrives
	webrtc.connection.on('message', (data) => {
		if(data.type === 'chat') {
			remoteNames = [];
			remoteNames.push(data.payload.name);
			for(let i = 0; i < remoteNames.length; i += data.payload.index) {
				$('#h' + data.payload.index).html(data.payload.name);
			}
		}
    });

    if(captcha == 1) {
        requestCaptcha();
    }
});

const requestCaptcha = () => {
    alert("test");
}