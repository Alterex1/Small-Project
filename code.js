const urlBase = 'http://cop4331slp-18contactmanager.xyz/LAMPAPI';
const extension = 'php';

let userId = 0;
let email = "";


function Login()
{

    userId = 0;
	email = "";

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

                email = jsonObject.email;
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
	document.cookie = "email=" + email + ",userId=" + userId + ";expires=" + date.toGMTString();
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
			email = tokens[1];
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
		document.getElementById("userEmail").innerHTML = "Logged in as " + email + ",userID = " + userId;
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
		document.getElementById("colorAddResult").innerHTML = err.message;
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
				document.getElementById("colorSearchResult").innerHTML = "Users(s) has been retrieved";
				let jsonObject = JSON.parse( xhr.responseText );
				
				for( let i=0; i<jsonObject.results.length; i++ )
				{
					colorList += jsonObject.results[i];
					if( i < jsonObject.results.length - 1 )
					{
						colorList += "<br />\r\n";
					}
				}
				
				document.getElementsByTagName("p")[0].innerHTML = userList;
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("colorSearchResult").innerHTML = err.message;
	}
}

function openForm() {
    document.getElementById("myForm").style.display = "block";
  }
  
  function closeForm() {
    document.getElementById("myForm").style.display = "none";
  }




  function addContact()
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
				  //document.getElementById("addContactResult").innerHTML = "Contact has been added";
			  }
		  };
		  xhr.send(jsonPayload);
	  }
	  catch(err)
	  {
		  document.getElementById("colorAddResult").innerHTML = err.message;
	  }
  
  
  
  
  }