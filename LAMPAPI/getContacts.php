<?php
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
    $stmt = $conn->prepare("SELECT firstName, lastName,Phone,Email from Contacts where UserID=?");
   
    $UserId = $inData ["userid"];

    $stmt->bind_param("s", $UserId,);
    $stmt->execute();
    
    $result = $stmt->get_result();
    
    while($row = $result->fetch_assoc())
    {
        if( $searchCount > 0 )
        {
            $searchResults .= ' , ';
        }
        $searchCount++;
        $searchResults .= '" firstname: ' . $row["firstName"] . ' lastname: ' . $row["lastName"]. ' phone: ' . $row["Phone"] . ' email: ' . $row["Email"] . '"';
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