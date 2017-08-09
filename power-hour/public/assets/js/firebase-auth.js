initApp = function() {
firebase.auth().onAuthStateChanged(function(user) {
	var userDB;
	if (user) {
	// User is signed in.
	var displayName = user.displayName;
	var email = user.email;
	var emailVerified = user.emailVerified;
	var photoURL = user.photoURL;
	var uid = user.uid;
	var phoneNumber = user.phoneNumber;
	var providerData = user.providerData;
	user.getIdToken().then(function(accessToken) {
		checkUser(uid);
	});
		$("#uuidInput").val(uid);
	} else {
	// User is signed out.
	console.log('user is not signed in');
	//User is not signed in, redirect to root
		//Only redirect if NOT on index
		if (window.location.pathname != "/") {
			window.location.href = "/";
		}
	}
}, function(error) {
	console.log(error);
});
};

window.addEventListener('load', function() {
	initApp()
});

function checkUser(uid) {
	//check if this UID exists
	$.get( "users/list/" + uid )
	.done(function(response){
		if (response.length === 0) {
			//no account found, create redirect to create
			if (window.location.pathname != "/" && window.location.pathname != "/account") {
				window.location.href = '/account';
			}
		}
		else {
			//account found, go to dashboard
			if (window.location.pathname != "/" && window.location.pathname != "/dashboard") {
				console.log("i want to redirect to dashboard")
				window.location.href = '/dashboard';
			}
		}
		$("#user_id").val(response[0].user_id);
	})
	.error(function(err){
		console.log(err);
	});
}