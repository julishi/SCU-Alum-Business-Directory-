<!-- Author: Maggie Cai -->
<!-- File: getBusinessData.php -->
<!-- Description: This file contains the php for getting business data for a business from the database -->
<?php
header("Content-Type: application/json; charset=UTF-8");

// Retrieve the data from the server
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $obj = json_decode($_POST["x"]);

    // collect input data
    $name = $obj->businessname;

    getBusinessData($name);
}

// Function:  getBusinessData
// Parameters:  $name string  business name
// Returns:	$out	JSON	JSON encoded array containing the business data
// Description: This function executes queries to retrieve all business data for a business from the database
function getBusinessData($name){
    //connect to your database. Type in your username, password and the DB path
    $conn = oci_connect('mcai', 'coen174', '//dbserver.engr.scu.edu/db11g');
    if(!$conn) {
        print "<br> connection failed:";
        exit;
    }

    $queryAddr = "SELECT address, city, state, zipcode FROM Business_Addresses WHERE businessname = :name";
    $query = oci_parse($conn, $queryAddr);
    oci_bind_by_name($query, ':name', $name);

    // Execute the query
    $res = oci_execute($query);
    if (!$res) {
        $e = oci_error($query);
        echo $e['message'];
    }
    $addr = oci_fetch_assoc($query);

    $queryContact = "SELECT phonenumber, email FROM Business_Number_Email WHERE businessname = :name";
    $query = oci_parse($conn, $queryContact);
    oci_bind_by_name($query, ':name', $name);

    $res = oci_execute($query);
    if (!$res) {
        $e = oci_error($query);
        echo $e['message'];
    }
    $contact = oci_fetch_assoc($query);

    $queryOwner = "SELECT firstname, lastname, grad_year FROM Listers WHERE businessname = :name";
    $query = oci_parse($conn, $queryOwner);
    oci_bind_by_name($query, ':name', $name);

    $res = oci_execute($query);
    if (!$res) {
        $e = oci_error($query);
        echo $e['message'];
    }
    $owner = oci_fetch_assoc($query);

    $queryDescrip = "SELECT tag, comments, image FROM Business_Descriptions WHERE businessname = :name";
    $query = oci_parse($conn, $queryDescrip);
    oci_bind_by_name($query, ':name', $name);

    $res = oci_execute($query);
    if (!$res) {
        $e = oci_error($query);
        echo $e['message'];
    }
    $nrows = oci_fetch_all($query, $descrip, null, null, OCI_FETCHSTATEMENT_BY_ROW);
    if($descrip[0]["IMAGE"] != null) {
        $descrip[0]["IMAGE"] = base64_encode($descrip[0]["IMAGE"]);
    }

    $out = array('address' => $addr, 'contact' => $contact, 'owner' => $owner, 'description' => $descrip);
    echo json_encode($out);

    OCILogoff($conn);
}

?>
