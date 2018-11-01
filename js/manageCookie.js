window.addEventListener("load",nameFieldInit,false);

function nameFieldInit() {
	var firstName = "";
	var lastName = "";
	var gradYear = "";
	if (document.cookie != "") {
		firstName = document.cookie.split("=")[1];
		lastName = document.cookie.split("=")[2];
		gradYear = document.cookie.split("=")[3];
	}

	document.getElementById("first-name").value = firstName;
	document.getElementById("first-name").onblur = setCookie;

	document.getElementById("last-name").value = lastName;
	document.getElementById("last-name").onblur = setCookie;

	//NEED TO UPDATE ELEMENT ID FOR GRADYEAR
	document.getElementById("grad-year").value = gradYear;
	document.getElementById("grad-year").onblur = setCookie;

	document.getElementById("cookieForm").onsubmit = setCookie;
}

function setCookie() {
	var expireDate = new Date();
	expireDate.setMonth(expireDate.getMonth()+6);

	var userName = document.getElementById("first-name").value;
	document.cookie = "firstName=" + firstName + ";lastName=" + lastName + ";gradYear=" + gradYear + ";expires=" + expireDate.toGMTString();

	document.getElementById("cookieForm").blur();
	return false;
}