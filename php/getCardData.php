<!-- Author: Maggie Cai -->
<!-- File: getCardData.php -->
<!-- Description: This file contains the php for getting business card data from the database -->
<?php
header("Content-Type: application/json; charset=UTF-8");

// Retrieve data from the server
if ($_SERVER["REQUEST_METHOD"] == "POST") {
	$obj = json_decode($_POST["x"]);

	if($obj->res == "all") {
		getCardData();
	} else {
		$txt = $obj->text;
		$tag = $obj->tag;
		$loc = $obj->loc;

		getSearchData($txt, $tag, $loc);
	}

}

function console_log($data) {
    echo '<script>';
    echo 'console.log('. var_dump($data) .')';
    echo '</script>';
}

// Function:  getCardData
// Parameters:  None
// Returns:	$out	JSON	JSON encoded array containing all business card data
// Description: This function executes a query to retrieve all business card data from the database
function getCardData() {

	$conn = oci_connect('mcai', 'coen174', '//dbserver.engr.scu.edu/db11g');
	if(!$conn) {
		$e = oci_error();
		print "getCardData: connection failed:";
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

	OCILogoff($conn);
}

// Function:  getSearchData
// Parameters:  $txt	string	text from search box
// 		$tag	string	business tag
// 		$loc	string	business location
// Returns:	$out	JSON	JSON encoded array containing business card data
// Description: This function executes a query to retrieve all business card data that match the search data from the database
function getSearchData($txt, $tag, $loc) {

	$conn = oci_connect('mcai', 'coen174', '//dbserver.engr.scu.edu/db11g');
	if(!$conn) {
		$e = oci_error();
		print "getSearchData: connection failed:";
		print htmlentities($e['message']);
		exit;
	}

	//different search combinations: no text, no type, no loc; combinations of them
	$queryString = "SELECT * FROM table(searchFilters(:txt, :tag, :loc))";

	$query = oci_parse($conn, $queryString);
	oci_bind_by_name($query, ':txt', $txt);
	oci_bind_by_name($query, ':tag', $tag);
	oci_bind_by_name($query, ':loc', $loc);

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

	OCILogoff($conn);
}

?>
