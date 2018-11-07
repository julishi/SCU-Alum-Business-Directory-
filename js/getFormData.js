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
	var img = document.getElementById("business-img").value;
	var descrip = document.getElementById("business-descrip").value;

	if(firstname == "" || lastname == "" || grad_year == "" || business == "" || address == "" || 
		city == "" || state == "" || zip == "" || email == "" || phone == "" || tag == "" || descrip == "") {

		window.alert("Please fill out all fields.");
		exit();
	} else {
		$('#addModal').modal('hide');
	}

	var obj = { "firstname": firstname, "lastname": lastname, "year": grad_year, "business": business, "address": address, "city": city, "state": state, "zip": zip, "email": email, "phone": phone, "tag": tag, "img": img, "descrip": descrip};
	var dbParam = JSON.stringify(obj);

	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {

	    	obj = xmlhttp.responseText;
	    	window.alert("You have successfully submitted a business!");
	    	window.location.href = "home.html";
	    }
	};
	xmlhttp.open("POST", "../php/add_business.php", true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send("x=" + dbParam);
}
document.getElementById("submit-btn").onclick = getFormData;
