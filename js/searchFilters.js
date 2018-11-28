
function searchFilters() {
	var search_txt = document.getElementById("search_txt").value;
	if(search_txt == "") {
		search_txt = null;
	}

	var tagList = document.getElementById("type1");
	var sel_tag = tagList.options[tagList.selectedIndex].text;
	if(sel_tag == "Select Type") {
		sel_tag = null;
	}

	var locationList = document.getElementById("location");
	var loc = locationList.options[locationList.selectedIndex].text;
	if(loc == "Location") {
		loc = null;
	}

	var obj = { 'text': search_txt, 'tag': sel_tag, 'loc': loc, 'res': "search"};
	console.log(obj);
	var dbParam = JSON.stringify(obj);

	document.getElementById("card_area").innerHTML = "";

	//send request to database
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {

	    	//Response format: {count: #, res: []}
	        obj = JSON.parse(xmlhttp.responseText);
	        if(obj == null) {
	        	document.getElementById("card_area").innerHTML = "<p class=text-muted>No matching results</p>";
	        } else {
	        	createCard(obj.count, obj.res);
	        }
	    }
	};
	xmlhttp.open("POST", "../php/getCardData.php", true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send("x=" + dbParam);

}

document.getElementById("search_btn").onclick = searchFilters;
