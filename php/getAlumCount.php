<?php
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
	$obj = json_decode($_POST["x"]);

  $firstname = $obj->firstname;
  $lastname = $obj->lastname;
  $gradyear = $obj->year;

	getAlumCount($firstname, $lastname, $gradyear);

}

function console_log($data) {
    echo '<script>';
    echo 'console.log('. var_dump($data) .')';
    echo '</script>';
}

function getAlumCount($firstname, $lastname, $gradyear) {

	$conn = oci_connect('mcai', 'coen174', 'dbserver.engr.scu.edu/db11g');
	if(!$conn) {
		$e = oci_error();
		print "getAlumCount: connection failed:";
		print htmlentities($e['message']);
		exit;
	}

	$queryString = "begin :count := alumNameCount(:firstname, :lastname, :gradyear); end;";
	$query = oci_parse($conn, $queryString);
	oci_bind_by_name($query, ':firstname', $firstname);
	oci_bind_by_name($query, ':lastname', $lastname);
	oci_bind_by_name($query, ':gradyear', $gradyear);
	oci_bind_by_name($query, ':count', $count);

	$res = oci_execute($query);
	if(!$res) {
		$e = oci_error($query);
		echo $e['message'];
		exit;
	}

	$out = array('count' => $count);
	echo json_encode($out);

	OCILogoff($conn);

}

?>
