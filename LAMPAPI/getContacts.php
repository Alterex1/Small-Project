<?php
$inData = getRequestInfo();
	
$searchResults = array(); // Use an array to store the results

$conn = new mysqli("localhost", "RODRIGO", "12345", "COP4331");
if ($conn->connect_error) 
{
    returnWithError($conn->connect_error);
} 
else
{
    $stmt = $conn->prepare("SELECT firstName, lastName, Phone, Email,ID from Contacts where UserID=?");
   
    $UserId = $inData["userid"];

    $stmt->bind_param("s", $UserId);
    $stmt->execute();
    
    $result = $stmt->get_result();
    
    while ($row = $result->fetch_assoc())
    {
        $contact = array(
            "firstName" => $row["firstName"],
            "lastName" => $row["lastName"],
            "phone" => $row["Phone"],
            "email" => $row["Email"],
            "contactID" => $row["ID"]
        );
        
        $searchResults[] = $contact; // Add each contact as a separate object
    }
    
    if (empty($searchResults))
    {
        returnWithError("No Records Found");
    }
    else
    {
        sendResultInfoAsJson($searchResults); // Return the entire array
    }
    
    $stmt->close();
    $conn->close();
}

function getRequestInfo()
{
    return json_decode(file_get_contents('php://input'), true);
}

function sendResultInfoAsJson($obj)
{
    header('Content-type: application/json');
    echo json_encode($obj); // Encode the array as JSON
}

function returnWithError($err)
{
    $retValue = array(
        "error" => $err
    );
    sendResultInfoAsJson($retValue);
}
?>