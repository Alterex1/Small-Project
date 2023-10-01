<?php
	//search contact using any information
	//returns a list of contacts containing the string the user inputs
	//separated by a comma for every contact that matches the search
	
	$inData = getRequestInfo();
	
	$searchResults = "";
	$searchCount = 0;

	$conn = new mysqli("localhost", "RODRIGO", "12345", "COP4331");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = $conn->prepare("SELECT firstName, lastName,Phone,Email from Contacts where (firstName like ? or lastName like ? or Phone like ? or Email like ?)  and UserID=?");
		$firstName = "%" . $inData["firstname"] . "%";
       $secondName = "%" . $inData["secondname"] . "%";
        $Phone = "%" . $inData ["phone"] . "%";
        $Email = "%" . $inData ["email"] . "%";
        $UserId = $inData ["userid"];
		$stmt->bind_param("sssss", $firstName,$secondName,$Phone,$Email, $UserId,);
		$stmt->execute();
		
		$result = $stmt->get_result();
		
		while($row = $result->fetch_assoc())
		{
			if( $searchCount > 0 )
			{
				$searchResults .= ' , ';
			}
			$searchCount++;
			$searchResults .= '"' . $row["firstName"] . ' ' . $row["lastName"]. ' ' . $row["Phone"] . ' ' . $row["Email"] . '"';
		}
		
		if( $searchCount == 0 )
		{
			returnWithError( "No Records Found" );
		}
		else
		{
			returnWithInfo( $searchResults );
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
		$retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithInfo( $searchResults )
	{
		$retValue = '{"results":[' . $searchResults . '],"error":""}';
		sendResultInfoAsJson( $retValue );
	}
	
?>