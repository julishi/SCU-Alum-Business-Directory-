function verifyAlum(e) {

  var x = "";
  var action = "";
  var val = e.target.id.split("_");

	if(document.getElementById(e.target.id).checked == true) {
		x = confirm("Are you sure you want to verify this alum?");
    if(x == true) {
      action = "verify";
    } else {
      document.getElementById(e.target.id).checked = false;
    }
	} else {
    x = confirm("Are you sure you want to remove verification of this alum?");
    if(x == true) {
      action = "unverify";
    } else {
      document.getElementById(e.target.id).checked = true;
    }
  }

	var obj = { "firstname": val[0], "lastname": val[1], "year": val[2], "action": action };
	var dbParam = JSON.stringify(obj);

	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {

	    	obj = xmlhttp.responseText;
	    }
	};
	xmlhttp.open("POST", "../php/verifyAlum.php", true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send("x=" + dbParam);
}
