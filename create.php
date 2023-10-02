<!DOCTYPE html>
<html>
<head>
    <title> Digital Rolodex </title>
    <script type="text/javascript" src="js/backend.js"></script>
    <link rel="stylesheet" type="text/css" href="createStyle.css">
</head>
<body>
    <div class="form-container">
        <form action="create.php" method="post">
            <h2 style="font-family: monospace;">Create Account</h2>
            
            <input type="text" name="email" placeholder="Email Address" style="font-family: monospace;"><br>
            
            <input type="password" name="password" placeholder="Password" style="font-family: monospace;"><br>

            <input type="password" name="password" placeholder="Repeat Password" style="font-family: monospace;"><br>

            <button type="submit" style="font-family: monospace;"> Create Account </button>
        </form>
    </div>
</body>
</html>