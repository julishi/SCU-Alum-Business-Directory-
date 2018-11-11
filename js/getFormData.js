function getFormData() {

	var firstname = document.getElementById("first-name").value;
	var lastname = document.getElementById("last-name").value;
	var grad_year = document.getElementById("grad_year-select").value;
	var business = document.getElementById("business-name").value;
	var address = document.getElementById("business-address").value;
	var city = document.getElementById("business-city").value;
	var state = document.getElementById("state-select").value;
	var zip = document.getElementById("business-zip").value;
	var email = document.getElementById("business-email").value;
	var phone = document.getElementById("business-phone").value;
	var tag = document.getElementById("select-tag").value;
	var descrip = document.getElementById("business-descrip").value;

	if(firstname == "" || lastname == "" || grad_year == "" || business == "" || address == "" ||
		city == "" || state == "" || zip == "" || email == "" || phone == "" || tag == "" || descrip == "") {

		window.alert("Please fill out all fields.");
		return;
	} else {
		var obj = { "businessname": business };
		var dbParam = JSON.stringify(obj);
		console.log(dbParam);

		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {

		    		obj = JSON.parse(xmlhttp.responseText);
				$('#addModal').modal('hide');
				if(obj.count > 0) {
					$('#addModal').on('hidden.bs.modal', function (e) {
						var x = confirm("Looks like that business is already registered in our system. Did you mean to edit an existing business?");
						if(x == true) {
							window.location.href = "edit_business.html";
						} else {
							window.alert("We seem to have a problem. Please contact the SCU Alumni Office for further assistance.")
							window.location.href = "home.html";
						}
					});
				}
				else {
					sendAddFormData();
				}
		    	}
		};
		xmlhttp.open("POST", "../php/getBusinessCount.php", true);
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp.send("x=" + dbParam);
	}
}

function sendAddFormData() {
	var form = document.forms.namedItem("addForm");
	var formData = new FormData(form);

	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST", "../php/add_business.php", true);
	xmlhttp.onreadystatechange = function() {
		if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {

			obj = xmlhttp.responseText;
			window.alert("You have successfully submitted a business! Business will be displayed after approval.");
	    		window.location.href = "home.html";
		}
	};
	xmlhttp.send(formData);
}
document.getElementById("submit-btn").onclick = getFormData;
