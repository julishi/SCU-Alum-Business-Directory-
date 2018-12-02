<!-- Author: Maggie Cai -->
<!-- File: updateApproval.php -->
<!-- Description: This file contains the php for updating a business's approval status -->
<?php
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
	$obj = json_decode($_POST["x"]);

	$status = $obj->status;
	$name = $obj->businessname;
	$type = $obj->type;

	updateApproval($status, $name, $type);
}

function console_log($data) {
    echo '<script>';
    echo 'console.log('. var_dump($data) .')';
    echo '</script>';
}

// Function:	updateApproval
// Parameters:	$status	string	contains approval decision, either "approve" or "reject"
// 		$name	string	business name
// 		$type	string	request type, either "new", "edit", "delete"
// Returns:	None
// Description:	This function executes a query to update the approval status of a business depending on request type 
function updateApproval($status, $name, $type) {

	$conn = oci_connect('mcai', 'coen174', '//dbserver.engr.scu.edu/db11g');
	if(!$conn) {
		$e = oci_error();
		print "updateApproval: connection failed:";
		print htmlentities($e['message']);
		exit;
	}

	$queryString = "begin updateApproval(:status, :name, :type); end;";
	$query = oci_parse($conn, $queryString);
	oci_bind_by_name($query, ':status', $status);
	oci_bind_by_name($query, ':name', $name);
	oci_bind_by_name($query, ':type', $type);

	$res = oci_execute($query);
	if(!$res) {
		$e = oci_error($query);
		echo $e['message'];
		exit;
	}

	echo "success";

	oci_free_statement($query);
	OCILogoff($conn);
}

?>
