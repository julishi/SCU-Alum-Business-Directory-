<?php
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
	$obj = json_decode($_POST["x"]);

	if($obj->res == "new") {

		getNewCardData();

	} else if($obj->res == "edit") {

		getEditCardData();

	} else if($obj->res == "approved") {

		getApprovedCardData();
	}
}

function console_log($data) {
    echo '<script>';
    echo 'console.log('. var_dump($data) .')';
    echo '</script>';
}

function getNewCardData() {

	$conn = oci_connect('mcai', 'coen174', 'dbserver.engr.scu.edu/db11g');
	if(!$conn) {
		$e = oci_error();
		print "getNewCardData: connection failed:";
		print htmlentities($e['message']);
		exit;
	}

	$queryString = "SELECT * FROM Business_Descriptions WHERE businessname in (SELECT businessname FROM Listers WHERE approved = 0)";
	$query = oci_parse($conn, $queryString);

	$res = oci_execute($query);
	if(!$res) {
		$e = oci_error($query);
		echo $e['message'];
		exit;
	}
	$nrows = oci_fetch_all($query, $res, null, null, OCI_FETCHSTATEMENT_BY_ROW);
	for($i = 0; $i < $nrows; $i++) {
		if($res[$i]["IMAGE"] != null) {
			$res[$i]["IMAGE"] = base64_encode($res[$i]["IMAGE"]);
		}
	}

	$out = array('count' => $nrows, 'res' => $res);
	echo json_encode($out);

	oci_free_statement($query);
	OCILogoff($conn);
}

function getEditCardData() {

	$conn = oci_connect('mcai', 'coen174', 'dbserver.engr.scu.edu/db11g');
	if(!$conn) {
		$e = oci_error();
		print "getEditCardData: connection failed:";
		print htmlentities($e['message']);
		exit;
	}

	$queryString = "SELECT * FROM Business_Descriptions WHERE businessname in (SELECT businessname FROM Business_Edits WHERE approved = 0)";
	$query = oci_parse($conn, $queryString);

	$res = oci_execute($query);
	if(!$res) {
		$e = oci_error($query);
		echo $e['message'];
		exit;
	}
	$nrows = oci_fetch_all($query, $res, null, null, OCI_FETCHSTATEMENT_BY_ROW);
	for($i = 0; $i < $nrows; $i++) {
		if($res[$i]["IMAGE"] != null) {
			$res[$i]["IMAGE"] = base64_encode($res[$i]["IMAGE"]);
		}
	}

	$out = array('count' => $nrows, 'res' => $res);
	echo json_encode($out);

	oci_free_statement($query);
	OCILogoff($conn);
}

function getApprovedCardData() {

	$conn = oci_connect('mcai', 'coen174', 'dbserver.engr.scu.edu/db11g');
	if(!$conn) {
		$e = oci_error();
		print "getApprovedCardData: connection failed:";
		print htmlentities($e['message']);
		exit;
	}

	$queryString = "SELECT * FROM Business_Descriptions WHERE businessname in (SELECT businessname FROM Listers WHERE approved = 1)";
	$query = oci_parse($conn, $queryString);

	$res = oci_execute($query);
	if(!$res) {
		$e = oci_error($query);
		echo $e['message'];
		exit;
	}
	$nrows = oci_fetch_all($query, $res, null, null, OCI_FETCHSTATEMENT_BY_ROW);
	for($i = 0; $i < $nrows; $i++) {
		if($res[$i]["IMAGE"] != null) {
			$res[$i]["IMAGE"] = base64_encode($res[$i]["IMAGE"]);
		}
	}

	$out = array('count' => $nrows, 'res' => $res);
	echo json_encode($out);

	oci_free_statement($query);
	OCILogoff($conn);
}

?>
