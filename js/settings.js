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

function sendChangePasswordData(user, old_pwd, new_pwd) {
  var obj = { "user": user, "old_pwd": old_pwd, "new_pwd": new_pwd };
  var dbParam = JSON.stringify(obj);

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {

        obj = JSON.parse(xmlhttp.responseText);
        if(obj.success == 1) {
          window.alert("Password change successful!");
          location.reload();
        }
      }

  };
  xmlhttp.open("POST", "../php/settings.php", true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send("x=" + dbParam);
}
document.getElementById("submit-change").onclick = getChangePasswordData;
