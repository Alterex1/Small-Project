var contactIDArr = [];

function showContacts(id){

    var contacts = [];


    let tmp = {userid:id};

    //var tmp = {login:login,password:hash};
    let jsonPayload = JSON.stringify( tmp );
    

    let url = 'http://cop4331slp-18contactmanager.xyz/LAMPAPI/getContacts.php'

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try
    {
        xhr.onreadystatechange = function() 
        {
            if (this.readyState == 4 && this.status == 200) 
            {

            contacts = JSON.parse(xhr.responseText);
            updateContactTable(contacts);

        }
        };
        xhr.send(jsonPayload);
    }
    catch(err)
    {
        // document.getElementById("deleteContactResult").innerHTML = err.message;
    }




    function updateContactTable(contacts) {
        // Find the table body element
        var tableBody = document.getElementById("contactTableBody");
        var tmpID = [];
        // Loop through the contacts array and create table rows
        for (var i = 0; i < contacts.length; i++) {
            
            var contact = contacts[i];
            var row = document.createElement("tr");

            // Create table cells for each contact property
            var ID = document.createElement("td");
            ID.textContent = contact.contactID;
            tmpID[i] = contact.contactID;
            console.log(ID.textContent);

            var firstNameCell = document.createElement("td");
            firstNameCell.textContent = contact.firstName;

            var lastNameCell = document.createElement("td");
            lastNameCell.textContent = contact.lastName;

            var emailAddressCell = document.createElement("td");
            emailAddressCell.textContent = contact.email;

            var phoneNumberCell = document.createElement("td");
            phoneNumberCell.textContent = contact.phone;

            var updateButtonCell = document.createElement("td");
            var updateButton = document.createElement("button");
            var updateText = document.createTextNode("Update");
            updateButton.appendChild(updateText);
            updateButtonCell.appendChild(updateButton);

            var updateDeleteCell = document.createElement("td");
            var buttonDelete = document.createElement("button");
            var updateText2 = document.createTextNode("Delete");
            buttonDelete.appendChild(updateText2);
            buttonDelete.onclick = ("click", function(){deleteContactButton(ID.textContent)});
            buttonDelete.addEventListener("click", location.reload);
            updateDeleteCell.appendChild(buttonDelete);


            // Append cells to the row
            row.appendChild(ID);
            row.appendChild(firstNameCell);
            row.appendChild(lastNameCell);
            row.appendChild(emailAddressCell);
            row.appendChild(phoneNumberCell);
            row.appendChild(updateButtonCell);
            row.appendChild(updateDeleteCell);

            // Append the row to the table body
            tableBody.appendChild(row);
        }

        contactID = tmpID;
    }


// Loop through the contacts array and create table rows
}

function deleteContactButton(curID)
{
    
	let tmp = {id:curID,userid:userId};
    let jsonPayload = JSON.stringify( tmp );


    let url = urlBase + '/deleteContact.' + extension;
    
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try
    {
        xhr.onreadystatechange = function() 
        {
            if (this.readyState == 4 && this.status == 200) 
            {
                //document.getElementById("deleteContactResult").innerHTML = "Contact has been added";
            }
        };
        
    }
    catch(err)
    {
        document.getElementById("deleteContactResult").innerHTML = err.message;
    }

    xhr.send(jsonPayload);
}

function checkContact(curNode)
{   
    console.log(document.getElementById(curNode.id).value);
	var tmpID = document.getElementById(curNode.id).value;

    var found = contactIDArr.find((element) => element == tmpID);

    console.log(found);

	return false;
}

function checkArray()
{

}