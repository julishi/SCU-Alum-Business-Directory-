// Author: Maggie Cai
// File: alumForm.js
// File Description: This file contains the functions to retrieve data from the alum form and send them to the server.

// Function: getAlumFormData
// Parameters: None
// Return: Void
// Description: This function retireves data from the alum form and checks if the alum already exists
function getAlumFormData() {
	var firstname = document.getElementById("first-name").value;
	var lastname = document.getElementById("last-name").value;
	var gradyear = document.getElementById("grad-year").value;

	if(firstname == "" || lastname == "" || gradyear == "") {

		window.alert("Please fill out all fields.");
		return;
	} else {

		var obj = { "firstname": firstname, "lastname": lastname, "year": gradyear };
		var dbParam = JSON.stringify(obj);

		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
		    if (this.readyState == 4 && this.status == 200) {

		    	obj = JSON.parse(xmlhttp.responseText);
					setCookie();
					setFlagAlum();
					$('#alumFormModal').modal('hide');

					if (obj.count > 0) {
						$('#alumFormModal').on('hidden.bs.modal', function (e) {
							window.alert("Looks like you’ve submitted your information already before. Thanks for visiting our site again!");
						});
					}
					else {
						sendAlumFormData(firstname, lastname, gradyear);
					}
		    }

		};
		xmlhttp.open("POST", "../php/getAlumCount.php", true);
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp.send("x=" + dbParam);
	}
}

// Function:	sendAlumFormData
// Parameters:	firstname	string	the firstname of the alum
// 							lastname	string	the lastname of the alum
// 							gradyear	number	the grad year of the alum
// Return:	Void
// Description:	This function takes in the alum data and sends it to the server to be stored into the database
function sendAlumFormData(firstname, lastname, gradyear) {
	var obj = { "firstname": firstname, "lastname": lastname, "year": gradyear };
	var dbParam = JSON.stringify(obj);
	console.log(dbParam);
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {

				obj = xmlhttp.responseText;
			}
	};
	xmlhttp.open("POST", "../php/add_SCU_Alum.php", true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send("x=" + dbParam);
}
// Run getAlumFormData when the submit button is clicked
document.getElementById("submit-alum").onclick = getAlumFormData;
