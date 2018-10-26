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

		var obj = JSON.parse(res[i]);
		var card_img = "<img class=card-img-top src=../avatar.png alt=image style=width:100%>"
		var card_title = "<div class=card-body><h4 class=card-title>" + obj.title + "</h4>"
		var card_descrip = "<p class=card-text>" + obj.descrip + "</p></div>"
		var card_html = card_img + card_title + card_descrip

		card = document.createElement("DIV");
		card.id = "card" + i;
		card.className = "card";
		card.setAttribute("style", "width:16rem");
		document.getElementById("con" + i).appendChild(card);
		document.getElementById(card.id).innerHTML = card_html;

		if(i % 4 == 3) {
			deck_index++;
		}
	}
}

test = ['{"title":"A", "descrip":"Description for A"}', '{"title":"B", "descrip":"Description for B"}', '{"title":"C", "descrip":"Description for C"}', '{"title":"D", "descrip":"Description for D"}', '{"title":"E", "descrip":"Description for E"}'];
window.onload = createCard(5, test);

// function display() {
// 	var obj = { 'res': '*' };
// 	var dbParam = JSON.stringify(obj);

// 	xmlhttp.onreadystatechange = function() {
// 	    if (this.readyState == 4 && this.status == 200) {

// 	    	//Response format: {count: #, res: []}
// 	        obj = JSON.parse(this.responseText);
// 	        createCard(obj.count, obj.res);	
// 	    }
// 	};

// 	xmlhttp.open("POST", "php file", true);
// 	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
// 	xmlhttp.send("x=" + dbParam);
// }

// window.onload = display();

