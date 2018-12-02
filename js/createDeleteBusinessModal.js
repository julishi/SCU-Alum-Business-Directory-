// Author:	Maggie Cai
// File:	createDeleteBusinessModal.js
// File Description: This file contains the functions to create modals for business deletions.

// Function:	createDeleteBusinessModal
// Parameters:	e	event	element that triggered event
// Returns:	Void
// Description:	This function sends a request to retrieve business data from the database and generates the modal HTML for businesses deletions
function createDeleteBusinessModal(e) {
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
		updateApproval("reject", modalName, "delete");
	});
	reject_btn.textContent = "Reject";
	var approve_btn = document.createElement("BUTTON");
	approve_btn.className = "btn btn-success";
	approve_btn.id = "approve"
	approve_btn.setAttribute("type", "button");
	approve_btn.addEventListener('click', function() {
		updateApproval("approve", modalName, "delete");
	});
	approve_btn.textContent = "Approve";
	footer.appendChild(reject_btn);
	footer.appendChild(approve_btn);

	content.appendChild(header);
	content.appendChild(body);
	content.appendChild(footer);

	dialog.appendChild(content);

	bsnModal.appendChild(dialog);

	document.getElementById("delete_modal_area").appendChild(bsnModal);

	//Request for data then show
	var obj = { "businessname": modalName.replace(/_/g, ' ') };
	var dbParam = JSON.stringify(obj);

	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {

			obj = JSON.parse(xmlhttp.responseText);
			console.log(obj);

			var lbr = document.createElement("BR");

      var owner = document.createElement("P");
			var owner_head = document.createElement("B");
			owner_head.textContent = "Owner: ";
			var owner_name = document.createTextNode(obj.res['FIRSTNAME'] + " " + obj.res['LASTNAME']);
			owner.appendChild(owner_head);
			owner.appendChild(owner_name);

      var grad_year = document.createElement("P");
      var grad_year_head = document.createElement("B");
      grad_year_head.textContent = "Graduation Year: ";
      var grad_year_txt = document.createTextNode(obj.res['GRAD_YEAR']);
      grad_year.appendChild(grad_year_head);
      grad_year.appendChild(grad_year_txt);

			var phone = document.createElement("P");
			var phone_head = document.createElement("B");
			phone_head.textContent = "Phone: ";
			var phone_num = document.createTextNode(obj.res['PHONENUMBER']);
			phone.appendChild(phone_head);
			phone.appendChild(phone_num);

			var requester = document.createElement("P");
			var requester_head = document.createElement("B");
			requester_head.textContent = "Requester: ";
			var requester_txt = document.createTextNode(obj.res['REQUESTER']);
			requester.appendChild(requester_head);
			requester.appendChild(requester_txt);

			body.appendChild(owner);
      body.appendChild(grad_year);
			body.appendChild(phone);
      body.appendChild(requester);

			$('#' + modalId).modal('show');
		}
	}

	xmlhttp.open("POST", "../php/getDeleteBusinessData.php", true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send("x=" + dbParam);
}
