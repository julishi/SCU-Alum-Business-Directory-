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

function submitDelete() {

	var firstname = document.getElementById("first-name").value;
	var lastname = document.getElementById("last-name").value;
	var grad_year = document.getElementById("grad_year-select").value;
	var phone = document.getElementById("contact-phone").value;
  var requester = document.getElementById("requester-name").value;

	if(firstname == "" || lastname == "" || grad_year == "" || phone == "" || requester == "") {

		window.alert("Please fill out all fields.");
		exit();
	} else {
		$('#deleteModal').modal('hide');
	}

  var obj = { "firstname": firstname, "lastname": lastname, "grad_year": grad_year, "businessname": businessname, "phone": phone, "requester": requester};
  var dbParam = JSON.stringify(obj);

	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {

			obj = xmlhttp.responseText;
      window.alert("You have successfully submitted your deletion! Deletions will be shown after approval.");
      window.location.href = "home.html";
		}
	}
	xmlhttp.open("POST", "../php/deleteBusiness.php", true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send("x=" + dbParam);
}

document.getElementById("verify-business").onclick = verifyBusiness;
document.getElementById("continue").onclick = function() {
	if(document.getElementById("continue").classList.contains("disabled")) {
		return;
	} else {
    businessname = document.getElementById("verify-bsn-name").value;
		$('#verifyModal').modal('hide');
	}
}
document.getElementById("submit-delete").onclick = submitDelete;
