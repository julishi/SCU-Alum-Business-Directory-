<?php
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $obj = json_decode($_POST["x"]);

    // collect input data
    $name = $obj->name;

      // Call the functions to insert the data
    verifyBusiness($name);
}

function verifyBusiness($name){
        //connect to your database. Type in your username, password and the DB path
    $conn=oci_connect('mcai','coen174', 'dbserver.engr.scu.edu/db11g');
    if(!$conn) {
        print "<br> connection failed:";
        exit;
    }

    $queryString = "SELECT businessname FROM LISTERS WHERE businessname = :name and approved = 1";
    $query = oci_parse($conn, $queryString);

    oci_bind_by_name($query, ':name', $name);

    // Execute the query
    $res = oci_execute($query);
    if (!$res) {
        $e = oci_error($query);
        echo $e['message'];
    }

    $nrows = oci_fetch_all($query, $res);

    if($nrows == 0) {
        $out = array('found' => 0);
    } else {
        $out = array('found' => 1);
    }

    echo json_encode($out);

    OCILogoff($conn);
}

?>
