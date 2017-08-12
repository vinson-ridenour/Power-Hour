$(document).ready(function(){
	//Document loaded").val(), create event listeners
	$("#subAccount").on("click", processAccount);
})

function processAccount() {
	//create user object

	var user = {
		"uuid": $("#uuidInput").val().trim(),
		"first_name": $("#fnameInput").val().trim(),
		"last_name": $("#lnameInput").val().trim(),
		"address": $("#addressInput").val().trim(),
		"city": $("#cityInput").val().trim(),
		"state": $("#stateInput").val().trim(),
		"zip": $("#zipInput").val().trim(),
		"email_address": $("#emailInput").val().trim(),
		"phone": $("#phoneInput").val().trim()
	}

	console.log(user);
	//pass user to AJAX
	$.ajax({
		"method": "POST",
		"url": "/users/add",
		"data": user
	})
	.done(function() {
		console.log("AJAX done");
		//redirect to dashboard
		window.location.href = "/dashboard";
	})
	.error(function(err){
		console.log(err);
	});
}