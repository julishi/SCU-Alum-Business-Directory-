function visits_counter(){
  //Call check cookie to see if the user is an Alum or Guest. If an Alum we'll want to increment the number of times
  //the user has visited the website. Otherwise there's nothing to increment. 
  //checkCookie returns a value 1 if the user is Alum. Thus the check is done to see if checkCookie() returns 1. 
  check = checkCookie();
    if (check == 1){
      //If the user is a Alum, we'll need their first name, last name, and grad year to update the Visits count in our SCU_Alum datatable.
      //Get first name, last name, and grad yar. All info is stored in the Cookie itself. 
      //The functions here are implemented in 
      var firstname = getFirstName();
      var lastname = getLastName();
      var gradyear = getGradYear();

      //put as object & send the data to visit.php file to update the info in the SCU_Alum table
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
