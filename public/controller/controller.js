window.addEventListener('load', () => {
    genUI();

    urlString = window.location.href;
    url = new URL(urlString);
    let roomKey = url.searchParams.get("roomKey");

    //alert(url);
    //alert(roomKey);
    //window.location.assign("https://www.w3schools.com");

    //Form element
	const form = $('.form-group');

    //Local video element
	const localVideoEl = $('#localVid');

    //Div to add remote videos
	      //const remoteVideosEl = $('#remoteVids');
          if (numRemotes == 1) {
            const remoteVideosEl = $('#remoteVids1');
        }
        else if (numRemotes == 2) {
            const remoteVideosEl = $('#remoteVids2');
        }
        else if (numRemotes == 3) {
            const remoteVideosEl = $('#remoteVids3');
        }
        else if (numRemotes == 4) {
            const remoteVideosEl = $('#remoteVids4');
        }
        else if (numRemotes == 5) {
            const remoteVideosEl = $('#remoteVids5');
        }
        else if (numRemotes > 5){
            return;
        }
            
    
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
 
/*

    //Create room when Create Room button is clicked
	$('#btnCreate').on('click', () => {
        if($('#displayName').val() != '') {
            displayName = $('#displayName').val();
            const roomKey = $('#roomKey').val().toLowerCase();
            createRoom(roomKey);
            $('#localId').html(displayName);
        } else {
            alert("Please enter a display name");
        }
	});

*/



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
        /*
        remoteVideosEl.append(
            `<h4 id=h` + numRemotes + `>Display Name</h4>`
        );

        */
		
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
    
/*

    if(roomKey != null) {
        joinRoom(roomKey);
    }

*/

});