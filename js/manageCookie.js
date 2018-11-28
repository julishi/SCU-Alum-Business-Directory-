/*	manageCookie.js contains the functions relating to
	the system's usage of cookies. Cookies are used by
	the system for the convenience of returing users
	and logged in staff.								*/


//Function for filling user input fields with saved data in cookies
//Also contains disabled code for writing new cookies after fields are edited
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

	document.getElementById("grad-year").value = gradYear;
	// document.getElementById("grad-year").onblur = setCookie;
}

//The get functions ascertain that the cookies exist using checkCookie,
//then returns the associated piece of data stored in cookies
//If the cookies are missing or invalid, the functions return false.
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

//The setFlag functions set a cookie to note whether 
//the client is an alum, non-alum, or unidentified user
function setFlagAlum() {
	document.cookie = "cookieFlag=Alum";
}

function setFlagGuest() {
	document.cookie = "cookieFlag=Guest";
}

//Reads the flag tracking whether a user is an alum, non-alum, or unidentified user
//Returns 0 for unidentified, 1 for alum, and 2 for non-alum
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

//Sets a flag allowing the system to identify logged in users
function setLogin() {
	document.cookie = "loginFlag=TRUE";
}

//Removes a flag allowing the system to identify logged in users
function setLogout() {
	document.cookie = "loginFlag=FALSE";
}

//Checks a flag to see if the user is currently logged in
//Logged in users are forwarded to the staff page
function loginCheck(){
	var loginFlag = "";

	if (document.cookie != "") {
		loginFlag = document.cookie.replace(/(?:(?:^|.*;\s*)loginFlag\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		if (loginFlag == "TRUE"){
			window.location.replace('manage_listings.html')
			return true;
		}
	}
	return false;
}

//Troubleshooting tool, lists all saved cookies in the current session
function alertCookie() {
  alert(document.cookie);
}

//window.addEventListener("load",nameFieldInit,false);
