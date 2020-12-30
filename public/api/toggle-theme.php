<?php
require_once 'include/DB_Functions.php';
$db = new DB_Functions();

$isDarkTheme = $_POST['isDarkTheme'];

$db->toggleTheme(
    $isDarkTheme
);
