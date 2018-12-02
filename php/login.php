<!-- Author: Maggie Cai -->
<!-- File: login.php -->
<!-- Description: This file contains the php for validating if the login data exists -->
<?php
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
	$obj = json_decode($_POST["x"]);

  $user = $obj->user;
  $pwd = $obj->pwd;

	login($user, $pwd);

}

function console_log($data) {
    echo '<script>';
    echo 'console.log('. var_dump($data) .')';
    echo '</script>';
}

// Function:	login 
// Parameters:	$user	string	login username
// 		$pwd	string	login password
// Returns: $out	JSON	JSON encoded array contaning if the login info is valid or not 
// Description:	This function executes a query to check if the login info is valid or not 
function login($user, $pwd) {

	$conn = oci_connect('mcai', 'coen174', '//dbserver.engr.scu.edu/db11g');
	if(!$conn) {
		$e = oci_error();
		print "login: connection failed:";
		print htmlentities($e['message']);
		exit;
	}

	$queryString = "begin :valid := user_security.validate_user_account_exists(:user, :pwd); end;";
	$query = oci_parse($conn, $queryString);
	oci_bind_by_name($query, ':user', $user);
	oci_bind_by_name($query, ':pwd', $pwd);
	oci_bind_by_name($query, ':valid', $valid);

	$res = oci_execute($query);
	if(!$res) {
		$e = oci_error($query);
		echo $e['message'];
		exit;
	}

	$out = array('valid' => $valid);
	echo json_encode($out);

	OCILogoff($conn);

}

?>
