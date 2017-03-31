<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "formajax";

$conn = new mysqli($servername, $username, $password, $dbname);

if (isset($_POST["username"])) {
    $usernames = $_POST["username"];
    $password = $_POST["password"];
    $email = $_POST["email"];
    $sqlinsert = "INSERT INTO account (username, password, email) VALUE ('$usernames','$password','$email')";
    $sqlselect = "SELECT username FROM account WHERE username='$usernames' ";
    $result = $conn->query($sqlselect);
    if ($result->num_rows == 1) {
        echo "Tài khoản đã tồn tại";
    } else {
        if (mysqli_query($conn, $sqlinsert)) {
            echo "Created successfully";
        }
    }
    exit();
}
mysqli_close($conn);