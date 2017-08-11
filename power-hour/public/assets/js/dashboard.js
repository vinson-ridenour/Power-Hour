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
	$( "#testArea" ).load( "time-entry/all" );
})

//Initialize time and date pickers
$(function() {
	$("#date_start").datepicker();
	$("#time_start").timepicker({
		'step': 5,
		'scrollDefault': 'now'
		// 'showDuration': true
	});
	$("#time_end").timepicker({
		'step': 5,
		'scrollDefault': 'now'
		// 'showDuration': true
	});
});

// $("#time_start").ForceNumericOnly();
// $("#time_end").ForceNumericOnly();

// jQuery.fn.ForceNumericOnly =
// function()
// {
//     return this.each(function()
//     {
//         $(this).keydown(function(e)
//         {
//             var key = e.charCode || e.keyCode || 0;
//             // allow backspace, tab, delete, enter, arrows, numbers and keypad numbers ONLY
//             // home, end, period, and numpad decimal
//             return (
//                 key == 8 || 
//                 key == 9 ||
//                 key == 13 ||
//                 key == 46 ||
//                 key == 110 ||
//                 key == 190 ||
//                 (key >= 35 && key <= 40) ||
//                 (key >= 48 && key <= 57) ||
//                 (key >= 96 && key <= 105));
//         });
//     });
// };

function createEntry() {
	var entry = {
		"user_id": $("#user_id").val().trim(),
		"client_id": $("#client_id").val().trim(),
		"project_id": $("#project_id").val().trim(),
		"date": $("#date_start").val().trim(),
		"start_time": $("#date_start").val().trim(),
		"end_time": $("#date_start").val().trim(),
		"description": $("#description").val().trim(),
		"pay_rate": $("#pay_rate").val().trim(),
		"total_pay": $("#total_pay").val().trim(),
		"total_hours": $("#time_total").val().trim(),
		"time_entry_active": $("#time_entry_active").val().trim()
	}
		console.log(entry);
	//pass user to AJAX
	$.ajax({
		"method": "POST",
		"url": "/time-entry/add",
		"data": entry
	})
	.done(function() {
		console.log("AJAX done");
		//redirect to dashboard
//		window.location.href = "/dashboard";
	})
	.error(function(err){
		console.log(err);
	});
}