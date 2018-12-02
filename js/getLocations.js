// Author:  Maggie Cai
// File:  getLocations.js
// File Description:  This file contains the function to retrieve a list of all existing business locations.

// Function:  getLocations
// Paramters: None
// Returns: Void
// Description: This function sends a request to the server to retrieve all existing business locations.
function getLocations() {

  var obj = { "res": "location" };
  var dbParam = JSON.stringify(obj);

	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {

	    	obj = JSON.parse(xmlhttp.responseText);

        for(var i = 0; i < obj.count; i++) {
          var loc = document.createElement("OPTION");
          loc.textContent = obj.res.CITY[i];
          document.getElementById("location").appendChild(loc);
        }
	    }
	};
	xmlhttp.open("POST", "../php/getLocations.php", true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send("x=" + dbParam);
}

getLocations();
