<?php
require_once 'include/DB_Functions.php';
$db = new DB_Functions();

$id = $_POST['id'] ?? '';
$date = $_POST['date'] ?? '';

$db->updateTaskCompletedTime($id, $date);
