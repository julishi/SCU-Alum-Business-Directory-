<?php
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
	$obj = json_decode($_POST["x"]);
	
	if($obj->res == "all") {
		getCardData();
	} else {
		$text = $obj->text;
		$tag = $obj->tag;
		$loc = $obj->loc;

		getSearchData($text, $tag, $loc);
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

function getSearchData($text, $tag, $loc) {

	$conn = oci_connect('mcai', 'magstar816', 'dbserver.engr.scu.edu/db11g');
	if(!$conn) {
		$e = oci_error();
		print "getSearchData: connection failed:";
		print htmlentities($e['message']);
		exit;
	}

	//different search combinations: no text, no type1/2, no loc; combinations of them
	if($text == null && $tag == null && $loc == null) {
		$queryString = "SELECT * FROM Business_Tags WHERE businessname in (SELECT businessname FROM Listers WHERE approved = 1)";
		$query = oci_parse($conn, $queryString);

	} else if($text == null && $tag != null && $loc == null) {
		$queryString = "SELECT * FROM Business_Tags WHERE businessname in (SELECT businessname FROM Listers WHERE approved = 1) and tag = :tag";
		$query = oci_parse($conn, $queryString);
		oci_bind_by_name($query, ':tag', $tag);

	} else if($text == null && $tag == null && $loc != null) {
		$queryString = "SELECT * FROM Business_Tags WHERE businessname in (SELECT businessname FROM Business_Addresses WHERE businessname in (SELECT businessname FROM Listers WHERE approved = 1) and city = :loc)";
		$query = oci_parse($conn, $queryString);
		oci_bind_by_name($query, ':loc', $loc);

	} else if($text == null && $tag != null && $loc != null) {
		$queryString = "SELECT * FROM Business_Tags WHERE tag = :tag and businessname in (SELECT businessname FROM Business_Addresses WHERE city = :loc and businessname in (SELECT businessname FROM Listers WHERE approved = 1))";
		$query = oci_parse($conn, $queryString);
		oci_bind_by_name($query, ':tag', $tag);
		oci_bind_by_name($query, ':loc', $loc);

	}

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
