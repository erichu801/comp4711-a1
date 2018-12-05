let hasName = false;
let hasCaptcha = true;

window.addEventListener('load', () => {
    genUI();

    urlString = window.location.href;
    url = new URL(urlString);
    let roomKey = url.searchParams.get("roomKey");
    let captcha = url.searchParams.get("captcha");

    $('#share-link').val(urlString);

    if(captcha == 1) {
        hasCaptcha = false;
        let captchaWidgetId = grecaptcha.render( 'myCaptcha', {
            'sitekey' : '6LeNYXwUAAAAAEda1v2wFBTNuHrUmFtBH5XMcOWD',  // required
            'callback': 'verifyCallback'  // optional
        });
    }

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
            hasName = true;
        } else {
            alert("Please enter a display name");
        }

        if(!hasCaptcha) {
            alert("Please verify captcha");
        }

        if(hasCaptcha && hasName) {
            displayName = $('#displayName').val();
            joinRoom(roomKey);
            $('#localId').html(displayName);
        }
	});

    //Joins a chat room using roomKey
	const joinRoom = (roomKey) => {
		webrtc.joinRoom(roomKey);
		form.hide("slow");
	};

    //Adds a new video stream when a remote video is connected
	webrtc.on('videoAdded', (video, peer) => {
        numRemotes++;		

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
            console.log(remoteNames);
			for(let i = 0; i < remoteNames.length; i += data.payload.index) {
				$('#h' + data.payload.index).html(data.payload.name);
			}
		}
    });

});

var verifyCallback = function( response ) {
    hasCaptcha = true;
    console.log( 'g-recaptcha-response: ' + response );
};