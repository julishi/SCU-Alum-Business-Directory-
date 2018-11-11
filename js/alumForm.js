function getAlumFormData() {
	var firstname = document.getElementById("first-name").value;
	var lastname = document.getElementById("last-name").value;
	var gradyear = document.getElementById("grad-year").value;

	if(firstname == "" || lastname == "" || gradyear == "") {

		window.alert("Please fill out all fields.");
		return;
	} else {

		var obj = { "firstname": firstname, "lastname": lastname, "year": gradyear };
		var dbParam = JSON.stringify(obj);

		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
		    if (this.readyState == 4 && this.status == 200) {

		    	obj = JSON.parse(xmlhttp.responseText);
					setCookie();
					setFlagAlum();
					$('#alumFormModal').modal('hide');

					if (obj.count > 0) {
						$('#alumFormModal').on('hidden.bs.modal', function (e) {
							window.alert("Looks like you’ve submitted your information already before. Thanks for visiting our site again!");
						});
					}
					else {
						sendAlumFormData();
					}
		    }

		};
		xmlhttp.open("POST", "../php/getAlumCount.php", true);
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp.send("x=" + dbParam);
	}
}

function sendAlumFormData() {
	var obj = { "firstname": firstname, "lastname": lastname, "year": gradyear };
	var dbParam = JSON.stringify(obj);

	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {

				obj = xmlhttp.responseText;
			}
	};
	xmlhttp.open("POST", "../php/add_SCU_Alum.php", true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send("x=" + dbParam);
}
document.getElementById("submit-alum").onclick = getAlumFormData;
