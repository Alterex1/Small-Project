<!DOCTYPE html>
<html>
<head>
    <title> Digital Rolodex </title>
    <link rel="stylesheet" type="text/css" href="style.css">
    <script type="text/javascript" src="md5.js"></script>
	<script type="text/javascript" src="code.js"></script>
    <link href="style.css" rel="stylesheet">	
    <link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet">
</head>
<body>
    <div id="loginDiv">
        
            <h2 style="font-family: monospace;">Welcome to RoloNext:</h2>
            <h2 style="font-family: monospace;">A Modern Rolodex</h2>
            
            <input type="text" id="email" placeholder="login" style="font-family: monospace;"><br>
            
            <input type="password" id="password" placeholder="Password" style="font-family: monospace;"><br>

            <button type="button" id="loginButton" class = "buttons" style="font-family: monospace;" onclick="Login();"> Login </button>

            <button formaction="register.php" value="Register" type="submit" style="font-family: monospace;"> Create Account </button>

            <span id="loginResult"></span>
    </div>
</body>
</html>