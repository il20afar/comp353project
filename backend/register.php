<?php
include 'db_config.php';
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Content-Type");

$json = file_get_contents('php://input');
$obj = json_decode($json, true);
$username = $obj['name'];
$password = $obj['password'];

$conn = mysqli_connect($hostname, $db_username, $db_password, $database_name);
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
$query = "SELECT username, password FROM user WHERE username='$username' AND password='$password'";
$result = mysqli_query($conn, $query);

if (mysqli_num_rows($result) > 0) {
    echo json_encode("Account found!");
} else {
    echo json_encode("Wrong credentials.");
}
?>