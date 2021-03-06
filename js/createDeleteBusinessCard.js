// Author:	Maggie Cai
// File: createDeleteBusinessCard.js
// File Description: This file contains the functions to create cards for approved businesses.

// Function:	createDeleteBusinessCard
// Parameters:	count	number	total number of business deletions; default to 0
//		res	object	contains business deletion data
// Returns:	Void
// Description:	This function generates the card HTML for businesses deletions
function createDeleteBusinessCard(count = 0, res) {

	var card, deck, container;
	var deck_index = 0;

	for(var i = 0; i < count; i++) {
		if(i % 4 == 0) {
			deck = document.createElement("DIV");
			deck.id = "deck_delete" + deck_index;
			deck.className = "card-deck";
			deck.setAttribute("style", "margin-top:50px;");

			document.getElementById("nav-delete").appendChild(deck);
		}

		container = document.createElement("DIV");
		container.id = "con_delete" + i;
		container.className = "col-3";
		document.getElementById("deck_delete" + deck_index).appendChild(container);

		var obj = res[i];
		var card_img = document.createElement("IMG");
		card_img.className = "card-img-top";
		if(obj.IMAGE == null || obj.IMAGE == "") {
			card_img.setAttribute("src", "../avatar.png");
		} else {
			card_img.setAttribute("src", "data:image/png;base64," + obj.IMAGE);
		}
		card_img.setAttribute("alt", "image");
		card_img.setAttribute("style", "width:100%");

		var card_body = document.createElement("DIV");
		card_body.className = "card-body";

		var card_title = document.createElement("H4");
		card_title.className = "card-title";
		card_title.textContent =  obj.BUSINESSNAME;

		var card_tag = document.createElement("H6");
		card_tag.className = "card-subtitle mb-2 text-muted";
		card_tag.textContent = obj.TAG;

		var card_descrip = document.createElement("P");
		card_descrip.className = "card-text";
		card_descrip.textContent =  obj.COMMENTS;

		var card_btn = document.createElement("A");
		card_btn.setAttribute("href", "javascript:;");
		card_btn.className = "btn btn-outline-primary";
		card_btn.id = obj.BUSINESSNAME.replace(/\s/g, '_');
		card_btn.setAttribute("onclick", "createDeleteBusinessModal(event)");
		card_btn.textContent = "Review";

		card = document.createElement("DIV");
		card.id = "card_delete" + i;
		card.className = "card";
		card.setAttribute("style", "width:16rem");

		container.appendChild(card);
		card.appendChild(card_img);
		card.appendChild(card_body);
		card_body.appendChild(card_title);
		card_body.appendChild(card_tag);
		card_body.appendChild(card_descrip);
		card_body.appendChild(card_btn);

		if(i % 4 == 3) {
			deck_index++;
		}
	}
}

// Function:	display
// Parameters:	None
// Returns:	Void
// Description:	This function sends a request to the server to retrieve business deletion data, then calls createDeleteBusinessCard
function display() {
	var obj = { "res": "delete" };
	var dbParam = JSON.stringify(obj);

	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

	    //Response format: {count: #, res: []}
	    obj = JSON.parse(xmlhttp.responseText);
	    createDeleteBusinessCard(obj.count, obj.res);
	  }
	};

	xmlhttp.open("POST", "../php/getManageCardData.php", true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send("x=" + dbParam);
}

// Generate cards when delete tab is clicked
document.getElementById("nav-delete-tab").addEventListener("click", display());
