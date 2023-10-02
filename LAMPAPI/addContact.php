<?php

	//This endpoint adds a new contact to a specific user
	//recieves name, user ID, phone and email to be stored
	//return a json file with no info
	
	$inData = getRequestInfo();
	
	$firstName = $inData["firstname"];
	$lastName = $inData["lastname"];
	$userId = $inData["userid"];
    $phone = $inData["phone"];
    $email = $inData["email"];

	$conn = new mysqli("localhost", "RODRIGO", "12345", "COP4331");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = $conn->prepare("INSERT into Contacts (firstName,lastName,UserId,phone,email) VALUES(?,?,?,?,?)");
		$stmt->bind_param("sssss", $firstName, $lastName, $userId,$phone,$email);
		$stmt->execute();
		$stmt->close();
		$conn->close();
		returnWithError("");
	}

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
?>