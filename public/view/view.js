//Generate the User Interface
const genUI = () => {
	$('.container').html(`
		<div class="row">
			<div class="col-sm">
				<div class="form-group">
					<label>Display Name</label>
					<input type="text" class="form-control input-sm" id="displayName" name="displayName">
					<label>Room Key</label>
					<input type="text" class="form-control input-sm" id="roomKey" name="roomKey">
					<br>
					<button id="btnCreate" class="btn btn-success">Create Room</button>
					<button id="btnJoin" class="btn btn-info">Join Room</button>					
				</div>
			</div>
			<div class="col-sm"></div>
			<div class="col-sm"></div>
		</div>
		<div>
			<h4 id="localId">You</h4>
			<video id="localVid" width="320" height="240" autoplay></video>
		</div>
		<div class="row">
			<div class="col-sm">
				<div id="remoteVids" class="col-sm"></div>
			</div>
			<div class="col-sm"></div>
			<div class="col-sm"></div>
		</div>
	`);
};