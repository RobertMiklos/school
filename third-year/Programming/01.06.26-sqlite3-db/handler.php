<?php
$raw_data = file_get_contents("php://input");

$data = json_decode($raw_data, true);

$username = $data["username"];
$email = $data["email"];
$password = $data["password"];

$username = escapeshellarg($username);
$email = escapeshellarg($email);
$password = escapeshellarg($password);

shell_exec("python backend.py ". $username . " " . $email . " " . $password);

echo'{"status": "ok"}';
?>