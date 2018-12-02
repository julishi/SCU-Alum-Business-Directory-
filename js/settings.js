// Author:	Maggie Cai
// File:	settings.js
// File Description:	This file contains the functions to perform the change password functionality

// Function:	getChangePasswordData
// Parameters:	None
// Returns:	None
// Description: This function retrieves the change password data from the form and checks if it is valid.
function getChangePasswordData() {
	var user = document.getElementById("user").value;
	var old_pwd = document.getElementById("old_pwd").value;
	var new_pwd = document.getElementById("new_pwd").value;
  var confirm_new_pwd = document.getElementById("confirm_new_pwd").value;

	if(user == "" || old_pwd == "" || new_pwd == "" || confirm_new_pwd == "") {

		window.alert("Please fill out all fields.");

	} else {
    var n_pwd = document.getElementById("new_pwd");
    var confirm = document.getElementById("confirm_new_pwd");
    if(new_pwd != confirm_new_pwd) {
      if(n_pwd.classList.contains("is-valid")) {
        n_pwd.classList.remove("is-valid");
      }
      n_pwd.classList.add("is-invalid");

      if(confirm.classList.contains("is-valid")) {
        confirm.classList.remove("is-valid");
      }
      confirm.classList.add("is-invalid");
    } else {
      if(n_pwd.classList.contains("is-invalid")) {
        n_pwd.classList.remove("is-invalid");
      }
      n_pwd.classList.add("is-valid");

      if(confirm.classList.contains("is-invalid")) {
        confirm.classList.remove("is-invalid");
      }
      confirm.classList.add("is-valid");

      sendChangePasswordData(user, old_pwd, new_pwd);
    }
	}
}

// Function:	sendChangePasswordData
// Parameters:	user	string	contains login username
// 		old_pwd	string	contains old login password
// 		new_pwd	string	contains new login password
// Returns:	Void
// Description:	This function sends the change password data to the server to be stored into the database.
function sendChangePasswordData(user, old_pwd, new_pwd) {
  var obj = { "user": user, "old_pwd": old_pwd, "new_pwd": new_pwd };
  var dbParam = JSON.stringify(obj);

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {

				if(xmlhttp.responseText.includes("Warning")) {
					window.alert("Incorrect username/password. Please try again.");
				} else {
					obj = JSON.parse(xmlhttp.responseText);
	        if(obj.success == 1) {
	          window.alert("Password change successful!");
	          location.reload();
					}
				}
      }

  };
  xmlhttp.open("POST", "../php/settings.php", true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send("x=" + dbParam);
}
document.getElementById("submit-change").onclick = getChangePasswordData;
