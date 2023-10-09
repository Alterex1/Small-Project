const urlBase = 'http://cop4331slp-18contactmanager.xyz/LAMPAPI';
const extension = 'php';

let userId = 0;
let loginEmail = "";


function Login()
{

    userId = 0;
	loginEmail = "";

    let email = document.getElementById("email").value;
	let password = document.getElementById("password").value;
	//var hash = md5( password );
	
    if(email == "" || password == "")
    {
        document.getElementById("loginResult").innerHTML = "Field(s) Left Blank";
        return;
    }

	let tmp = {email:email,password:password};
	//var tmp = {login:login,password:hash};
	let jsonPayload = JSON.stringify( tmp );
	
	let url = urlBase + '/Login.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				let jsonObject = JSON.parse( xhr.responseText );
				userId = jsonObject.ID;
				
				//console.log(userfirstName);
		
				if( userId < 1 )
				{		
					document.getElementById("loginResult").innerHTML = "User/Password Combination Incorrect";
					return;
				}

                		loginEmail = email;
				//firstName = jsonObject.firstName;
				//lastName = jsonObject.lastName;

				saveCookie();
	
				window.location.href = "home.php?id="+userId;
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}


}


function saveCookie()
{
	let minutes = 20;
	let date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));	
	document.cookie = "email=" + loginEmail + ",userId=" + userId + ";expires=" + date.toGMTString();
}

function readCookie()
{
	userId = -1;
	let data = document.cookie;
	let splits = data.split(",");
	for(var i = 0; i < splits.length; i++) 
	{
		let thisOne = splits[i].trim();
		let tokens = thisOne.split("=");
		if( tokens[0] == "email" )
		{
			loginEmail = tokens[1];
		}
		else if( tokens[0] == "userId" )
		{
			userId = parseInt( tokens[1].trim() );
		}
	}
	
	if( userId < 0 )
	{
		window.location.href = "index.php";
	}
	else
	{
		document.getElementById("userEmail").innerHTML = "Logged in as " + loginEmail + ", userID = " + userId;
	}
}

function addUser()
{
	let newEmail = document.getElementById("email").value;
    let newPassword = document.getElementById("password").value;
    let newRPassword = document.getElementById("rpassword").value;
	document.getElementById("addUserResult").innerHTML = "";

    if(newEmail == "" || newPassword == "" || newRPassword == "")
    {
        document.getElementById("addUserResult").innerHTML = "Field(s) Left Blank";
        return;
    }

    if(newPassword != newRPassword)
    {
        document.getElementById("addUserResult").innerHTML = "Passwords Do Not Match";
        return;
    }
    
	let tmp = {email:newEmail,password:newPassword};
	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + '/Register.' + extension;
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("addUserResult").innerHTML = "User Added! Please Return to the Login Screen";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("addUserResult").innerHTML = err.message;
	}
	
}

function searchContact()
{
	let srch = document.getElementById("query").value;
	document.getElementById("contactSearchResults").innerHTML = "";
	
	let userList = "";

	let tmp = {search:srch,userId:userId};
	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + '/searchContact.' + extension;
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("contactSearchResult").innerHTML = "Users(s) has been retrieved";
				let jsonObject = JSON.parse( xhr.responseText );
				
				for( let i=0; i<jsonObject.results.length; i++ )
				{
					contactList += jsonObject.results[i];
					if( i < jsonObject.results.length - 1 )
					{
						contactList += "<br />\r\n";
					}
				}
				
				document.getElementsByTagName("p")[0].innerHTML = userList;
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactSearchResult").innerHTML = err.message;
	}
}

function openForm(curID) {
    document.getElementById(curID.id).style.display = "block";
  }
  
function closeForm(curID) {
    document.getElementById(curID.id).style.display = "none";
    var temp = curID.getElementsByTagName('div')[0].getElementsByTagName('span');
    temp[0].innerHTML = "";
}


