<?php

session_start();

require_once 'connect.php';

$connection= @new mysqli($host,$user,$pass,$db);

if($connection->connect_errno!=0){
    echo "Failed to connect to DB".$connection->connect_errno;
}
else{
$email=$_POST['email'];
$password=$_POST['password'];

$sql = "SELECT * FROM logowanie WHERE email='$email' AND haslo='$password'";
if ($result = $connection->query($sql)){
    $users=$result->num_rows;
    if($users> 0){
        $wers=$result->fetch_assoc();
        $_SESSION['email'] = $wers["email"];
        $password = $wers["password"];
        $result->free_result();
        header('Location: form.php');
}else{ 
    echo "";
}

$connection->close();
}
}

?>