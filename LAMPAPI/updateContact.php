<?php

	//This endpoint adds a new contact to a specific user
	//recieves name, user ID, phone and email to be stored
	//return a json file with no info
	
	$inData = getRequestInfo();
	
	$newFirstName = $inData["firstname"];
	$newLastName = $inData["lastname"];
	$contactID = $inData["contactid"];
	$userId = $inData["userid"];
    $newPhone = $inData["phone"];
    $newEmail = $inData["email"];

	$conn = new mysqli("localhost", "RODRIGO", "12345", "COP4331");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = $conn->prepare("UPDATE Contacts SET firstName=? WHERE ID = ? AND firstName <> ?");
		$stmt->bind_param("sss", $newFirstName,$contactID,$newFirstName);
		$stmt->execute();


		$stmt = $conn->prepare("UPDATE Contacts SET lastName=? WHERE ID = ? AND lastName <> ?");
		$stmt->bind_param("sss", $newLastName,$contactID,$newLastName);
		$stmt->execute();

		$stmt = $conn->prepare("UPDATE Contacts SET Phone=? WHERE ID = ? AND Phone <> ?");
		$stmt->bind_param("sss", $newPhone,$contactID,$newPhone);
		$stmt->execute();


		$stmt = $conn->prepare("UPDATE Contacts SET Email=? WHERE ID = ? AND Email <> ?");
		$stmt->bind_param("sss", $newEmail,$contactID,$newEmail);
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