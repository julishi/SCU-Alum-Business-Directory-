<!--File Objective: To update the number of visits of an SCU Alum user-->
<?php
header("Content-Type: application/json; charset=UTF-8");
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    //wraps all the input variables read in through the visit.js javascript file
    //The variables come from the data that's stored in the cookie
    $obj = json_decode($_POST["x"]);
    // collect input data
    $firstname = $obj->firstname;
    $lastname = $obj->lastname;
    $year = $obj->year;
    // Call the functions to insert the data
    updateVisits($firstname, $lastname, $year);
}

//Updates the number of visits here. Takes input parameters First/Last name, and grad year of the SCU Alum who's visiting the website. 
//Doesn't return a value. 
//Just increments visits column by one for that user.
function updateVisits($firstname, $lastname, $year){
    //connect to your database. Type in your username, password and the DB path
    $conn=oci_connect('mcai','coen174', 'dbserver.engr.scu.edu/db11g');
    if(!$conn) {
        print "<br> connection failed:";
        exit;
    }

    //locate row that holds the user 
    //sets visit to the old value of visits + 1
    $queryString = "UPDATE SCU_ALUM Set visits = ((SELECT visits FROM SCU_ALUM
                    Where firstname = :firstname and lastname = :lastname and grad_year = :year)+1)
                    Where firstname = :firstname and lastname = :lastname and grad_year = :year";

    $query = oci_parse($conn, $queryString);
    oci_bind_by_name($query, ':firstname', $firstname);
    oci_bind_by_name($query, ':lastname', $lastname);
    oci_bind_by_name($query, ':year', $year);
    // Execute the query
    $res = oci_execute($query);
    if (!$res) {
        $e = oci_error($query);
        echo $e['message'];
    }

    oci_free_statement($query);
    OCILogoff($conn);
}
?>
