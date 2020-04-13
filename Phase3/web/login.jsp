<%-- 
    Document   : login
    Created on : Sep 23, 2019, 8:35:49 PM
    Author     : Robert Beckham
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Login</title>
        <link rel ="stylesheet" type ="text/css" href="style.css">
    </head>
    <body>
        <h1>Login</h1>
            <form action="membership?action=login" method="post">
            <label>Username</label>
            <input type="text" name="email"><br>
            <label>Password</label>
            <input type="password" name="password"><br>
            <input type="submit" value="login">
        <%--For some reason you have to submit twice, the professor said it's a 
            connection issue with the server. UPDATE: have to sign in, then initially go to desired page through URL --%>
        </form>
        <a href="signup.jsp">New user? Click here to register</a>
    </body>
</html>
