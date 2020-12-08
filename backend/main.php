<?php
include 'db_config.php';
include 'router.php';

$myfile = fopen("newfile.txt", "w") or die("Unable to open file!");
$txt = "John Doe\n";
fwrite($myfile, $txt);
$txt = "Jane Doe\n";
fwrite($myfile, $txt);
fclose($myfile);

$conn = mysqli_connect($hostname, $db_username, $db_password, $database_name);
$router = new router($conn);
$router->route();
?>
