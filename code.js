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
	
	document.getElementById("loginResult").innerHTML = "";

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
					document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
					return;
				}

                		loginEmail = email;
				//firstName = jsonObject.firstName;
				//lastName = jsonObject.lastName;

				saveCookie();
	
				window.location.href = "home.php";
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

    if(newPassword != newRPassword)
    {
        document.getElementById("addUserResult").innerHTML = "Passwords do not match";
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
				document.getElementById("addUserResult").innerHTML = "User has been added";
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
  }


function addContact(curID)
{


    let firstname = document.getElementById("firstname").value;
    let lastname = document.getElementById("lastname").value;
    let phone = document.getElementById("phone").value;
    let email = document.getElementById("email").value;

    


    //document.getElementById("addContactResult").innerHTML = "";

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




}


function deleteContact(curID)
{
	let email = document.getElementById("email").value;

	let tmp = {email:email,userid:userId};
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

}

function getContacts()
{
	let url = urlBase + '/getContacts.' + extension

	let xhr = new XMLHTTPRequest();
	xhr.open("GET", url, false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	 try
	  {
		  xhr.onreadystatechange = function() 
		  {
			  if (this.readyState == 4 && this.status == 200) 
			  {
				  let jsonObject = JSON.parse( xhr.responseText );
				  contactFirstName = jsonObject.firstname;
				  contactLastName = jsonObject.lastname;
				  contactPhone = jsonObject.phone;
				  contactEmail = jsonObject.email;  
			  }
		  };
		  xhr.send(jsonPayload);
	  }
	catch(err)
	  {
		  // document.getElementById("deleteContactResult").innerHTML = err.message;
	  }
}


function Logout()
{
	userId = 0;
	document.cookie = "email= ;  expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "index.php";
}