function addContact(curID)
{
    let firstname = document.getElementById("firstname").value;
    let lastname = document.getElementById("lastname").value;
    let phone = document.getElementById("phone").value;
    let email = document.getElementById("email").value;

    if(firstname == "" || lastname == "" || phone == "" || email == "")
    {
        document.getElementById("contactAddResult").innerHTML = "There are Empty Fields!";
        return false;
    }

    for(var i = 0; i < firstname.length; i++)
    {
        if((firstname.charCodeAt(i) < 65 || firstname.charCodeAt(i) > 90) && (firstname.charCodeAt(i) < 97 || firstname.charCodeAt(i) > 122))
        {
            document.getElementById("contactAddResult").innerHTML = "First Name contains a number/special character";
            return false;
        }
    }
    for(var i = 0; i < lastname.length; i++)
    {
        if((lastname.charCodeAt(i) < 65 || lastname.charCodeAt(i) > 90) && (lastname.charCodeAt(i) < 97 || lastname.charCodeAt(i) > 122))
        {
            document.getElementById("contactAddResult").innerHTML = "Last Name contains numbers/special characters";
            return false;
        }
    }
    for(var i = 0; i < phone.length; i++)
    {
        if(phone.charCodeAt(i) < 48 || phone.charCodeAt(i) > 57 )
        {
            document.getElementById("contactAddResult").innerHTML = "Phone Number contains characters/special characters";
            return false;
        }
    }

    let tmp = {firstname:firstname,lastname:lastname,phone:phone,email:email,userid:userId};
    let jsonPayload = JSON.stringify( tmp );

    let url = urlBase + '/addContact.' + extension;
    
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try
    {
        xhr.onreadystatechange = function() 
        {
            if (this.readyState == 4 && this.status == 200) 
            {
                document.getElementById(curID.id).style.display = "none";
                var temp = document.getElementById(curID.id).getElementsByTagName('input');
                for(var i = 0; i < temp.length; i++)
                {
                    temp[i].value = "";
                }
                //document.getElementById("addContactResult").innerHTML = "Contact has been added";
            }
        };
        xhr.send(jsonPayload);
    }
    catch(err)
    {
        document.getElementById("addContactResult").innerHTML = err.message;
    }

    return true;

}

function deleteContact(curID)
{
	let id = document.getElementById("ID").value;
    
	let tmp = {id:id,userid:userId};
    let jsonPayload = JSON.stringify( tmp );

    if(id == "")
    {
        document.getElementById("contactDeleteResult").innerHTML = "Please Enter an ID";
        return false;
    }

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
                document.getElementById(curID.id).style.display = "none";
                var temp = document.getElementById(curID.id).getElementsByTagName('input');
                for(var i = 0; i < temp.length; i++)
                {
                    temp[i].value = "";
                }
                //document.getElementById("deleteContactResult").innerHTML = "Contact has been added";
            }
        };
        xhr.send(jsonPayload);
    }
    catch(err)
    {
        document.getElementById("deleteContactResult").innerHTML = err.message;
    }

    return true;
}


function Logout()
{
	userId = 0;
	document.cookie = "email= ;  expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "index.php";
}



function searchForContacts() {
	
	
	contactsToSearch = [];
	let input = document.getElementById("input").value;
    
	let tmp = {input:input,userid:userId};
    let jsonPayload = JSON.stringify( tmp );


	let url = urlBase + '/searchContact.' + extension;
    
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try
    {
        xhr.onreadystatechange = function() 
        {
            if (this.readyState == 4 && this.status == 200) 
            {
                
				contactsToSearch = JSON.parse(xhr.responseText);
				
            	updateSearchTable(contactsToSearch);
                //document.getElementById("deleteContactResult").innerHTML = "Contact has been added";
            }
        };
        xhr.send(jsonPayload);
    }
    catch(err)
    {
        document.getElementById("deleteContactResult").innerHTML = err.message;
    }


  }
  

