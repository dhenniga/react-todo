<?php
require_once 'include/DB_Functions.php';
$db = new DB_Functions();

$id = $_POST[ 'id' ];
$taskGroup = $_POST[ 'taskGroup' ];
$dateCreated = $_POST[ 'dateCreated' ];

$db->createTask(
    $id,
    $taskGroup,
    $dateCreated
);