/* Create business information modals */
function createModal(e) {
	var modalName = e.target.id;
	var modalId = modalName + "-modal";
	var modalTitle = modalName + "-title";

	var modal = document.createElement("DIV");
	modal.id = modalId;
	modal.className = "modal fade";
	modal.tabIndex = "-1";
	modal.setAttribute("role", "dialog");
	modal.setAttribute("aria-labelledby", modalTitle);
	modal.setAttribute("aria-hidden", "true");
	modal.setAttribute("data-show", "true");

	var dialog = document.createElement("DIV");
	dialog.className = "modal-dialog";
	dialog.setAttribute("role", "document");

	var content = document.createElement("DIV");
	content.className = "modal-content";

	var header = document.createElement("DIV");
	header.className = "modal-header";
	var title = document.createElement("H5");
	title.className = "modal-title";
	title.id = modalTitle;
	title.textContent = modalName.replace(/-/g, ' ');
	var x_btn = document.createElement("BUTTON");
	x_btn.setAttribute("type", "button");
	x_btn.className = "close";
	x_btn.setAttribute("data-dismiss", "modal");
	x_btn.setAttribute("aria-label", "Close");
	x_btn.innerHTML = "<span aria-hidden=true>&times;</span>";
	header.appendChild(title);
	header.appendChild(x_btn);

	//TODO: add modal body
	var body = document.createElement("DIV");
	body.className = "modal-body";
	// var descrip = document.createElement("P");	Replaced by data from database below
	// descrip.textContent = "This is a test.";
	// body.appendChild(descrip);

	var footer = document.createElement("DIV");
	footer.className = "modal-footer";
	var close_btn = document.createElement("BUTTON");
	close_btn.className = "btn btn-secondary";
	close_btn.setAttribute("type", "button");
	close_btn.setAttribute("data-dismiss", "modal");
	close_btn.textContent = "Close";
	footer.appendChild(close_btn);

	content.appendChild(header);
	content.appendChild(body);
	content.appendChild(footer);

	dialog.appendChild(content);

	modal.appendChild(dialog);

	document.getElementById("modal_area").appendChild(modal);

	//Request for data then show
	var obj = { "businessname": modalName.replace(/-/g, ' ') };
	var dbParam = JSON.stringify(obj);

	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {

			obj = JSON.parse(xmlhttp.responseText);

			var br = createElement("BR");

			var address = createElement("P");
			var address_head = createElement("B");
			address_head.textContent = "Address:";
			var address_txt1 = createTextNode(obj.ADDRESS);
			var address_txt2 = createTextNode(obj.CITY + ", " + obj.STATE + " " + obj.ZIPCODE);
			address.appendChild(address_head);
			address.appendChild(br);
			address.appendChild(address_txt1);
			address.appendChild(br);
			address.appendChild(address_txt2);

			var phone = createElement("P");
			var phone_head = createElement("B");
			phone_head.textContent = "Phone: ";
			var phone_num = createTextNode(obj.PHONENUMBER);
			phone.appendChild(phone_head);
			phone.appendChild(phone_num);

			var email = createElement("P");
			var email_head = createElement("B");
			email_head.textContent = "Email: ";
			var email_addr = createTextNode(obj.EMAIL);
			email.appendChild(email_head);
			email.appendChild(email_addr);

			var owner = createElement("P");
			var owner_head = createElement("B");
			owner_head.textContent = "Owner: ";
			var owner_name = createTextNode(obj.FIRSTNAME + " " + obj.LASTNAME);
			owner.appendChild(owner_head);
			owner.appendChild(owner_name);

			var tags = createElement("P");
			var tags_head = createElement("B");
			tags_head.textContent = "Tags: ";
			var tags_text = createTextNode(obj.TAG);
			tags.appendChild(tags_head);
			tags.appendChild(tags_text);

			var descrip = createElement("P");
			var descrip_head = createElement("B");
			descrip_head.textContent = "Description: ";
			var descrip_text = createTextNode(obj.DESCRIPTION);
			descrip.appendChild(descrip_head);
			descrip.appendChild(br);
			descrip.appendChild(descrip_text);

			body.appendChild(address);
			body.appendChild(phone);
			body.appendChild(email);
			body.appendChild(owner);
			body.appendChild(tags);
			body.appendChild(descrip);

			$('#' + modalId).modal('show');
		}
	}
	
	xmlhttp.open("POST", "../php file", true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send("x=" + dbParam);
}