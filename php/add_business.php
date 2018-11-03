<?php
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $obj = json_decode($_POST["x"]);

    // collect input data
    // add a place for img and decription
    $firstname = $obj->firstname;
    $lastname = $obj->lastname;
    $gradyear = $obj->year;
    $businessname = $obj->business;
    $address = $obj->address;
    $city = $obj->city;
    $state = $obj->state;
    $zipcode = $obj->zip;
    $email = $obj->email;
    $phone = $obj->phone;
    $tag = $obj->tag;


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
        $businesname = prepareInput($businessname);
    }
    if (!empty($address)){
        $address = prepareInput($address);
    }
    if (!empty($city)){
        $city = prepareInput($city);
    }
    if (!empty($state)){
        $state = prepareInput($state);
    }
    if (!empty($zipcode)){
        $zipcode = prepareInput($zipcode);
    }
    if (!empty($email)){
        $email = prepareInput($email);
    }
    if (!empty($phone)){
        $phone = prepareInput($phone);
    }

      // Call the functions to insert the data
    insertListers($firstname, $lastname, $gradyear, $businessname);
    insertBusiness_Number_Email($businessname, $phone, $email);
    insertBusiness_Addresses($businessname, $address, $city, $state, $zipcode);
    insertBusiness_Tags($businessname, $tag);
}

function prepareInput($inputData){
    $inputData = trim($inputData);
    $inputData  = htmlspecialchars($inputData);
    return $inputData;
}

function insertListers($firstname, $lastname, $gradyear, $businessname){
        //connect to your database. Type in your username, password and the DB path
    $conn=oci_connect('mcai','coen174', 'dbserver.engr.scu.edu/db11g');
    if(!$conn) {
        print "<br> connection failed:";
        exit;
    }
    $query = oci_parse($conn, "Insert Into Listers values(:firstname, :lastname, :grad_year, :businessname, 1)");

    oci_bind_by_name($query, ':firstname', $firstname);
    oci_bind_by_name($query, ':lastname', $lastname);
    oci_bind_by_name($query, ':grad_year', $gradyear);
    oci_bind_by_name($query, ':businessname', $businessname);

    // Execute the query
    $res = oci_execute($query);
    if (!$res) {
        $e = oci_error($query);
        echo $e['message'];
    }

    OCILogoff($conn);
}

function insertBusiness_Number_Email($businessname, $phonenumber, $email){
        //connect to your database. Type in your username, password and the DB path
    $conn=oci_connect('mcai','coen174', 'dbserver.engr.scu.edu/db11g');
    if(!$conn) {
        print "<br> connection failed:";
        exit;
    }
    $query = oci_parse($conn, "Insert Into Business_Number_Email values(:businessname, :phonenumber, :email)");

    oci_bind_by_name($query, ':businessname', $businessname);
    oci_bind_by_name($query, ':phonenumber', $phone);
    oci_bind_by_name($query, ':email', $email);

    // Execute the query
    $res = oci_execute($query);
    if (!$res) {
        $e = oci_error($query);
        echo $e['message'];
    }
    OCILogoff($conn);
}

function insertBusiness_Addresses($businessname, $address, $city, $state, $zipcode, $country){
        //connect to your database. Type in your username, password and the DB path
    $conn=oci_connect('mcai','coen174', 'dbserver.engr.scu.edu/db11g');        
    if(!$conn) {
        print "<br> connection failed:";
        exit;
    }

    $query = oci_parse($conn, "Insert Into Business_Addresses values(:businessname, :address, :city, :state, :zipcode)");

    oci_bind_by_name($query, ':businessname', $businessname);
    oci_bind_by_name($query, ':address', $address);
    oci_bind_by_name($query, ':city', $city);
    oci_bind_by_name($query, ':state', $state);
    oci_bind_by_name($query, ':zipcode', $zipcode);

    // Execute the query
    $res = oci_execute($query);
    if (!$res) {
        $e = oci_error($query);
        echo $e['message'];
    }
    OCILogoff($conn);
}

function insertBusiness_Tags($businessname, $tag) {

    $conn=oci_connect('mcai','coen174', 'dbserver.engr.scu.edu/db11g');        
    if(!$conn) {
        print "<br> connection failed:";
        exit;
    }

    $query = oci_parse($conn, "Insert Into Business_Tags values(:businessname, :tag)");

    oci_bind_by_name($query, ':businessname', $businessname);
    oci_bind_by_name($query, ':tag', $tag);

    // Execute the query
    $res = oci_execute($query);
    if (!$res) {
        $e = oci_error($query);
        echo $e['message'];
    }
    OCILogoff($conn);

}

?>
