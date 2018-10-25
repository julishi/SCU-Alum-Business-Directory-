function searchFilters() {
	var search_txt = document.getElementById("search_txt").value;

	var type1List = document.getElementById("type1");
	var sel_type1 = type1List.options[type1List.selectedIndex].text;

	var type2List = document.getElementById("type2");
	var sel_type2 = type2List.options[type2List.selectedIndex].text;

	var locationList = document.getElementById("location");
	var location = locationList.options[locationList.selectedIndex].text;

	var obj = { 'text': search_txt, 'type1': sel_type1, 'type2': sel_type2, 'loc': location }
	var dbParam = JSON.stringify(obj);
	document.getElementById("test").innerHTML = dbParam;

	//send request to database
	xmlhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	        obj = JSON.parse(this.responseText);
	        createCard(obj.count, obj);		//place count at the end of JSON string
	    }
	};
	xmlhttp.open("POST", "php file", true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send("x=" + dbParam);

	//create cards based on response JSON
} //searchFilters();