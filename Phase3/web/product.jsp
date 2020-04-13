<%-- 
    Document   : product
    Created on : Sep 23, 2019, 8:35:05 PM
    Author     : Robert Beckham
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="stylesheet" href="style.css"/>
        <title>Product Management</title>
        <%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
    </head>
    
    <body>
        <c:if test="${user.firstName != null}">
            <p>You are currently logged in as: <c:out value="${user.email}"/></p>
            <a href="membership?action=logout">User Logout</a>
        </c:if>

        <h2>Product</h2>
        
        <form action="productManagement" method="post">
            <p>    
                <label class="leftHeading">Code:</label>
                <input type="text" name="code" value="<c:out value="${product.code}"/>">
            </p>

            <p>
                <label class="leftHeading">Description:</label>
                <textarea rows="4" cols="25" name="desc"> <c:out value="${product.description}"/>
                </textarea>
            </p>

            <p>
                <label class="leftHeading">Price:</label>
                <input type="text" name="price" value="<c:out value="${product.price}"/>">
            </p>

            <div class="rightButton">
                <input type="submit" value="Update Product" onclick="form.action='productManagement?action=updateProduct';">
            </div>
            <div class="rightButton">
                <input type="submit" value="Add Product" onclick="form.action='productManagement?action=addProduct';">
            </div>
        </form>
            <form action="productManagement" method="get">
                <input type="hidden" name="action" value="displayProducts">
                <input type="submit" value ="View Products">
            </form>
        
    </body>
</html>


        
        
    