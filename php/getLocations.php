<?php
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $obj = json_decode($_POST["x"]);

    // collect input data
    $res = $obj->res;

    // Call the functions to insert the data
    if ($res == "location") {
      getLocations();
    }
}

function getLocations(){
        //connect to your database. Type in your username, password and the DB path
    $conn = oci_connect('mcai', 'coen174', '//dbserver.engr.scu.edu/db11g');
    if(!$conn) {
        print "<br> connection failed:";
        exit;
    }

    $queryString = "SELECT DISTINCT city FROM Business_Addresses WHERE businessname in (Select businessname From Listers Where approved = 1)";
    $query = oci_parse($conn, $queryString);

    // Execute the query
    $res = oci_execute($query);
    if (!$res) {
        $e = oci_error($query);
        echo $e['message'];
    }

    $nrows = oci_fetch_all($query, $res);

    $out = array('count' => $nrows, 'res' => $res);
    echo json_encode($out);

    OCILogoff($conn);
}

?>
