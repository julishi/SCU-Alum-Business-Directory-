// Author:	Maggie Cai
// File:	login.js
// File Description:	This file contains the functions to retrieve data from the login form and send it to the server

// Function:	getLoginData
// Parameters:	None
// Returns:	None
// Description:	This function checks that all fields are filled out and retrieves the login data from the form.
function getLoginData() {
	var user = document.getElementById("user").value;
	var pwd = document.getElementById("pwd").value;

	if(user == "" || pwd == "") {

		window.alert("Please fill out all fields.");
		return;
	} else {
    sendLoginData(user, pwd);
	}
}

// Function: sendLoginData
// Parameters:	user	string	contains login username
// 		pwd	string	contains login password
// Returns:	None
// Description:	This function sends the login data to the server and checks that it is valid.
function sendLoginData(user, pwd) {
  var obj = { "user": user, "pwd": pwd };
  var dbParam = JSON.stringify(obj);

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {

        obj = JSON.parse(xmlhttp.responseText);
        if(obj.valid == 1) {
					setLogin();
          window.location.href = "manage_listings.html";
        } else {
					window.alert("Incorrect username/password. Please try again.");
				}
      }

  };
  xmlhttp.open("POST", "../php/login.php", true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send("x=" + dbParam);
}
document.getElementById("submit-login").onclick = getLoginData;
