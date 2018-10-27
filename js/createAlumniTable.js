function createAlumniTable(count, res) {

	var checkbox = "<div class=input-group><div class=input-group-item><input type=checkbox></div></div>";
	var list_item, item_head, item_body, item_check;

	for(var i = 0; i < count; i++)
	{
		var obj = JSON.parse(res[i]);

		
		list_item = document.createElement("TR");
		list_item.id = "item" + i;
		document.getElementById("alumni_table_body").appendChild(list_item);

		var rowNum = i + 1;
		item_head = document.createElement("TH");
		item_head.setAttribute("scope", "row");
		item_head.innerHTML = rowNum;
		document.getElementById("item" + i).appendChild(item_head);

		item_name = document.createElement("TD");
		item_name.innerHTML = obj.name;
		document.getElementById("item" + i).appendChild(item_name);

		item_check = document.createElement("TD");
		item_check.id = "check" + i;
		document.getElementById("item" + i).appendChild(item_check);

		document.getElementById(item_check.id).innerHTML = checkbox;
	}
}

test = ['{ "name" : "John Doe"}', '{ "name" : "Jane Doe"}', '{ "name" : "Santa Clara" }'];
window.onload = createAlumniTable(3, test);
