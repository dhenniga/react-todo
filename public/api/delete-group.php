<?php
require_once 'include/DB_Functions.php';
$db = new DB_Functions();

$taskGroup = $_POST['taskGroup'];

$db->deleteGroup(
    $taskGroup
);
