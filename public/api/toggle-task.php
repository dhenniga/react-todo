<?php
require_once 'include/DB_Functions.php';
$db = new DB_Functions();

$id = $_POST['id'] ?? '';
$state = $_POST['state'] ?? '';

$db->toggleTask(
    $id,
    $state
);
