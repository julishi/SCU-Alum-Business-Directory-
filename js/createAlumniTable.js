/* Create the alumni table */
function createAlumniTable(count, res) {

	var list_item, item_head, item_name, item_year, item_check;
	var firstname, lastname, year;

	for(var i = 0; i < count; i++)
	{
		firstname = res[i].FIRSTNAME;
		lastname = res[i].LASTNAME;
		year = res[i].GRAD_YEAR;

		list_item = document.createElement("TR");
		list_item.id = "item" + i;
		document.getElementById("alumni_table_body").appendChild(list_item);

		var rowNum = i + 1;
		item_head = document.createElement("TH");
		item_head.setAttribute("scope", "row");
		item_head.innerHTML = rowNum;

		item_name = document.createElement("TD");
		var name = firstname + " " + lastname;
		item_name.innerHTML = name;

		item_year = document.createElement("TD");
		item_year.innerHTML = year;

		item_check = document.createElement("TD");
		var check = document.createElement("DIV");
		check.className = "input-group";
		var check_item = document.createElement("DIV");
		check_item.className = "input-group-item";
		var check_input = document.createElement("INPUT");
		check_input.id = firstname + "_" + lastname + "_" + year;
		check_input.setAttribute("type", "checkbox");
		check_input.addEventListener("click", function () {
			verifyAlum(event);
		});
		item_check.appendChild(check);
		check.appendChild(check_item);
		check_item.appendChild(check_input);

		if(res[i].APPROVED == "1")
		{
			check_input.checked = true;
		} else {
			check_input.checked = false;
		}

		list_item.appendChild(item_head);
		list_item.appendChild(item_name);
		list_item.appendChild(item_year);
		list_item.appendChild(item_check);
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
