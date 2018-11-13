/* Creates the specified number of cards with data from res */
function createCard(count = 0, res) {

	var card, deck, container;
	var deck_index = 0;

	for(var i = 0; i < count; i++) {
		if(i % 4 == 0) {
			deck = document.createElement("DIV");
			deck.id = "deck" + deck_index;
			deck.className = "card-deck";
			deck.setAttribute("style", "margin-top:75px;");

			document.getElementById("card_area").appendChild(deck);
		}

		container = document.createElement("DIV");
		container.id = "con" + i;
		container.className = "col-3";
		document.getElementById("deck" + deck_index).appendChild(container);

		var obj = res[i];
		var card_img = document.createElement("IMG");
		card_img.className = "card-img-top";
		if(obj.IMAGE == null) {
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
		card_btn.setAttribute("onclick", "createModal(event)");
		card_btn.textContent = "See more";

		card = document.createElement("DIV");
		card.id = "card" + i;
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

function display() {
	var obj = { "res": "all" };
	var dbParam = JSON.stringify(obj);

	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {

	    	//Response format: {count: #, res: []}
	        obj = JSON.parse(xmlhttp.responseText);
	        createCard(obj.count, obj.res);
	    }
	};

	xmlhttp.open("POST", "../php/getCardData.php", true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send("x=" + dbParam);
}

window.onload = display();
