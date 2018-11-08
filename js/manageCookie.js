window.addEventListener("load",nameFieldInit,false);

var firstName = "";
var lastName = "";
var gradYear = "";

function nameFieldInit() {
	if (document.cookie != "") {
		firstName = document.cookie.replace(/(?:(?:^|.*;\s*)firstName\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		lastName = document.cookie.replace(/(?:(?:^|.*;\s*)lastName\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		gradYear = document.cookie.replace(/(?:(?:^|.*;\s*)gradYear\s*\=\s*([^;]*).*$)|^.*$/, "$1");
	}

	document.getElementById("first-name").value = firstName;
	document.getElementById("first-name").onblur = setCookie();

	document.getElementById("last-name").value = lastName;
	document.getElementById("last-name").onblur = setCookie();

	//NEED TO UPDATE ELEMENT ID FOR GRADYEAR
	document.getElementById("grad-year").value = gradYear;
	document.getElementById("grad-year").onblur = setCookie;

	document.getElementById("cookieForm").onsubmit = setCookie();
}

function getFirstName(){
	if (checkCookie()==false)
		return false;
	else{
		firstName = document.cookie.replace(/(?:(?:^|.*;\s*)firstName\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		return firstName;
	}
	return false;
}

function getLastName(){
	if (checkCookie()==false)
		return false;
	else{
		lastName = document.cookie.replace(/(?:(?:^|.*;\s*)lastName\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		return lastName;
	}
	return false;
}

function getGradYear(){
	if (checkCookie()==false)
		return false;
	else{
		gradYear = document.cookie.replace(/(?:(?:^|.*;\s*)gradYear\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		return gradYear;
	}
	return false;
}

function setCookie() {
	var expireDate = new Date();
	expireDate.setMonth(expireDate.getMonth()+6);

	firstName = document.getElementById("first-name").value;
	lastName = document.getElementById("last-name").value;
	gradYear = document.getElementById("grad-year").value;
	document.cookie = "firstName=" + firstName;
	document.cookie = "lastName=" + lastName;
	document.cookie = "gradYear=" + gradYear;

	document.getElementById("cookieForm").blur();
	return false;
}

function setCookieFlag() {
	document.cookie = "cookieFlag=True";
	return;
}

function alertCookie() {
  alert(document.cookie);
}

function checkCookie() {
	if (document.cookie != "") {
		var cookieFlag = document.cookie.replace(/(?:(?:^|.*;\s*)cookieFlag\s*\=\s*([^;]*).*$)|^.*$/, "$1");
	}
	if(cookieFlag == "True")
		return true;
	return false;
}