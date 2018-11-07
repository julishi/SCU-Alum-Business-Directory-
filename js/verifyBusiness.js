function verifyBusiness() {
	
	var name = document.getElementById("verify-bsn-name");

	if(name == "") {
		window.alert("Please enter your business name.");
		exit();
	}

	var obj = { "name": name };
	var dbParam = JSON.stringify(obj);

	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {

	    	obj = JSON.parse(xmlhttp.responseText);
	    	if(obj.found == 1) {
	    		var msg = document.createElement("P");
	    		msg.style.color = "limegreen";
	    		msg.textContent = "Business verified.";
	    		var message = document.getElementById("message");
	    		message.replaceChild(msg, message.childNodes[0]);

	    		var cont_btn = document.getElementById("continue");
	    		cont_btn.classList.remove("disabled");

	    	} else {
	    		var msg = document.createElement("P");
	    		msg.style.color = "red";
	    		msg.textContent = "Business not found.";
	    		var message = document.getElementById("message");
	    		message.replaceChild(msg, message.childNodes[0]);
	    	}
	    }
	};
	xmlhttp.open("POST", "php file", true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send("x=" + dbParam);
}

function openEditForm() {
	var businessname = document.getElementById("verify-bsn-name").value;

	$('#verifyModal').modal('hide');

	document.getElementById("business-name").textContent = businessname;
}

document.getElementById("verify-business").onclick = verifyBusiness;
document.getElementById("continue").onclick = function() {
	if(document.getElementById("continue").classList.contains("disabled")) {
		exit();
	} else {
		openEditForm();
	}
}
