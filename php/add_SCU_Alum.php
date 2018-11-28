<?php
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $obj = json_decode($_POST["x"]);
    // collect input data
    $firstname = $obj->firstname;
    $lastname = $obj->lastname;
    $gradyear = $obj->year;

    if (!empty($firstname)){
        $firstname = prepareInput($firstname);
    }
    if (!empty($lastname)){
        $lastname = prepareInput($lastname);
    }
    if (!empty($gradyear)){
        $gradyear = prepareInput($gradyear);
    }
      // Call the functions to insert the data
    insertSCUAlum($firstname, $lastname, $gradyear);
}

function prepareInput($inputData){
    $inputData = trim($inputData);
    $inputData  = htmlspecialchars($inputData);
    return $inputData;
}

function insertSCUAlum($firstname, $lastname, $gradyear){
    //connect to your database. Type in your username, password and the DB path
    $conn = oci_connect('mcai', 'coen174', '//dbserver.engr.scu.edu/db11g');
    if(!$conn) {
        print "<br> connection failed:";
        exit;
    }

    $query = oci_parse($conn, "Insert Into SCU_ALUM values(:firstname, :lastname, :grad_year, 0, 1)");
    oci_bind_by_name($query, ':firstname', $firstname);
    oci_bind_by_name($query, ':lastname', $lastname);
    oci_bind_by_name($query, ':grad_year', $gradyear);
    // Execute the query
    $res = oci_execute($query);
    if (!$res) {
        $e = oci_error($query);
        echo $e['message'];
    }
    OCILogoff($conn);
}
?>
