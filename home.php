<!DOCTYPE html>
<html>
<head>
    <title> User Home Page </title>
    <script type="text/javascript" src="code.js"></script>
    <link rel="stylesheet" type="text/css" href="homeStyle.css">
    
    <script type="text/javascript">
	    document.addEventListener('DOMContentLoaded', function() 
	    {
	    	readCookie();
	    }, false);
	</script>
</head>
<body>
    <h2 style="font-family: monospace;"> Your Contact List </h2>

    <form id="form" role="search">
        <input type="search" id="query" name="q" placeholder="Search Contact..." style="font-family: monospace;">
        <button id="searchButton">
        <span id="contactSearchResults"></span>
        <svg viewBox="0 0 1024 1024"><path class="path1" d="M848.471 928l-263.059-263.059c-48.941 36.706-110.118 55.059-177.412 55.059-171.294 0-312-140.706-312-312s140.706-312 312-312c171.294 0 312 140.706 312 312 0 67.294-24.471 128.471-55.059 177.412l263.059 263.059-79.529 79.529zM189.623 408.078c0 121.364 97.091 218.455 218.455 218.455s218.455-97.091 218.455-218.455c0-121.364-103.159-218.455-218.455-218.455-121.364 0-218.455 97.091-218.455 218.455z"></path></svg>
        </button>
    </form>


    <div id="addDiv">
        <button onclick="openForm(this.parentNode.nextElementSibling)" id="popupButton" value="Add Contact" style="font-family: monospace;"> Add Contact </button>
    </div>
    <div class="form-popup" id="add">
        <input type="text" id="firstname" placeholder="Enter First Name" style="font-family: monospace;" required><br>
       
        <input type="text" id="lastname" placeholder="Enter Last Name" style="font-family: monospace;" required><br>
   
        <input type="text" id="phone" placeholder="Enter Phone Number" style="font-family: monospace;" required><br>
        
        <input type="text" id="email" placeholder="Enter Email" style="font-family: monospace;" required><br>
       
        <div id="addContactButtons">
            <button type="submit" id="actionButton" onclick="addContact(this.parentNode.parentNode);"class="btn">Add Contact</button>
            <span id="contactAddResult"></span>
            <button type="button" id="closeButton" class="btn cancel" onclick="closeForm(this.parentNode.parentNode)">Close</button>
        </div>
    </div>

    <div id="deleteDiv">
        <button onclick="openForm(this.parentNode.nextElementSibling)" id="popupButton" value="Delete Contact" style="font-family: monospace;"> Delete Contact </button>
    </div>
    <!-- The form -->
    <div class="form-popup" id="delete">
        <input type="text" id="email2" placeholder="Enter Email" style="font-family: monospace;" required><br>
        <div id="deleteContactButtons">
            <button type="submit" id="actionButton" onclick="deleteContact(this.parentNode.parentNode);"class="btn">Delete</button>
            <span id="contactDeleteResult"></span>
            <button type="button" id="closeButton" class="btn cancel" onclick="closeForm(this.parentNode.parentNode)">Close</button>
        </div>
    </div>
    

    <div style="overflow-y: auto;">
        <table>
            <thead>
                <tr>
                    <th style="font-family: monospace;">First Name</th>
                    <th style="font-family: monospace;">Last Name</th>
                    <th style="font-family: monospace;">Email Address</th>
                    <th style="font-family: monospace;">Phone Number</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style="font-family: monospace;">John</td>
                    <td style="font-family: monospace;">Galt</td>
                    <td style="font-family: monospace;">jg1105@gmail.com</td>
                    <td style="font-family: monospace;">313-445-5151</td>
                </tr>
            </tbody>
        </table>
    </div>

    <div id="logoutDiv">
        <span id="userEmail"></span>
        <button type="button" id="logoutButton" class = "buttons" style="font-family: monospace;" onclick="Logout();"> Logout </button>
    </div>
</body>
</html>