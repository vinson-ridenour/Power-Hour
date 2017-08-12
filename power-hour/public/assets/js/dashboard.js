$(document).ready(function(){
	//Document loaded, create event listeners

	$("#subEntry").on("click", function(){
		event.preventDefault();
		createEntry();
	});

	$("#client_name_container").on("change", "#client_id", function(){
		var selectedClient = $(this).val();
		if (selectedClient == -1) {
			//pop up modal to fill in client information
			$('#client_form').modal()
		}
		else {
			getProjects();
		}
	});

	$("#client_save").on("click", function(){
		saveClient();
	});

	$("#project_name_container").on("change", "#project_id", function(){
		var selectedProject = $(this).val();
		if (selectedProject == -1) {
			//pop up modal to fill in client information
			$('#project_form').modal();
		}
	});

	$("#project_save").on("click", function(){
		saveProject();
	});

	$("#clientButtons").on("click", ".client-entries", function(){
		var clientID = $(this).attr("id");
		clientID = clientID.split("_")[1];

		showProjectEntries(clientID);
	});

	$("#time_end").on("change", function(){
		console.log("time_end changed")
		//date_start = 04-Oct-1980
		var startTime = $("#date_start").val().trim() + ' ' + $("#time_start").val().trim();
		startTime = moment(startTime, "MM/DD/YYYY hh:mm a")

		var endTime = $("#date_start").val().trim() + ' ' + $("#time_end").val().trim();
		endTime = moment(endTime, "MM/DD/YYYY hh:mm a")

		var totalTime = endTime.diff(startTime, "minutes");
		totalTime = totalTime / 60;

		$("#time_total").val(totalTime);
	});

	$("#time_end").on("change", function(){
		console.log("time_end changed")
		//date_start = 04-Oct-1980
		var startTime = $("#date_start").val().trim() + ' ' + $("#time_start").val().trim();
		startTime = moment(startTime, "MM/DD/YYYY hh:mm a")

		var endTime = $("#date_start").val().trim() + ' ' + $("#time_end").val().trim();
		endTime = moment(endTime, "MM/DD/YYYY hh:mm a")

		var totalTime = endTime.diff(startTime, "minutes");
		totalTime = (totalTime / 60).toFixed("2");


		$("#time_total").val(totalTime);
	});

})

//Initialize time and date pickers
$(function() {
	$("#date_start").datepicker();
	$("#time_start").timepicker({'step': 5});
	$("#time_end").timepicker({'step': 5});
});

function createEntry() {

	var entry = {
		"user_id": $("#user_id").val().trim(),
		"client_id": $("#client_id").val().trim(),
		"project_id": $("#project_id").val().trim(),
		"date": $("#date_start").val().trim(),
		"start_time": startTime.format(),
		"end_time": endTime.format(),
		"description": $("#description").val().trim(),
		"pay_rate": $("#pay_rate").val().trim(),
		"total_pay": $("#total_pay").val().trim(),
		"total_hours": $("#time_total").val().trim(),
		"time_entry_active": $("#time_entry_active").val().trim()
	}
	//pass user to AJAX
	console.log(entry);

	$.ajax({
		"method": "POST",
		"url": "/time-entry/add",
		"data": entry
	})
	.done(function() {
		//redirect to dashboard
//		window.location.href = "/dashboard";
		//clear form entries
		$("#time-entry").trigger("reset");
	})
	.error(function(err){
		console.log(err);
	});
}

function showProjectEntries(clientID) {
	$("#testArea").load( "/time-entry/all/" + clientID );
}