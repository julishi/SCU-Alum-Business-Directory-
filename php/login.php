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
