
<?php
	//This endpoint searches for an existing account inside the Users table in the DB 
	//Takes json as input with email and password from user
	//If a match is found, returns a json file with the user's firstname, lastname and userID
	



	//getRequestInfo reads a json input given by the http request
	$inData = getRequestInfo();
	
	$id = 1;
	$firstName = "";
	$lastName = "";
	//Stablishing connection to the DB
	$conn = new mysqli("localhost", "RODRIGO", "12345", "COP4331"); 	
	if( $conn->connect_error )
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		//Prepare statement to add a new user to the table using email and password
		$stmt = $conn->prepare("SELECT ID,FirstName,LastName FROM Users WHERE Email=? AND Password =?");
		//reads input from request body
		$stmt->bind_param("ss", $inData["email"], $inData["password"]);
		$stmt->execute();
		$result = $stmt->get_result();
		//if a fetch is successful, return firstname, lastanem and ID as a json file.
		if( $row = $result->fetch_assoc()  )
		{
			returnWithInfo( $row['FirstName'], $row['LastName'], $row['ID'] );
		}
		else
		{
			returnWithError("No Records Found");
		}

		$stmt->close();
		$conn->close();
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
		$retValue = '{"ID":0,"FirstName":"","LastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithInfo( $firstName, $lastName, $id )
	{
		$retValue = '{"ID":' . $id . ',"FirstName":"' . $firstName . '","LastName":"' . $lastName . '","error":""}';
		sendResultInfoAsJson( $retValue );
	}
	
?>
