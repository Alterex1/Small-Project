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
            
            <input type="text" name="email" placeholder="Email Address" style="font-family: monospace;"><br>
            
            <input type="password" name="password" placeholder="Password" style="font-family: monospace;"><br>

            <input type="password" name="password" placeholder="Repeat Password" style="font-family: monospace;"><br>

            <button type="submit" id="createButton" style="font-family: monospace;" onclick="addUser()"> Create Account </button>

            <span id="addUserResult"></span>
    </div>
</body>
</html>