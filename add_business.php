<?php
$conn=oci_connect('','', '//dbserver.engr.scu.edu/db11g');
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // collect input data
    $firstname = $_POST['first-name'];
    $lastname = $_POST['last-name'];
    $gradyear = $_POST['grad_year_select'];
    $businessname = $_POST['business-name'];
    $city = $_POST['business-city'];
    $state = $_POST['state-select'];
    $country = $_POST['business-country'];
    $zipcode = $_POST['business-zip'];
    $businessemail = $_POST['business-email'];
    $businessphone = $_POST['business-phone'];


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
     if (!empty($city)){
                $city = prepareInput($city);
     }
     if (!empty($state)){
                $state = prepareInput($state);
     }
     if (!empty($country)){
                $country = prepareInput($country);
     }
     if (!empty($zipcode)){
                $zipcode = prepareInput($zipcode);
     }
     if (!empty($businessemail)){
                $businessemail = prepareInput($businessemail);
     }
     if (!empty($businessphone)){
                $businessphone = prepareInput($businessphone);
     }

      // Call the functions to insert the data
      insertListers($firstname, $lastname, $gradyear, $businessname);
      insertBusiness_Number_Email($businessname, $phonenumber, $email);
      insertBusiness_Addresses($businessname, $address, $city, $state, $zipcode, $country);
}
function prepareInput($inputData){
        $inputData = trim($inputData);
        $inputData  = htmlspecialchars($inputData);
        return $inputData;
}

insertListers($firstname, $lastname, $gradyear, $businessname){
        //connect to your database. Type in your username, password and the DB path
$conn=oci_connect('','', '//dbserver.engr.scu.edu/db11g');
        if(!$conn) {
             print "<br> connection failed:";
        exit;
        }
        $query = oci_parse($conn, "Insert Into Listers(firstname, lastname, grad_year, businessname) ");

        oci_bind_by_name($query, ':firstname', $firstname);
        oci_bind_by_name($query, ':lastname', $lastname);
        oci_bind_by_name($query, ':grad_year', $gradyear);
        oci_bind_by_name($query, ':businessname', $businessname);

        // Execute the query
        $res = oci_execute($query);
        if ($res)
                echo '<br><br> <p style="color:green;font-size:20px">Data successfully inserted</p>';
        else{
                $e = oci_error($query);
                echo $e['message'];
        }
        OCILogoff($conn);
}

insertBusiness_Number_Email($businessname, $phonenumber, $email){
        //connect to your database. Type in your username, password and the DB path
$conn=oci_connect('','', '//dbserver.engr.scu.edu/db11g');
        if(!$conn) {
             print "<br> connection failed:";
        exit;
        }
        $query = oci_parse($conn, "Insert Into Business_Number_Email(businessname, phonenumber, email)");

        oci_bind_by_name($query, ':businessname', $businessname);
        oci_bind_by_name($query, ':phonenumber', $phonenumber);
        oci_bind_by_name($query, ':email', $email);

        // Execute the query
        $res = oci_execute($query);
        if ($res)
                echo '<br><br> <p style="color:green;font-size:20px">Data successfully inserted</p>';
        else{
                $e = oci_error($query);
                echo $e['message'];
        }
        OCILogoff($conn);
}

insertBusiness_Addresses($businessname, $address, $city, $state, $zipcode, $country){
        //connect to your database. Type in your username, password and the DB path
$conn=oci_connect('','', '//dbserver.engr.scu.edu/db11g');        
if(!$conn) {
             print "<br> connection failed:";
        exit;
        }

        $query = oci_parse($conn, "Insert Into Business_Addresses(businessname, address, city, state, zipcode, country)");

        oci_bind_by_name($query, ':businessname', $businessname);
        oci_bind_by_name($query, ':address', $address);
        oci_bind_by_name($query, ':city', $city);
        oci_bind_by_name($query, ':state', $state);
        oci_bind_by_name($query, ':zipcode', $zipcode);
        oci_bind_by_name($query, ':country', $country);

        // Execute the query
        $res = oci_execute($query);
        if ($res)
                echo '<br><br> <p style="color:green;font-size:20px">Data successfully inserted</p>';
        else{
                $e = oci_error($query);
                echo $e['message'];
        }
        OCILogoff($conn);
}

?>
