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

  // Loop through the contacts array and create table rows
  for (var i = 0; i < contacts.length; i++) {
      
    var contact = contacts[i];
    var row = document.createElement("tr");

    // Create table cells for each contact property
    var firstNameCell = document.createElement("td");
    firstNameCell.textContent = contact.firstName;

    var lastNameCell = document.createElement("td");
    lastNameCell.textContent = contact.lastName;

    var emailAddressCell = document.createElement("td");
    emailAddressCell.textContent = contact.email;

    var phoneNumberCell = document.createElement("td");
    phoneNumberCell.textContent = contact.phone;

    var updateButtonCell = document.createElement("button");
    var updateText = document.createTextNode("Update");
    updateButtonCell.appendChild(updateText);


    // Append cells to the row
    row.appendChild(firstNameCell);
    row.appendChild(lastNameCell);
    row.appendChild(emailAddressCell);
    row.appendChild(phoneNumberCell);
    row.appendChild(updateButtonCell);

    // Append the row to the table body
    tableBody.appendChild(row);
  }

}


// Loop through the contacts array and create table rows


}
