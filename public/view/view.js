

//Generate the User Interface
const genUI = () => {
	$('.container').html(`
		<div class="row">
			<div class="col-sm">
				<div class="form-group">
					<label>Display Name</label>
					<input type="text" class="form-control input-sm" id="displayName" placeholder="Enter display name" name="displayName">
					` +
					`<br>
					` +
					`
					<form action="?" method="POST">
						<div id="myCaptcha"></div>
					</form>
					<br>
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
		<div class="row" id="remoteVids">
		</div>
	`);
};
