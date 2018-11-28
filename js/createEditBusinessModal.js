/* Create business information modals for new business listings */
function createEditBusinessModal(e) {
	var modalName = e.target.id;
	var modalId = modalName + "-modal";
	var modalTitle = modalName + "-title";

	var bsnModal = document.createElement("DIV");
	bsnModal.id = modalId;
	bsnModal.className = "modal fade";
	bsnModal.tabIndex = "-1";
	bsnModal.setAttribute("role", "dialog");
	bsnModal.setAttribute("aria-labelledby", modalTitle);
	bsnModal.setAttribute("aria-hidden", "true");
	bsnModal.setAttribute("data-show", "true");

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
	title.textContent = modalName.replace(/_/g, ' ');
	var x_btn = document.createElement("BUTTON");
	x_btn.setAttribute("type", "button");
	x_btn.className = "close";
	x_btn.setAttribute("data-dismiss", "modal");
	x_btn.setAttribute("aria-label", "Close");
	x_btn.innerHTML = "<span aria-hidden=true>&times;</span>";
	header.appendChild(title);
	header.appendChild(x_btn);

	var body = document.createElement("DIV");
	body.className = "modal-body";

	var footer = document.createElement("DIV");
	footer.className = "modal-footer";
	var reject_btn = document.createElement("BUTTON");
	reject_btn.className = "btn btn-danger";
	reject_btn.id = "reject";
	reject_btn.setAttribute("type", "button");
	reject_btn.addEventListener("click", function() {
		updateApproval("reject", modalName, "edit");
	});
	reject_btn.textContent = "Reject";
	var approve_btn = document.createElement("BUTTON");
	approve_btn.className = "btn btn-success";
	approve_btn.id = "approve"
	approve_btn.setAttribute("type", "button");
	approve_btn.addEventListener("click", function() {
		updateApproval("approve", modalName, "edit");
	});
	approve_btn.textContent = "Approve";
	footer.appendChild(reject_btn);
	footer.appendChild(approve_btn);

	content.appendChild(header);
	content.appendChild(body);
	content.appendChild(footer);

	dialog.appendChild(content);

	bsnModal.appendChild(dialog);

	document.getElementById("edit_modal_area").appendChild(bsnModal);

	//Request for data then show
	var obj = { "businessname": modalName.replace(/_/g, ' ') };
	var dbParam = JSON.stringify(obj);

	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {

			obj = JSON.parse(xmlhttp.responseText);
			console.log(obj);

			var lbr = document.createElement("BR");

			var og_heading = document.createElement("H4");
			og_heading.textContent = "Original Business Information";

			var address = document.createElement("P");
			var address_head = document.createElement("B");
			address_head.textContent = "Address: ";
			var address_txt1 = document.createElement("SPAN");
			address_txt1.textContent = obj.address['ADDRESS'];
			var address_txt2 = document.createElement("SPAN");
			address_txt2.textContent = obj.address['CITY'] + ", " + obj.address['STATE'] + " " + obj.address['ZIPCODE'];
			address.appendChild(address_head);
			address.appendChild(address_txt1);
			address.appendChild(address_txt2);

			var spans = address.getElementsByTagName("SPAN");

			for (var i = 0; i < spans.length; i++)
			{
				var lbr = document.createElement("BR");
				address.insertBefore(lbr, spans[i]);
			}

			for (var i = 1; i < spans.length; i++)
			{
				var lbr = document.createElement("BR");
				address.insertBefore(lbr, spans[1]);
			}


			var phone = document.createElement("P");
			var phone_head = document.createElement("B");
			phone_head.textContent = "Phone: ";
			var phone_num = document.createTextNode(obj.contact['PHONENUMBER']);
			phone.appendChild(phone_head);
			phone.appendChild(phone_num);

			var email = document.createElement("P");
			var email_head = document.createElement("B");
			email_head.textContent = "Email: ";
			var email_addr = document.createTextNode(obj.contact['EMAIL']);
			email.appendChild(email_head);
			email.appendChild(email_addr);

			var owner = document.createElement("P");
			var owner_head = document.createElement("B");
			owner_head.textContent = "Owner: ";
			var owner_name = document.createTextNode(obj.owner['FIRSTNAME'] + " " + obj.owner['LASTNAME']);
			owner.appendChild(owner_head);
			owner.appendChild(owner_name);

			var tags = document.createElement("P");
			var tags_head = document.createElement("B");
			tags_head.textContent = "Tags: ";
			var tags_text = document.createTextNode(obj.description[0]['TAG']);
			tags.appendChild(tags_head);
			tags.appendChild(tags_text);

			var descrip = document.createElement("P");
			var descrip_head = document.createElement("B");
			descrip_head.textContent = "Description: ";
			var descrip_text = document.createTextNode(obj.description[0]['COMMENTS']);
			descrip.appendChild(descrip_head);
			descrip.appendChild(lbr);
			descrip.appendChild(descrip_text);

			/* New business information */
			var new_heading = document.createElement("H4");
			new_heading.textContent = "New Business Information";

			var new_name = document.createElement("P");
			var new_name_head = document.createElement("B");
			new_name_head.textContent = "New Businessname: ";
			var new_name_txt = document.createTextNode(obj.edits[0]['NEW_BUSINESSNAME']);
			new_name.appendChild(new_name_head);
			new_name.appendChild(new_name_txt);

			var new_address = document.createElement("P");
			var new_address_head = document.createElement("B");
			new_address_head.textContent = "Address: ";
			var new_address_txt1 = document.createElement("SPAN");
			new_address_txt1.textContent = obj.edits[0]['ADDRESS'];
			var new_address_txt2 = document.createElement("SPAN");
			new_address_txt2.textContent = obj.edits[0]['CITY'] + ", " + obj.edits[0]['STATE'] + " " + obj.edits[0]['ZIPCODE'];
			new_address.appendChild(new_address_head);
			new_address.appendChild(new_address_txt1);
			new_address.appendChild(new_address_txt2);

			var spans = new_address.getElementsByTagName("SPAN");

			for (var i = 0; i < spans.length; i++)
			{
				var lbr = document.createElement("BR");
				new_address.insertBefore(lbr, spans[i]);
			}

			for (var i = 1; i < spans.length; i++)
			{
				var lbr = document.createElement("BR");
				new_address.insertBefore(lbr, spans[1]);
			}


			var new_phone = document.createElement("P");
			var new_phone_head = document.createElement("B");
			new_phone_head.textContent = "Phone: ";
			var new_phone_num = document.createTextNode(obj.edits[0]['PHONENUMBER']);
			new_phone.appendChild(new_phone_head);
			new_phone.appendChild(new_phone_num);

			var new_email = document.createElement("P");
			var new_email_head = document.createElement("B");
			new_email_head.textContent = "Email: ";
			var new_email_addr = document.createTextNode(obj.edits[0]['EMAIL']);
			new_email.appendChild(new_email_head);
			new_email.appendChild(new_email_addr);

			var new_owner = document.createElement("P");
			var new_owner_head = document.createElement("B");
			new_owner_head.textContent = "Owner: ";
			var new_owner_name = document.createTextNode(obj.edits[0]['FIRSTNAME'] + " " + obj.edits[0]['LASTNAME']);
			new_owner.appendChild(new_owner_head);
			new_owner.appendChild(new_owner_name);

			var new_tags = document.createElement("P");
			var new_tags_head = document.createElement("B");
			new_tags_head.textContent = "Tags: ";
			var new_tags_text = document.createTextNode(obj.edits[0]['TAG']);
			new_tags.appendChild(new_tags_head);
			new_tags.appendChild(new_tags_text);

			var new_descrip = document.createElement("P");
			var new_descrip_head = document.createElement("B");
			new_descrip_head.textContent = "Description: ";
			var new_descrip_text = document.createTextNode(obj.edits[0]['COMMENTS']);
			new_descrip.appendChild(new_descrip_head);
			new_descrip.appendChild(lbr);
			new_descrip.appendChild(new_descrip_text);

			body.appendChild(og_heading);	//append original information
			body.appendChild(address);
			body.appendChild(phone);
			body.appendChild(email);
			body.appendChild(owner);
			body.appendChild(tags);
			body.appendChild(descrip);

			if(obj.description[0]['IMAGE'] != null && obj.description[0]['IMAGE'] != "") {
				var img = document.createElement("P");
				var img_head = document.createElement("B");
				img_head.textContent = "Image: ";
				var img_content = document.createElement("IMG");
				img_content.setAttribute("src", "data:image/png;base64," + obj.description[0]['IMAGE']);
				img_content.style.height = "auto";
				img_content.style.width = "auto";
				img_content.style.maxHeight = "300px";
				img_content.style.maxWidth = "300px";
				img.appendChild(img_head);
				img.appendChild(img_content);
				body.appendChild(img);

				var imgs = img.getElementsByTagName("IMG");

				for (var i = 0; i < imgs.length; i++)
				{
					var lbr = document.createElement("BR");
					img.insertBefore(lbr, imgs[i]);
				}
			}

			body.appendChild(new_heading);	//append new information
			body.appendChild(new_name);
			body.appendChild(new_address);
			body.appendChild(new_phone);
			body.appendChild(new_email);
			body.appendChild(new_owner);
			body.appendChild(new_tags);
			body.appendChild(new_descrip);

			if(obj.edits[0]['IMAGE'] != "" && obj.edits[0]['IMAGE'] != null) {
				var new_img = document.createElement("P");
				var new_img_head = document.createElement("B");
				new_img_head.textContent = "Image: ";
				var new_img_content = document.createElement("IMG");
				new_img_content.setAttribute("src", "data:image/png;base64," + obj.edits[0]['IMAGE']);
				new_img_content.style.height = "auto";
				new_img_content.style.width = "auto";
				new_img_content.style.maxHeight = "300px";
				new_img_content.style.maxWidth = "300px";
				new_img.appendChild(new_img_head);
				new_img.appendChild(lbr);
				new_img.appendChild(new_img_content);
				body.appendChild(new_img);
			} else {
				var new_img = document.createElement("P");
				var new_img_head = document.createElement("B");
				new_img_head.textContent = "Image: ";
				var new_img_content = document.createTextNode("Using previous image if any.");
				new_img.appendChild(new_img_head);
				new_img.appendChild(new_img_content);
				body.appendChild(new_img);
			}

			$('#' + modalId).modal('show');
		}
	}

	xmlhttp.open("POST", "../php/getEditBusinessData.php", true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send("x=" + dbParam);
}
