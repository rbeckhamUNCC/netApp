<%-- 
    Document   : signup
    Created on : Sep 23, 2019, 8:36:01 PM
    Author     : Robert Beckham
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <title>Sign Up</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" type="text/css" href="style.css">
    </head>
    <body>
        <h1>Sign-up form</h1>
        <form action="membership?action=signup" method="post">
            <label>First Name</label>
            <input type="text" id="first" name="first"> <br><br>
            <label>Last Name</label>
            <input type="text" id="last" name="last"> <br><br>
            <label>Email</label>
            <input type="text" id="email" name="email"> <br><br>
            <label>Password</label>
            <input type="password" id="password" name="password"> <br><br>
            <input type="submit" value="Sign Up">
        </form>
        
    </body>
</html>
