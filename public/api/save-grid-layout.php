<?php
require_once 'include/DB_Functions.php';
$db = new DB_Functions();

$gridLayout = $_POST['gridLayout'];

$db->saveGridLayout(
    $gridLayout
);
