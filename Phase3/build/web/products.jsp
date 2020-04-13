<%-- 
    Document   : products
    Created on : Sep 23, 2019, 8:34:21 PM
    Author     : Robert Beckham
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="stylesheet" href="style.css"/>
        <title>Product Management</title>
        <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
    </head>
    
    <body>
        <p> Hi, ${user.firstName} </p>
        <p>You are currently logged in as: <c:out value="${user.email}" default="Guest" /></p>
                
        <h2>Products</h2>

        <table>
            <tr>
                <th>Code</th>
                <th>Description</th>
                <th class="right">Price</th>
                <th>&nbsp;</th>
                <th>&nbsp;</th>
            </tr>
            
            <c:forEach items="${products}" var="foobar">
                <tr>
                    <td><c:out value="${foobar.code}"/></td>
                    <td><c:out value="${foobar.description}"/></td>
                    <td><c:out value="${foobar.getPriceCurrencyFormat()}"/></td>
                    <td><a href="productManagement?action=updateProduct&amp;productCode=${foobar.code}">Edit</a></td>
                    <td><a href="productManagement?action=deleteProduct&amp;productCode=${foobar.code}">Delete</a></td>
                </tr>
            </c:forEach>
        </table>
        
        

        
        <form action="productManagement" method="get">
            <input type="hidden" name="action" value="addProduct">
            <p><input type="submit" value="Add Product"></p>
        </form>

        <p>
            <a href='login.jsp'>Back to login</a>
        </p>

    </body>
</html>