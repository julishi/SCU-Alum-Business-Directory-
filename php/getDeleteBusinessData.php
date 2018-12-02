<!-- Author: Maggie Cai -->
<!-- File: getDeleteBusinessData.php -->
<!-- Description: This file contains the php for getting business deletion data for a business from the database -->
<?php
header("Content-Type: application/json; charset=UTF-8");

// Retrieve data from the server
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $obj = json_decode($_POST["x"]);

    // collect input data
    $name = $obj->businessname;

    getBusinessData($name);
}

// Function: getBusinessData
// Parameters:  $name string  business name
// Returns: $out JSON JSON encoded array containing business deletion data
// Description: This function executes a query to retrieve all data for a business from Business_Deletions
function getBusinessData($name){
    //connect to your database. Type in your username, password and the DB path
    $conn = oci_connect('mcai', 'coen174', '//dbserver.engr.scu.edu/db11g');
    if(!$conn) {
        print "<br> connection failed:";
        exit;
    }

    $queryString = "SELECT * FROM Business_Deletions WHERE businessname = :name";
    $query = oci_parse($conn, $queryString);
    oci_bind_by_name($query, ':name', $name);

    $res = oci_execute($query);
    if (!$res) {
        $e = oci_error($query);
        echo $e['message'];
    }
    $res = oci_fetch_assoc($query);

    $out = array('res' => $res);
    echo json_encode($out);

    oci_free_statement($query);
    OCILogoff($conn);
}

?>
