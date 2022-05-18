<?php
require_once 'include/DB_Functions.php';
$db = new DB_Functions();

$id = $_POST['id'];
$taskText = $_POST['taskText'];
$taskGroup = $_POST['taskGroup'];
$dateCreated = $_POST['dateCreated'];
$dateToBeCompleted = $_POST['dateToBeCompleted'];
$taskCompletedTime = $_POST['taskCompletedTime'];
$quantity = $_POST['quantity'];
$note = $_POST['note'];
$isChecked = $_POST['isChecked'];

$db->createTask(
    $id,
    $taskText,
    $taskGroup,
    $dateCreated,
    $dateToBeCompleted,
    $taskCompletedTime,
    $quantity,
    $note,
    $isChecked
);