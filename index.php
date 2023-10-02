<!DOCTYPE html>
<html>
<head>
    <title> Digital Rolodex </title>
    <script type="text/javascript" src="js/backend.js"></script>
    <link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>
    <div class="form-container">
        <form>
            <h2 style="font-family: monospace;">Welcome to RoloNext:</h2>
            <h2 style="font-family: monospace;">A Modern Rolodex</h2>
            
            <input type="text" name="email" placeholder="Email Address" style="font-family: monospace;"><br>
            
            <input type="password" name="password" placeholder="Password" style="font-family: monospace;"><br>


            

            <button onclick="Login()" type="submit" value="Login" style="font-family: monospace;"> Login </button>

            <button onclick="addUser()" value="Register" type="submit" style="font-family: monospace;"> Create Account </button>
            
        </form>
    </div>
</body>
</html>