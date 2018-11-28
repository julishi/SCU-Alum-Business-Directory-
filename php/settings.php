<?php
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
	$obj = json_decode($_POST["x"]);

  $user = $obj->user;
  $old_pwd = $obj->old_pwd;
  $new_pwd = $obj->new_pwd;

	changePassword($user, $old_pwd, $new_pwd);

}

function console_log($data) {
    echo '<script>';
    echo 'console.log('. var_dump($data) .')';
    echo '</script>';
}

function changePassword($user, $old_pwd, $new_pwd) {

	$conn = oci_connect('mcai', 'coen174', '//dbserver.engr.scu.edu/db11g');
	if(!$conn) {
		$e = oci_error();
		print "login: connection failed:";
		print htmlentities($e['message']);
		exit;
	}

	$queryString = "begin user_security.change_account_password(:user, :old_pwd, :new_pwd); end;";
	$query = oci_parse($conn, $queryString);
	oci_bind_by_name($query, ':user', $user);
	oci_bind_by_name($query, ':old_pwd', $old_pwd);
	oci_bind_by_name($query, ':new_pwd', $new_pwd);

	$res = oci_execute($query);
	if(!$res) {
		$e = oci_error($query);
		echo $e['message'];
		exit;
	}

  $out = array('success' => 1);
	echo json_encode($out);

	OCILogoff($conn);

}

?>
