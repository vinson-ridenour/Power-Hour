function saveProject(){
	var project = {
		"project_name": $("#project_name").val().trim(),
		"client_id": $("#client_id").val()
	}

	$.ajax({
		"method": "POST",
		"url": "/projects/add",
		"data": project
	})
	.done(function() {
		console.log("AJAX done");
		//Update Select to populate with new items
		getProjects();
		$("#project_form").modal("hide");
	})
	.error(function(err){
		console.log(err);
	});
}

function getProjects() {
	var data = {
		"user_id": $("#user_id").val(),
		"client_id": $("#client_id").val()
	}

	$.ajax({
		"method": "GET",
		"url": "/projects/list/read/" + data.client_id
	})
	.done(function(response) {
		displayProjects(response);
	})
	.error(function(err){
		console.log(err);
	});
}

function displayProjects(projects){
	//Empty select dropdown
	$("#project_id").empty();

	//loop through projects array and add to project_id select dropdown
	for (var i = 0; i < projects.length; i++){
		var option_value = $("<option>");
		option_value.attr("value", projects[i].project_id);
		if(i === 0) {
			option_value.attr("selected", "selected");
		}
		option_value.html(projects[i].project_name);
		$("#project_id").append(option_value);
	}
	if (projects.length < 1) {
		$("#project_id").append("<option></option>")
	} 
	$("#project_id").append("<option value='-1'>New Project</option>")
}