var businessname = "";

function verifyBusiness() {
	
	var name = document.getElementById("verify-bsn-name").value;

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

	$('#verifyModal').modal('hide');

	document.getElementById("business-name").value = businessname;
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
	var img = document.getElementById("business-img").value;
	var descrip = document.getElementById("business-descrip").value;

	if(firstname == "" || lastname == "" || grad_year == "" || new_businessname == "" || address == "" || 
		city == "" || state == "" || zip == "" || email == "" || phone == "" || tag == "" || descrip == "") {

		window.alert("Please fill out all fields.");
		exit();
	} else {
		$('#editModal').modal('hide');
	}

	var obj = { "firstname": firstname, "lastname": lastname, "year": grad_year, "business": businessname, "new_businessname": new_businessname, "address": address, "city": city, "state": state, "zip": zip, "email": email, "phone": phone, "tag": tag, "img": img, "descrip": descrip };
	var dbParam = JSON.stringify(obj);

	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {

	    	obj = xmlhttp.responseText;
	    	console.log(obj.res);
	    	window.alert("You have successfully submitted your edits!");
	    	window.location.href = "home.html";
	    }
	};
	xmlhttp.open("POST", "../php/editBusiness.php", true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send("x=" + dbParam);

}

document.getElementById("verify-business").onclick = verifyBusiness;
document.getElementById("continue").onclick = function() {
	if(document.getElementById("continue").classList.contains("disabled")) {
		exit();
	} else {
		openEditForm();
	}
}
document.getElementById("submit-changes").onclick = submitChanges;
