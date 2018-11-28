//add function as an else statement in the home.html

function visits_counter(){
    check = checkCookie();
    if (check == 1){
    //Call first name
        var FirstName = getFirstName();
        var LastName = getLastName();
        var GradYear = getGradYear();

        //put as object & send the data to php file

        var obj = { "firstname": val[0], "lastname": val[1], "year": val[2]};
        var dbParam = JSON.stringify(obj);

    	var xmlhttp = new XMLHttpRequest();
    	xmlhttp.onreadystatechange = function() {
    		if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {

    			obj = xmlhttp.responseText;
    			window.alert("You have successfully submitted a business! Business will be displayed after approval.");
    			window.location.href = "home.html";
    		}
    	};
        xmlhttp.open("POST", "../php/verifyAlum.php", true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    	xmlhttp.send("x=" + dbParam));

    }
}
