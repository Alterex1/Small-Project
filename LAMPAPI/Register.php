<?php
	$inData = getRequestInfo();
	
	//$FirstName = $inData["firstname"];
	//$LastName = $inData["lastname"];
    $Email = $inData["email"];
    $Password = $inData["password"];

	$conn = new mysqli("localhost", "RODRIGO", "12345", "COP4331");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = $conn->prepare("INSERT into Users (email,Password) VALUES(?,?)");
		$stmt->bind_param("ss", $Email,$Password);
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