card_index = 0;
deck_index = 0;

function createCard(count = 0, res) {
	
	var card, deck;

	for(var i = 0; i < count; i++) {
		if(card_index % 4 == 0) {
			deck = document.createElement("DIV");
			deck.id = "deck" + deck_index;
			deck.className = "card-deck";
			deck.setAttribute("style", "margin-top:75px;");

			document.getElementById("card_area").appendChild(deck);
		}

		container = document.createElement("DIV");
		container.id = "con" + card_index;
		container.className = "col-3";
		document.getElementById("deck" + deck_index).appendChild(container);

		var obj = JSON.parse(res[i]);
		var card_img = "<img class=card-img-top src=../avatar.png alt=image style=width:100%>"
		var card_title = "<div class=card-body><h4 class=card-title>" + obj.title + "</h4>"
		var card_descrip = "<p class=card-text>" + obj.descrip + "</p></div>"
		var card_html = card_img + card_title + card_descrip

		card = document.createElement("DIV");
		card.id = "card" + card_index;
		card.className = "card";
		card.setAttribute("style", "width:16rem");
		document.getElementById("con" + card_index).appendChild(card);
		document.getElementById(card.id).innerHTML = card_html;

		if(card_index % 4 == 3) {
			deck_index++;
		}

		card_index++;
	}
}
test = ['{"title":"A", "descrip":"Description for A"}', '{"title":"B", "descrip":"Description for B"}', '{"title":"C", "descrip":"Description for C"}', '{"title":"D", "descrip":"Description for D"}'];
createCard(4, test);
