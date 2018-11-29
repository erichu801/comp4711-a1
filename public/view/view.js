//Generate the User Interface
const genUI = () => {
	$('.container').html(`
		<div class="row">
			<div class="col-sm">
				<div class="form-group">
					<label>Display Name</label>
					<input type="text" class="form-control input-sm" id="displayName" placeholder="Enter display name" name="displayName">
					` +
					//<label>Room Key</label>
					//<input type="text" class="form-control input-sm" id="roomKey" placeholder="Enter room key" name="roomKey">
					`<br>
					` +
					//<button id="btnCreate" class="btn btn-success">Create Room</button>
					`<button id="btnJoin" class="btn btn-info">Join Room</button>					
				</div>
			</div>
			<div class="col-sm"></div>
			<div class="col-sm"></div>
		</div>
		<div>
			<h4 id="localId">You</h4>
			<video id="localVid" width="320" height="240" autoplay></video>
		</div>
		<div id="video_row" class="row">
			<div class="col-sm-1">
				<div id="remoteVids1" class="col-sm"></div>
			</div>
			<div class="col-sm-1">
				<div id="remoteVids2" class="col-sm"></div>
			</div>
			<div class="col-sm-1">
				<div id="remoteVids3" class="col-sm"></div>
			</div>
			<div class="col-sm-1">
				<div id="remoteVids4" class="col-sm"></div>
			</div>
			<div class="col-sm-1">
				<div id="remoteVids5" class="col-sm"></div>
			</div>
		</div>
	`);
};