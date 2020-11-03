<?php
include 'db_config.php';
include 'router.php';

$conn = mysqli_connect($hostname, $db_username, $db_password, $database_name);
$router = new router($conn);
$router->route();
mysqli_close($conn);

?>
