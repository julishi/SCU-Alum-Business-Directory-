var businessname = "";

function verifyBusiness() {

	var name = document.getElementById("verify-bsn-name").value;

	if(name == "") {
		window.alert("Please enter your business name.");
		return;
	}

	var obj = { "name": name };
	var dbParam = JSON.stringify(obj);

	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {

	    	obj = JSON.parse(xmlhttp.responseText);
	    	// if(obj.found == 1) {
	    	// 	var msg = document.createElement("P");
	    	// 	msg.style.color = "limegreen";
	    	// 	msg.textContent = "Business verified.";
	    	// 	var message = document.getElementById("message");
	    	// 	message.replaceChild(msg, message.childNodes[0]);
				//
	    	// 	var cont_btn = document.getElementById("continue");
	    	// 	cont_btn.classList.remove("disabled");
				//
	    	// } else {
	    	// 	var msg = document.createElement("P");
	    	// 	msg.style.color = "red";
	    	// 	msg.textContent = "Business not found.";
	    	// 	var message = document.getElementById("message");
	    	// 	message.replaceChild(msg, message.childNodes[0]);
				//
	    	// 	var cont_btn = document.getElementById("continue");
	    	// 	if(!(cont_btn.classList.contains("disabled"))) {
	    	// 		cont_btn.classList.add("disabled");
	    	// 	}
	    	// }
				var verify_bsn = document.getElementById("verify-bsn-name");
				if(obj.found == 1) {
					if(verify_bsn.classList.contains("is-invalid")) {
						verify_bsn.classList.remove("is-invalid");
					}
	    		verify_bsn.classList.add("is-valid");

					var msg = document.createElement("P");
					msg.style.color = "limegreen";
					msg.textContent = "Business verified.";
					var message = document.getElementById("message");
					message.replaceChild(msg, message.childNodes[0]);

	    		var cont_btn = document.getElementById("continue");
	    		cont_btn.classList.remove("disabled");

	    	} else {
					if(verify_bsn.classList.contains("is-valid")) {
						verify_bsn.classList.remove("is-valid");
					}
					verify_bsn.classList.add("is-invalid");

	    		var msg = document.createElement("P");
	    		msg.style.color = "red";
	    		msg.textContent = "Business not found.";
	    		var message = document.getElementById("message");
	    		message.replaceChild(msg, message.childNodes[0]);

	    		var cont_btn = document.getElementById("continue");
	    		if(!(cont_btn.classList.contains("disabled"))) {
	    			cont_btn.classList.add("disabled");
	    		}
	    	}
	    }
	};
	xmlhttp.open("POST", "../php/verifyBusiness.php", true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send("x=" + dbParam);
}

function openEditForm() {
	businessname = document.getElementById("verify-bsn-name").value;

	var obj = { "businessname": businessname };
	var dbParam = JSON.stringify(obj);

	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {

			obj = JSON.parse(xmlhttp.responseText);

			$('#verifyModal').modal('hide');

			document.getElementById("business-name").value = businessname;
			document.getElementById("business-address").value = obj.address['ADDRESS'];
			document.getElementById("business-city").value = obj.address['CITY'];
			document.getElementById("state-select").value = obj.address['STATE'];
			document.getElementById("business-zip").value = obj.address['ZIPCODE'];
			document.getElementById("business-email").value = obj.contact['EMAIL'];
			document.getElementById("business-phone").value = obj.contact['PHONENUMBER'];
			document.getElementById("select-tag").value = obj.description[0]['TAG'];
			document.getElementById("business-descrip").value = obj.description[0]['COMMENTS'];
		}
	}
	xmlhttp.open("POST", "../php/getBusinessData.php", true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send("x=" + dbParam);
}

function submitChanges() {

	var firstname = document.getElementById("first-name").value;
	var lastname = document.getElementById("last-name").value;
	var grad_year = document.getElementById("grad_year-select").value;
	var new_businessname = document.getElementById("business-name").value;
	var address = document.getElementById("business-address").value;
	var city = document.getElementById("business-city").value;
	var state = document.getElementById("state-select").value;
	var zip = document.getElementById("business-zip").value;
	var email = document.getElementById("business-email").value;
	var phone = document.getElementById("business-phone").value;
	var tag = document.getElementById("select-tag").value;
	var descrip = document.getElementById("business-descrip").value;

	if(firstname == "" || lastname == "" || grad_year == "" || new_businessname == "" || address == "" ||
		city == "" || state == "" || zip == "" || email == "" || phone == "" || tag == "" || descrip == "") {

		window.alert("Please fill out all fields.");
		exit();
	} else {
		$('#editModal').modal('hide');
	}

	var form = document.forms.namedItem("editForm");
	var formData = new FormData(form);
	formData.append("old-name", businessname);

	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST", "../php/editBusiness.php", true);
	xmlhttp.onreadystatechange = function() {
		if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {

			obj = xmlhttp.responseText;
			window.alert("You have successfully submitted your edits! Edits will be shown after approval.");
	    	window.location.href = "home.html";
		}
	};
	xmlhttp.send(formData);

}

document.getElementById("verify-business").onclick = verifyBusiness;
document.getElementById("continue").onclick = function() {
	if(document.getElementById("continue").classList.contains("disabled")) {
		return;
	} else {
		openEditForm();
	}
}
document.getElementById("submit-changes").onclick = submitChanges;
