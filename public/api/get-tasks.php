<?php
header( 'Access-Control-Allow-Origin: *' );
require_once 'include/DB_Functions.php';
$db = new DB_Functions();
$db->getTasks();
?>