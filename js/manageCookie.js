//window.addEventListener("load",nameFieldInit,false);

function nameFieldInit() {
	var firstName = "";
	var lastName = "";
	var gradYear = "";

	if (document.cookie != "") {
		firstName = document.cookie.replace(/(?:(?:^|.*;\s*)firstName\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		lastName = document.cookie.replace(/(?:(?:^|.*;\s*)lastName\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		gradYear = document.cookie.replace(/(?:(?:^|.*;\s*)gradYear\s*\=\s*([^;]*).*$)|^.*$/, "$1");
	}

	document.getElementById("first-name").value = firstName;
	// document.getElementById("first-name").onblur = setCookie();

	document.getElementById("last-name").value = lastName;
	// document.getElementById("last-name").onblur = setCookie();

	// //NEED TO UPDATE ELEMENT ID FOR GRADYEAR
	document.getElementById("grad-year").value = gradYear;
	// document.getElementById("grad-year").onblur = setCookie;
}

function getFirstName(){
	if (checkCookie() == 1) {
		firstName = document.cookie.replace(/(?:(?:^|.*;\s*)firstName\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		return firstName;
	}
	return false;
}

function getLastName(){
	if (checkCookie() == 1) {
		lastName = document.cookie.replace(/(?:(?:^|.*;\s*)lastName\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		return lastName;
	}
	return false;
}

function getGradYear(){
	if (checkCookie() == 1) {
		gradYear = document.cookie.replace(/(?:(?:^|.*;\s*)gradYear\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		return gradYear;
	}
	return false;
}

//Reads data in text forms at time of execution and saves them into cookies
function setCookie() {
	// var expireDate = new Date();
	// expireDate.setMonth(expireDate.getMonth()+6);

	var firstName = document.getElementById("first-name").value;
	var lastName = document.getElementById("last-name").value;
	var gradYear = document.getElementById("grad-year").value;
	document.cookie = "firstName=" + firstName;
	document.cookie = "lastName=" + lastName;
	document.cookie = "gradYear=" + gradYear;

	//document.getElementById("cookieForm").blur();
	return false;
}

function setFlagAlum() {
	document.cookie = "cookieFlag=Alum";
}

function setFlagGuest() {
	document.cookie = "cookieFlag=Guest";
}

function alertCookie() {
  alert(document.cookie);
}

function checkCookie() {
	var cookieFlag = "";
	if (document.cookie != "") {
		cookieFlag = document.cookie.replace(/(?:(?:^|.*;\s*)cookieFlag\s*\=\s*([^;]*).*$)|^.*$/, "$1");
	}

	if (cookieFlag == "Alum") {
		return 1
	} else if (cookieFlag == "Guest") {
		return 2;
	}

	return 0;
}
