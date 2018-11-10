//window.addEventListener("load",cookieAutofill,false);

//Reads saved cookie data into text forms, activated by pageload event listener
//Can also autosave data when text forms lose focus, but unreliable
function cookieAutofill() {
	var firstName = "";
	var lastName = "";
	var gradYear = "";

	if (document.cookie != "") {
		firstName = document.cookie.replace(/(?:(?:^|.*;\s*)firstName\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		lastName = document.cookie.replace(/(?:(?:^|.*;\s*)lastName\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		gradYear = document.cookie.replace(/(?:(?:^|.*;\s*)gradYear\s*\=\s*([^;]*).*$)|^.*$/, "$1");
	}

	document.getElementById("first-name").value = firstName;
	//document.getElementById("first-name").onblur = setCookie();

	document.getElementById("last-name").value = lastName;
	//document.getElementById("last-name").onblur = setCookie();

	document.getElementById("grad-year").value = gradYear;
	//document.getElementById("grad-year").onblur = setCookie;

	//document.getElementById("cookieForm").onsubmit = setCookie();
}

function getFirstName(){
	if (checkCookie()==1){
		var firstName = document.cookie.replace(/(?:(?:^|.*;\s*)firstName\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		return firstName;
	}
	return false;
}

function getLastName(){
	if (checkCookie()==1){
		var lastName = document.cookie.replace(/(?:(?:^|.*;\s*)lastName\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		return lastName;
	}
	return false;
}

function getGradYear(){
	if (checkCookie()==1){
		var gradYear = document.cookie.replace(/(?:(?:^|.*;\s*)gradYear\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		return gradYear;
	}
	return false;
}

//Reads data in text forms at time of execution and saves them into cookies
function setCookie() {
	//var expireDate = new Date();
	//expireDate.setMonth(expireDate.getMonth()+6);

	var firstName = document.getElementById("first-name").value;
	var lastName = document.getElementById("last-name").value;
	var gradYear = document.getElementById("grad-year").value;
	document.cookie = "firstName=" + firstName;
	document.cookie = "lastName=" + lastName;
	document.cookie = "gradYear=" + gradYear;

	document.getElementById("cookieForm").blur();
	return false;
}

function setFlagAlum() {
	document.cookie = "cookieFlag=Alum";
	return;
}

function setFlagGuest() {
	document.cookie = "cookieFlag=Guest";
	return;
}

//Lists all stored cookies for debugging
function alertCookie() {
  alert(document.cookie);
}

//Returns a nonzero value if the client is recognized as a returning user, zero if unidentified
function checkCookie() {
	var cookieFlag = "";
	if (document.cookie != "") {
		cookieFlag = document.cookie.replace(/(?:(?:^|.*;\s*)cookieFlag\s*\=\s*([^;]*).*$)|^.*$/, "$1");
	}
	if (cookieFlag == "Alum")
		return 1
	if (cookieFlag == "Guest")
		return 2;
	return 0;
}