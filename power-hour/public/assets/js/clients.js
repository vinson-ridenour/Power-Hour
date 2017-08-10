function saveClient(){
	var client = {
		"client_name": $("#client_name").val(),
		"user_id": $("#user_id").val().trim()
	}

	$.ajax({
		"method": "POST",
		"url": "/clients/add",
		"data": client
	})
	.done(function() {
		console.log("AJAX done");
		//Update Select to populate with new items
		getClients();
		$("#client_form").modal("hide");
	})
	.error(function(err){
		console.log(err);
	});
}

function getClients() {
	var data = {
		"user_id": $("#user_id").val()
	}
	$.ajax({
		"method": "GET",
		"url": "/clients/list/" + data.user_id
	})
	.done(function(response) {
		displayClients(response);
		displayClientsButtons(response);
//		displayClientsAccordion(response);
	})
	.error(function(err){
		console.log(err);
	});
}

function displayClients(clients) {
	//Empty select dropdown
	$("#client_id").empty();

	//loop through clients array and add to client_id select dropdown
	for (var i = 0; i < clients.length; i++){
		var option_value = $("<option>");
		option_value.attr("value", clients[i].client_id);
		if(i === 0) {
			option_value.attr("selected", "selected");
			getProjects(clients[i].client_id);
		}
		option_value.html(clients[i].client_name);
		$("#client_id").append(option_value);
	}
		$("#client_id").prepend("<option></option>")
	/*
	if (clients.length == 1) {
		$("#client_id").append("<option></option>")
	} 
*/
	$("#client_id").append("<option value='-1'>New Client</option>")

}

function displayClientsAccordion(clients) {
	//empty mainMenu
	$("#mainMenu").empty();

	//Build out panels for clients
	for (var i = 0; i < clients.length; i++){
		var panel = $("<div>");
		panel.addClass("list-group panel clientPanels")

		var anchor = $("<a>");
		anchor.addClass("list-group-item list-group-item-success");
		anchor.attr("href", "clientID_" + clients[i].client_id);
		anchor.attr("data-toggle", "collapse");
		anchor.attr("data-parent", "mainMenu");
		anchor.html(clients[i].client_name);

		var projects = $("<div>");
		projects.addClass("collapse");
		projects.attr("id", "projects_clientID_" + clients[i].client_id);

		//append anchor to panel
		anchor.after(projects);
		//append anchor to panel
		$(panel).append(anchor);

		//append to mainMenu
		$("#mainMenu").append(panel);
	}
}

function displayClientsButtons(clients) {
	//Display Client Names as buttons
	for (var i = 0; i < clients.length; i++){
		var buttons = $("<button>");
		buttons.attr("id", "clientID_" + clients[i].client_id);
		buttons.addClass("client-entries");
		buttons.html(clients[i].client_name);
		$("#clientButtons").append(buttons);
	}
}
