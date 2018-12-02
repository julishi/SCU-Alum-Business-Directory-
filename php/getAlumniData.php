<!-- Author: Maggie Cai -->
<!-- File: getAlumniData.php -->
<!-- Description: This file contains the php for getting all alum data database -->
<?php
header("Content-Type: application/json; charset=UTF-8");

// Retrieve data from the server
if ($_SERVER["REQUEST_METHOD"] == "POST") {
	$obj = json_decode($_POST["x"]);

	if($obj->res == "all") {
		getAlumniData();
	}

}

// Function:  getAlumCount
// Parameters:  None
// Returns: $out	JSON	JSON encoded array containing the total number of alums and all alum data
// Description: This function returns all alum data.
function getAlumniData() {

	$conn = oci_connect('mcai', 'coen174', '//dbserver.engr.scu.edu/db11g');
	if(!$conn) {
		$e = oci_error();
		print "getAlumniData: connection failed:";
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
