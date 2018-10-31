/* Create the alumni table */
function createAlumniTable(count, res) {

	var checked = "<div class=input-group><div class=input-group-item><input type=checkbox checked></div></div>";
	var not_checked = "<div class=input-group><div class=input-group-item><input type=checkbox></div></div>"
	var list_item, item_head, item_name, item_year, item_check;

	for(var i = 0; i < count; i++)
	{	
		list_item = document.createElement("TR");
		list_item.id = "item" + i;
		document.getElementById("alumni_table_body").appendChild(list_item);

		var rowNum = i + 1;
		item_head = document.createElement("TH");
		item_head.setAttribute("scope", "row");
		item_head.innerHTML = rowNum;
		document.getElementById("item" + i).appendChild(item_head);

		item_name = document.createElement("TD");
		var name = res[i].FIRSTNAME + " " + res[i].LASTNAME;
		item_name.innerHTML = name;
		document.getElementById("item" + i).appendChild(item_name);

		item_year = document.createElement("TD");
		item_year.innerHTML = res[i].GRAD_YEAR;
		document.getElementById("item" + i).appendChild(item_year);

		item_check = document.createElement("TD");
		item_check.id = "check" + i;
		document.getElementById("item" + i).appendChild(item_check);

		if(res[i].APPROVED == "1")
		{
			document.getElementById(item_check.id).innerHTML = checked;
		} else {
			document.getElementById(item_check.id).innerHTML = not_checked;
		}
		
	}
}

function display() {
	var obj = { "res": "all" };
	var dbParam = JSON.stringify(obj);

	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {

	    	//Response format: {count: #, res: []}
	        obj = JSON.parse(xmlhttp.responseText);
	        createAlumniTable(obj.count, obj.res);	
	    }
	};

	xmlhttp.open("POST", "../php/getAlumniData.php", true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send("x=" + dbParam);
}

window.onload = display();
