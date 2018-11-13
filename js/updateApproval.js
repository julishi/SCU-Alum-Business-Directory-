function updateApproval(decision, businessname, type) {

	console.log(decision);
	console.log(businessname);
	console.log(type);
	var res = confirm("Are you sure you want to " + decision + "?");
	if(res == true) {
		var obj = { "status": decision, "businessname": businessname.replace(/_/g, ' ') ,"type": type };
		var dbParam = JSON.stringify(obj);

		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function () {
			if(this.readyState == 4 && this.status == 200) {

				obj = xmlhttp.responseText;
				var modalId = businessname + "-modal";
				$('#' + modalId).modal('hide');
				window.location.reload(true);
			}
		}

		xmlhttp.open("POST", "../php/updateApproval.php", true);
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp.send("x=" + dbParam);
	}
}
