<!-- Author: Maggie Cai -->
<!-- File: verifyAlum.php -->
<!-- Description: This file contains the php for verifying an alum -->
<?php
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $obj = json_decode($_POST["x"]);

    // collect input data
    $firstname = $obj->firstname;
    $lastname = $obj->lastname;
    $year = $obj->year;
    $action = $obj->action;

    // Call the functions to insert the data
    verifyAlum($firstname, $lastname, $year, $action);
}

// Function:  verifyAlum
// Parameters:  $firstname  string  alum's first name
//    $lastname string  alum's last name
//    $year string  alum's grad year
//    $action string  contains verify or unverify
// Returns: Void
// Description: This function executes a query depending on action to update alum approval status 
function verifyAlum($firstname, $lastname, $year, $action){
    //connect to your database. Type in your username, password and the DB path
    $conn = oci_connect('mcai', 'coen174', '//dbserver.engr.scu.edu/db11g');
    if(!$conn) {
        print "<br> connection failed:";
        exit;
    }

    if($action == "verify") {
      $queryString = "UPDATE SCU_ALUM Set approved = 1 Where firstname = :firstname and lastname = :lastname and grad_year = :year";
    } else {
      $queryString = "UPDATE SCU_ALUM Set approved = 0 Where firstname = :firstname and lastname = :lastname and grad_year = :year";
    }

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

    OCILogoff($conn);
}

?>