function updateSearchTable(contactsToSearch){
	

	hideAllRows();





	var tableBody = document.getElementById("contactTableBody");

	// Loop through the contacts array and create table rows
	for (var i = 0; i < contactsToSearch.length; i++) {
		
	  var contact = contactsToSearch[i];
	  var row = document.createElement("tr");
  
		// Create table cells for each contact property
		var ID = document.createElement("td");
		ID.textContent = contact.id;
  
		var firstNameCell = document.createElement("td");
		firstNameCell.textContent = contact.firstname;
  
	  var lastNameCell = document.createElement("td");
	  lastNameCell.textContent = contact.lastname;
  
	  var emailAddressCell = document.createElement("td");
	  emailAddressCell.textContent = contact.email;
  
	  var phoneNumberCell = document.createElement("td");
	  phoneNumberCell.textContent = contact.phone;
  
	  // Append cells to the row
	  row.appendChild(ID);
	  row.appendChild(firstNameCell);
	  row.appendChild(lastNameCell);
	  row.appendChild(emailAddressCell);
	  row.appendChild(phoneNumberCell);
  
	  // Append the row to the table body
	  tableBody.appendChild(row);
	}
	
  
  }


	  



function hideAllRows() {
  var table = document.getElementById("contactTableBody"); 

  if (table) {
    var rows = table.getElementsByTagName("tr"); // Get all table rows

    // Loop through all rows
    for (var i = 0; i < rows.length; i++) {
      rows[i].style.display = "none"; // Hide each row
    }
  } else {
    
  }
}

function updateContact(curID)
{
    let firstname = document.getElementById("firstname2").value;
    let lastname = document.getElementById("lastname2").value;
    let phone = document.getElementById("phone2").value;
    let email = document.getElementById("email2").value;
    let tempID = document.getElementById("ID2").value;

    if(firstname == "" || lastname == "" || phone == "" || email == "" || tempID == "")
    {
        document.getElementById("finalUpdateResult").innerHTML = "There are Empty Fields!";
        return false;
    }

    for(var i = 0; i < firstname.length; i++)
    {
        if((firstname.charCodeAt(i) < 65 || firstname.charCodeAt(i) > 90) && (firstname.charCodeAt(i) < 97 || firstname.charCodeAt(i) > 122))
        {
            document.getElementById("finalUpdateResult").innerHTML = "First Name contains a number/special character";
            return false;
        }
    }
    for(var i = 0; i < lastname.length; i++)
    {
        if((lastname.charCodeAt(i) < 65 || lastname.charCodeAt(i) > 90) && (lastname.charCodeAt(i) < 97 || lastname.charCodeAt(i) > 122))
        {
            document.getElementById("finalUpdateResult").innerHTML = "Last Name contains a number/special character";
            return false;
        }
    }
    for(var i = 0; i < phone.length; i++)
    {
        if(phone.charCodeAt(i) < 48 || phone.charCodeAt(i) > 57 )
        {
            document.getElementById("finalUpdateResult").innerHTML = "Phone Number contains a character/special character";
            return false;
        }
    }

    let tmp = {firstname:firstname,lastname:lastname,contactid:tempID,userid:userId,phone:phone,email:email};
    let jsonPayload = JSON.stringify( tmp );

    let url = urlBase + '/updateContact.' + extension;
    
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try
    {
        xhr.onreadystatechange = function() 
        {
            if (this.readyState == 4 && this.status == 200) 
            {
                document.getElementById(curID.id).style.display = "none";
                var temp = document.getElementById(curID.id).getElementsByTagName('input');
                for(var i = 0; i < temp.length; i++)
                {
                    temp[i].value = "";
                }
                //document.getElementById("addContactResult").innerHTML = "Contact has been added";
            }
        };
        xhr.send(jsonPayload);
    }
    catch(err)
    {
        document.getElementById("addContactResult").innerHTML = err.message;
    }

    return true;
}