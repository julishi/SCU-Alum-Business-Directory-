function visits_counter(){
  //Call check cookie to see if there is a cookie stored or not
  check = checkCookie();
    if (check == 1){
      //Call first name
      var firstname = getFirstName();
      var lastname = getLastName();
      var gradyear = getGradYear();

      //put as object & send the data to php file

      var obj = { "firstname": firstname, "lastname": lastname, "year": gradyear};
      var dbParam = JSON.stringify(obj);

    	var xmlhttp = new XMLHttpRequest();
    	xmlhttp.onreadystatechange = function() {
    		if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {

    			obj = xmlhttp.responseText;
    		}
    	};
      xmlhttp.open("POST", "../php/visits.php", true);
      xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xmlhttp.send("x=" + dbParam);

    }
}
