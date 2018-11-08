<?php
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $obj = json_decode($_POST["x"]);

    // collect input data
    $firstname = $obj->firstname;
    $lastname = $obj->lastname;
    $gradyear = $obj->year;
    $businessname = $obj->business;
    $new_businessname = $obj->new_businessname;
    $address = $obj->address;
    $city = $obj->city;
    $state = $obj->state;
    $zipcode = $obj->zip;
    $email = $obj->email;
    $phone = $obj->phone;
    $tag = $obj->tag;
    $img = $obj->img;
    $descrip = $obj->descrip;

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
    if (!empty($new_businessname)) {
        $new_businessname = prepareInput($new_businessname);
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
    if (!empty($descrip)) {
        $descrip = prepareInput($descrip);
    }

    // Call the function to insert the data
    storeBusinessEdits($firstname, $lastname, $gradyear, $businessname, $new_businessname, $address, $city, $state, $zipcode, $email, $phone, $tag, $descrip, $img);
}

function prepareInput($inputData){
    $inputData = trim($inputData);
    $inputData  = htmlspecialchars($inputData);
    return $inputData;
}

function storeBusinessEdits($firstname, $lastname, $gradyear, $businessname, $new_businessname, $address, $city, $state, $zipcode, $email, $phone, $tag, $descrip, $img) {
    //connect to your database. Type in your username, password and the DB path
    $conn=oci_connect('mcai','coen174', 'dbserver.engr.scu.edu/db11g');
    if(!$conn) {
        print "<br> connection failed:";
        exit;
    }

    $query = oci_parse($conn, "INSERT Into Business_Edits values(:firstname, :lastname, :gradyear, :businessname, :new_businessname, :phone, :email, :address, :city, :state, :zipcode, :tag, :descrip, 0)");

    oci_bind_by_name($query, ':firstname', $firstname);
    oci_bind_by_name($query, ':lastname', $lastname);
    oci_bind_by_name($query, ':gradyear', $gradyear);
    oci_bind_by_name($query, ':businessname', $businessname);
    oci_bind_by_name($query, ':new_businessname', $new_businessname);
    oci_bind_by_name($query, ':phone', $phone);
    oci_bind_by_name($query, ':email', $email);
    oci_bind_by_name($query, ':address', $address);
    oci_bind_by_name($query, ':city', $city);
    oci_bind_by_name($query, ':state', $state);
    oci_bind_by_name($query, ':zipcode', $zipcode);
    oci_bind_by_name($query, ':tag', $tag);
    oci_bind_by_name($query, ':descrip', $descrip);
    //oci_bind_by_name($query, ':img', $img)

    // Execute the query
    $res = oci_execute($query);
    if (!$res) {
        $e = oci_error($query);
        echo $e['message'];
    }

    $out = array('res' => $res);

    echo json_encode($out);

    OCILogoff($conn);
}

?>
