<%-- 
    Document   : confirmDelete
    Created on : Sep 23, 2019, 8:35:34 PM
    Author     : Robert Beckham
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="stylesheet" href="style.css">
        <%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
        <title>Product Management</title>
    </head>
    <body>
        <c:if test="${user.firstName != null}">
            <p>You are currently logged in as: <c:out value="${user.firstName} ${user.lastName}"/></p>
            <a href="membership?action=logout">User Logout</a>
        </c:if>
            <c:choose>
            <c:when test="${user.firstName != null}">
<!--                <p>You are currently logged in as: <c:out value="${user.lastName}"/></p>-->
            </c:when>
                <c:otherwise>
                    <c:redirect url="/login.jsp"/>
                </c:otherwise>
        </c:choose>

        <h2>Are you sure you want to delete this product?</h2>

        <section>
            <span class="leftHeading" >Code:</span>        <c:out value="${product.code}"/> <br>
            <span class="leftHeading" >Description:</span>     <c:out value="${product.description}"/> <br>
            <span class="leftHeading" >Price:</span>       <c:out value="${product.price}"/> <br>

            <%-- Form to Delete the product --%>
            <form action="productManagement" method="post"> 
                <input type="hidden" name="action" value="actuallyDelete">
                <input type="hidden" name="productCode" value="<c:out value="${product.code}"/>">
                <input type="submit" value="Yes" id="button1">
            </form>

            <%-- Form to go back to product display the product --%>
            <form action="productManagement" method="get"">       
                <input type="hidden" name="action" value="displayProducts">
                <input type="submit" value = "No" id="button1">
            </form>


        </section>    
    </body>
</html>