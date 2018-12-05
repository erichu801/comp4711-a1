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
		<div class="row">
			<div class="col">
				<h4 id="localId">You</h4>
				<video id="localVid" autoplay></video>
			</div>
			<div class="col" id="user-list">
				<h3 id="users">Users in this room</h3>
				<div id="list"></div>
			</div>
		</div>
		<div class="row" id="remoteVids">
		</div>
	`);
};

const copyLink = () => {
	let copyText = document.getElementById("share-link");
	copyText.select();
	document.execCommand("copy");
}