// Author: Maggie Cai
// File: addBusiness.js
// File Description: This file contains the functions to retrieve add business data from the HTML form and send them to the server.

// Function:	getFormData
// Parameters:	None
// Return:	Void
// Description:	This function retrieves data from the form and checks if the business already exists.
function getFormData() {

	// Retrieve data from form
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

	// Check if all fields are filled out
	if(firstname == "" || lastname == "" || grad_year == "" || business == "" || address == "" ||
		city == "" || state == "" || zip == "" || email == "" || phone == "" || tag == "" || descrip == "") {

		window.alert("Please fill out all fields.");
		return;
	} else {
		var obj = { "businessname": business };
		var dbParam = JSON.stringify(obj);

		// Send business name to the server
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
		    if (this.readyState == 4 && this.status == 200) {

		    	obj = JSON.parse(xmlhttp.responseText);
					$('#addModal').modal('hide');
					// Check if business already exists
					if(obj.count > 0) {
						$('#addModal').on('hidden.bs.modal', function (e) {
							// Redirect to edit business page if they meant to edit, else redirect to home
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
						// Send business data to the server
						sendAddFormData();
					}
		    }
		};
		xmlhttp.open("POST", "../php/getBusinessCount.php", true);
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp.send("x=" + dbParam);
	}
}

// Function:	sendAddFormData
// Parameters:	None
// Returns:	Void
// Description:	This function retrieves the business data as a FormData object and sends it to the server
// Notes: Data retrieved as FormData due to image BLOB data
function sendAddFormData() {

	// Retrieve data as FormData object
	var form = document.forms.namedItem("addForm");
	var formData = new FormData(form);

	// Send data to the server
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST", "../php/add_business.php", true);
	xmlhttp.onreadystatechange = function() {
		if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {

			// Display success alert on success
			obj = xmlhttp.responseText;
			window.alert("You have successfully submitted a business! Business will be displayed after approval.");
			window.location.href = "home.html";
		}
	};
	xmlhttp.send(formData);
}
// Run getFormData when submit button is clicked on form
document.getElementById("submit-btn").onclick = getFormData;
