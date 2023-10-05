<!DOCTYPE html>
<html>
<head>
    <title> Digital Rolodex </title>
    <script type="text/javascript" src="code.js"></script>
    <link rel="stylesheet" type="text/css" href="createStyle.css">
</head>
<body>
    <div id="registerDiv">
            <h2 style="font-family: monospace;">Create Account</h2>

            
            <input type="text" id="email" placeholder="Email Address" style="font-family: monospace;"><br>
            
            <input type="password" id="password" placeholder="Password" style="font-family: monospace;"><br>

            <input type="password" id="rpassword" placeholder="Repeat Password" style="font-family: monospace;"><br>

            <button type="submit" id="createButton" style="font-family: monospace;" onclick="addUser()"> Create Account </button>

            <span id="addUserResult"></span>

            <button id="backButton" onclick="window.location.href='http://cop4331slp-18contactmanager.xyz/';" type="button" style="font-family: monospace;"> Back To Login Page </button>
            
    </div>
</body>
</html>
