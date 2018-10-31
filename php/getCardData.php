<?php
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
	$obj = json_decode($_POST["x"]);
	
	if($obj->res == "all") {
		getCardData();
	} else {
		$text = $obj->text;
		$type1 = $obj->type1;
		$type2 = $obj->type2;
		$loc = $obj->loc;

		getSearchData($text, $type1, $type2, $loc);
	}

}

function getCardData() {

	$conn = oci_connect('mcai', 'magstar816', 'dbserver.engr.scu.edu/db11g');
	if(!$conn) {
		$e = oci_error();
		print "getCardDate: connection failed:";
		print htmlentities($e['message']);
		exit;
	}

	$queryString = "SELECT * FROM Business_Tags WHERE businessname in (SELECT businessname FROM Listers WHERE approved = 1)";
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

function getSearchData($text, $type1, $type2, $loc) {

	$conn = oci_connect('mcai', 'magstar816', 'dbserver.engr.scu.edu/db11g');
	if($conn) {
		print "getSearchData: connection successful";
	} else {
		$e = oci_error();
		print "getSearchData: connection failed:";
		print htmlentities($e['message']);
		exit;
	}

	//different search combinations: no text, no type1/2, no loc; combinations of them
	$query = oci_parse($conn, "Select name, type1, type2 From BusinessInfo Where verified = 1");

	$res = oci_execute($query);
	if(!$res) {
		$e = oci_error($query);
		echo $e['message'];
		exit;
	}
}

?>

