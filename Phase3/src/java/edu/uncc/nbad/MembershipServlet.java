package edu.uncc.nbad;

import java.util.*;
import java.io.*;
import java.sql.*;
import javax.servlet.ServletException;
import javax.servlet.http.*;
import javax.servlet.annotation.WebServlet;


@WebServlet("/membership")
public class MembershipServlet extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    
    
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Servlet MembershipServlet</title>");            
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet MembershipServlet at " + request.getContextPath() + "</h1>");
            out.println("</body>");
            out.println("</html>");
        }
    }
    
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        //processRequest(request, response);
        
          String action = request.getParameter("action");
          String url = "/signup.jsp";
          
        if(action.equals("login")) {
            url = "/login.jsp";
            request.getServletContext().getRequestDispatcher("/login.jsp").forward(request,response);
            doPost(request,response);
        }
        else if(action.equals("signup")) {
            url = "/signup.jsp";
            request.getServletContext().getRequestDispatcher("/signup.jsp").forward(request,response);
            doPost(request,response);
        }
        else if(action.equals("logout")) {
                 HttpSession session = request.getSession();
                 session.invalidate();
                request.getServletContext().getRequestDispatcher("/index.jsp").forward(request,response);
    }
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try{
            
        HttpSession session = request.getSession();

        String action = request.getParameter("action");
        
        if(action.equals("signup")) {
        User user = new User();
                
        String firstName = request.getParameter("first");
        String lastName = request.getParameter("last");
        String email = request.getParameter("email");
        String password = request.getParameter("password");
        
        // exist/email validation checks
        if(firstName.isEmpty() || lastName.isEmpty() || password.isEmpty() || email.isEmpty() || password.length()<8 || !(email.contains("@"))) {
            response.setContentType("text/html;charset=UTF-8");
             try (PrintWriter out = response.getWriter()) {
                response.setContentType("text/html");
                out.println("<!DOCTYPE html>");
                out.println("<html>");
                out.println("<head>");
                out.println("<title>Servlet MembershipServlet</title>");            
                out.println("</head>");
                out.println("<h1>ERROR! Make sure all fields are filled out!</h1>");
                out.println("<h2>The following entries are invalid: </h2>");
                out.println("<body>");
                // indicate which field is empty and addresses validation issue
                if(firstName.isEmpty()) {
                    out.println("<p>First Name</p>");
                }
                if(lastName.isEmpty()) {
                    out.println("<p>Last Name</p>");
                }
                if(password.isEmpty()) {
                    out.println("<p>Password</p>");
                }
                if(!password.isEmpty() && password.length() < 7) {
                    out.println("<p>Password must be longer than 8 characters</p>");
                }
                if(email.isEmpty()) {
                    out.println("<p>Email</p>");
                }
                if(!email.isEmpty() && !email.contains("@")) {
                    out.println("<p>Email must be valid</p>");
                }
                out.println("</body>");
                out.println("</html>");
             }    
        }
            //set/save attributes to a new user
            user.setFirstName(firstName);
            user.setLastName(lastName);
            user.setEmail(email);
            user.setPassword(password);
            
            //add save record of user that signed up to database
            UserTable.addRecord(user);
        
            session.setAttribute("user", user);
            request.getServletContext().getRequestDispatcher("/login.jsp").forward(request,response);
                    
        }
        else if(action.equals("login")) {
            String email = request.getParameter("email");
            String password = request.getParameter("password");
            User user = UserTable.getUser(email);
            
            if(user != null){
                if(user.getPassword().equals(password)) {
                    List<Product> products = null;
                    products = ProductTable.selectProducts();
                    session.setAttribute("products", products);
                    session.setAttribute("user",user);
                    request.getServletContext().getRequestDispatcher("/login.jsp").forward(request,response);
//                    request.getServletContext().getRequestDispatcher("/products.jsp").forward(request,response);
            } else {
                    response.setContentType("text/html;charset=UTF-8");
                    try (PrintWriter out = response.getWriter()) {
                        response.setContentType("text/html");
                        out.println("<!DOCTYPE html>");
                        out.println("<html>");
                        out.println("<head>");
                        out.println("<title>Servlet MembershipServlet</title>");            
                        out.println("</head>");
                        out.println("<h1>ERROR! Make sure all fields are filled out!</h1>");
                        out.println("<h2>The following entries are invalid: </h2>");
                        out.println("<body>");
                        if(email.isEmpty()) {
                            out.println("<p>Email</p>");
                        }
                        if(password.isEmpty()) {
                            out.println("<p>Password</p>");
                        }
                        if(!(user.getPassword()).equals(password)){
                             out.println("<p>Password Incorrect</p>");
                        }
                        out.println("</body>");
                        out.println("</html>");
                        
                        //hash map results of valid sers printed to console
                        UserTable.getUsersMap();
                                                   
                            
                    } catch (SQLException e){
                        System.out.println(e.getMessage());
                    }
                }
                
            }
            
        }
        else if(action.equals("logout")) {
            request.getServletContext().getRequestDispatcher("/index.jsp").forward(request,response);
            session.invalidate();
            }
        }catch (SQLException e){
            System.out.println(e.getMessage());
        }
    }
    
    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
