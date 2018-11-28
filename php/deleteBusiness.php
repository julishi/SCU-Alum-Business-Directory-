<?php
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $obj = json_decode($_POST["x"]);
    // collect input data
    $firstname = $obj->firstname;
    $lastname = $obj->lastname;
    $gradyear = $obj->grad_year;
    $businessname = $obj->businessname;
    $phone = $obj->phone;
    $requester = $obj->requester;

    if (!empty($firstname)){
        $firstname = prepareInput($firstname);
    }
    if (!empty($lastname)){
        $lastname = prepareInput($lastname);
    }
    if (!empty($gradyear)){
        $gradyear = prepareInput($gradyear);
    }
    if (!empty($businessname)){
        $businessname = prepareInput($businessname);
    }
    if (!empty($phone)){
        $phone = prepareInput($phone);
    }
    if (!empty($requester)){
        $requester = prepareInput($requester);
    }
      // Call the functions to insert the data
    storeBusinessDeletion($firstname, $lastname, $gradyear, $businessname, $phone, $requester);
}

function prepareInput($inputData){
    $inputData = trim($inputData);
    $inputData  = htmlspecialchars($inputData);
    return $inputData;
}

function storeBusinessDeletion($firstname, $lastname, $gradyear, $businessname, $phone, $requester){
    //connect to your database. Type in your username, password and the DB path
    $conn = oci_connect('mcai', 'coen174', '//dbserver.engr.scu.edu/db11g');
    if(!$conn) {
        print "<br> connection failed:";
        exit;
    }

    $query = oci_parse($conn, "Insert Into Business_Deletions values(:firstname, :lastname, :grad_year, :businessname, :phone, :requester)");
    oci_bind_by_name($query, ':firstname', $firstname);
    oci_bind_by_name($query, ':lastname', $lastname);
    oci_bind_by_name($query, ':grad_year', $gradyear);
    oci_bind_by_name($query, ':businessname', $businessname);
    oci_bind_by_name($query, ':phone', $phone);
    oci_bind_by_name($query, ':requester', $requester);
    
    // Execute the query
    $res = oci_execute($query);
    if (!$res) {
        $e = oci_error($query);
        echo $e['message'];
    }
    OCILogoff($conn);
}
?>
