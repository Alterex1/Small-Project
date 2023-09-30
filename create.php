<?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "COP4331";

    $conn = new mysqli($servername, $username, $password, $dbname);
    
    if($conn->connect_error)
    {
        die("Connection failed: " . $connect->connect_error);
    }
    echo "Connected Successfully!\n";
    echo $conn->host_info . "\n";


    $conn->close();
?>