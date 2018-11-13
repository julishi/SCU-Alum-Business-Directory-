<?php
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
	$obj = json_decode($_POST["x"]);

	if($obj->res == "all") {
		getAlumniData();
	}

}

function getAlumniData() {

	$conn = oci_connect('mcai', 'coen174', 'dbserver.engr.scu.edu/db11g');
	if(!$conn) {
		$e = oci_error();
		print "getCardDate: connection failed:";
		print htmlentities($e['message']);
		exit;
	}

	$queryString = "SELECT * FROM SCU_ALUM";
	$query = oci_parse($conn, $queryString);

	$res = oci_execute($query);
	if(!$res) {
		$e = oci_error($query);
		echo $e['message'];
		exit;
	}
	$nrows = oci_fetch_all($query, $res, null, null, OCI_FETCHSTATEMENT_BY_ROW);

	$out = array('count' => $nrows, 'res' => $res);
	echo json_encode($out);

	OCILogoff($conn);

}

?>
