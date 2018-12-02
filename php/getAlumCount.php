<!-- Author: Maggie Cai -->
<!-- File: getAlumCount.php -->
<!-- Description: This file contains the php for getting alum name count from the database -->
<?php
header("Content-Type: application/json; charset=UTF-8");

// Retrieve data from the server
if ($_SERVER["REQUEST_METHOD"] == "POST") {
	$obj = json_decode($_POST["x"]);

  $firstname = $obj->firstname;
  $lastname = $obj->lastname;
  $gradyear = $obj->year;

	getAlumCount($firstname, $lastname, $gradyear);

}

// Function:  console_log
// Parameters:  $data mixed data to be dumped to console
// Returns: Void
// Description: This function dumps information about $data to the console.
function console_log($data) {
    echo '<script>';
    echo 'console.log('. var_dump($data) .')';
    echo '</script>';
}

// Function:  getAlumCount
// Parameters:  $firstname	string	first name of alum
// 		$lastname	string	last name of alum
// 		$gradyear	string	grad year of alum
// Returns: $out	array	contains the number of times the alum appears in the SCU_ALUM table
// Description: This function returns the number of times an alum appears in the SCU_ALUM table
function getAlumCount($firstname, $lastname, $gradyear) {

	$conn = oci_connect('mcai', 'coen174', '//dbserver.engr.scu.edu/db11g');
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
