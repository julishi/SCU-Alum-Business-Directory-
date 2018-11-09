<?php
//header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    //$obj = json_decode($_POST["x"]);

    // collect input data
    // $firstname = $obj->firstname;
    // $lastname = $obj->lastname;
    // $gradyear = $obj->year;
    // $old_name = $obj->business;
    // $new_name = $obj->new_name;
    // $address = $obj->address;
    // $city = $obj->city;
    // $state = $obj->state;
    // $zipcode = $obj->zip;
    // $email = $obj->email;
    // $phone = $obj->phone;
    // $tag = $obj->tag;
    // $img = $obj->img;
    // $descrip = $obj->descrip;

    $data = $_POST;

    $firstname = $data["first-name"];
    $lastname = $data["last-name"];
    $gradyear = $data["grad_year-select"];
    $new_name = $data["business-name"];
    $address = $data["business-address"];
    $city = $data["business-city"];
    $state = $data["state-select"];
    $zipcode = $data["business-zip"];
    $email = $data["business-email"];
    $phone = $data["business-phone"];
    $tag = $data["select-tag"];
    $descrip = $data["business-descrip"];
    $old_name = $data["old-name"];

    $img = $_FILES;
    $img = file_get_contents($_FILES["business-img"]["tmp_name"]);


    if (!empty($firstname)){
        $firstname = prepareInput($firstname);
    }
    if (!empty($lastname)){
        $lastname = prepareInput($lastname);
    }
    if (!empty($gradyear)){
        $gradyear = prepareInput($gradyear);
    }
    if (!empty($old_name)){
        $old_name = prepareInput($old_name);
    }
    if (!empty($new_name)) {
        $new_name = prepareInput($new_name);
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
    storeBusinessEdits($firstname, $lastname, $gradyear, $old_name, $new_name, $address, $city, $state, $zipcode, $email, $phone, $tag, $descrip, $img);
}

function console_log($data) {
    echo '<script>';
    echo 'console.log('. var_dump($data) .')';
    echo '</script>';
}

function prepareInput($inputData){
    $inputData = trim($inputData);
    $inputData  = htmlspecialchars($inputData);
    return $inputData;
}

function storeBusinessEdits($firstname, $lastname, $gradyear, $old_name, $new_name, $address, $city, $state, $zipcode, $email, $phone, $tag, $descrip, $img) {
    //connect to your database. Type in your username, password and the DB path
    $conn=oci_connect('mcai','coen174', 'dbserver.engr.scu.edu/db11g');
    if(!$conn) {
        print "<br> connection failed:";
        exit;
    }

    $query = oci_parse($conn, "INSERT Into Business_Edits (firstname, lastname, grad_year, businessname, new_businessname, phonenumber, email, address, city, state, zipcode, tag, comments, image, approved) values(:firstname, :lastname, :gradyear, :old_name, :new_name, :phone, :email, :address, :city, :state, :zipcode, :tag, :descrip, empty_blob(), 0) RETURNING image INTO :img");

    $blob = oci_new_descriptor($conn, OCI_D_LOB);

    oci_bind_by_name($query, ':firstname', $firstname);
    oci_bind_by_name($query, ':lastname', $lastname);
    oci_bind_by_name($query, ':gradyear', $gradyear);
    oci_bind_by_name($query, ':old_name', $old_name);
    oci_bind_by_name($query, ':new_name', $new_name);
    oci_bind_by_name($query, ':phone', $phone);
    oci_bind_by_name($query, ':email', $email);
    oci_bind_by_name($query, ':address', $address);
    oci_bind_by_name($query, ':city', $city);
    oci_bind_by_name($query, ':state', $state);
    oci_bind_by_name($query, ':zipcode', $zipcode);
    oci_bind_by_name($query, ':tag', $tag);
    oci_bind_by_name($query, ':descrip', $descrip);
    oci_bind_by_name($query, ':img', $blob, -1, OCI_B_BLOB);

    // Execute the query
    $res = oci_execute($query, OCI_DEFAULT);
    if (!$res) {
        $e = oci_error($query);
        echo $e['message'];
    }

    if($blob->save($img)) {
        oci_commit($conn);
        echo "Upload successful";
    } else {
        echo "Couldn't upload image";
    }

    console_log($res);

    $blob->free();
    oci_free_statement($query);
    OCILogoff($conn);
}

?>
