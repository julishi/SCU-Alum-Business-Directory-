<?php
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
	$obj = json_decode($_POST["x"]);

  $businessname = $obj->businessname;

	getbusinessCount($businessname);
}

function getbusinessCount($businessname) {
	$conn = oci_connect('mcai', 'coen174', '//dbserver.engr.scu.edu/db11g');
	if(!$conn) {
		$e = oci_error();
		print "getBusinessCount: connection failed:";
		print htmlentities($e['message']);
		exit;
	}

	$queryString = "begin :count := businessNameCount(:businessname); end;";
	$query = oci_parse($conn, $queryString);
	oci_bind_by_name($query, ':businessname', $businessname);
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
