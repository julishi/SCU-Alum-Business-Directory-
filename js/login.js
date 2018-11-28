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
