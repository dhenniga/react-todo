<?php
require_once 'include/DB_Functions.php';
$db = new DB_Functions();

$taskGroup = $_POST['taskGroup'] ?? '';
$isExpanded = $_POST['isExpanded'] ?? '';

$db->toggleExpanded(
    $taskGroup,
    $isExpanded
);