package edu.uncc.nbad;

import java.io.*;
import java.sql.SQLException;
import java.util.*;
import javax.servlet.ServletException;
import javax.servlet.http.*;
import javax.servlet.annotation.WebServlet;


@WebServlet("/productManagement")
public class productManagementServlet extends HttpServlet {
    //decleration of the products ArrayList
    public static List<Product> products = null;

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
            out.println("<title>Servlet ProductManagementServlet</title>");
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet ProductManagementServlet at " + request.getContextPath() + "</h1>");
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
        //Get Session
        HttpSession session = request.getSession();
        //Get action and productCode parameter
        String action = request.getParameter("action");
        String idCode = request.getParameter("productCode");
        String url = "/index.jsp";
        //Debugging print out of requested parameters
        System.out.println(" Product management Get");
        System.out.println("Action " + action + " idCode " + idCode);
        
        try{
            //Checks the action to check the doGet
        if (action != null) {
            if (action.equals("displayProducts")) {
                //Calls the ProductTable method selectProducts to populate the products ArrayList.
                products = ProductTable.selectProducts();
                //Sets the session attribute of the products Arraylist.
                session.setAttribute("products", products);
                url = "/products.jsp";
                getServletContext().getRequestDispatcher(url).forward(request, response);
            } else if (action.equals("addProduct")) {
                //Removal of the session attribute of product to make sure new form is empty.
                session.removeAttribute("product");
                url = "/product.jsp";
            } else if (action.equals("updateProduct")) {
                //Sests the session attribute of the requested product to be updated.
                Product product = ProductTable.selectProduct(idCode);
                session.setAttribute("product", product);
                url = "/product.jsp";
                //Redirects to the requested product to be updated page.
                getServletContext().getRequestDispatcher(url).forward(request, response);
            } else if (action.equals("deleteProduct")) {
                //Sests the session attribute of the requested product to be deleted
                Product product = ProductTable.selectProduct(idCode);
                session.setAttribute("product", product);
                url = "/confirmDelete.jsp";
            } else { url = "/index.jsp"; }
                //Redirects to the requested url.
                getServletContext().getRequestDispatcher(url).forward(request, response);
            }   
        } catch(SQLException e) {
                System.out.println(e); 
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
        //Get the session
        HttpSession session = request.getSession();
        System.out.println("Product Management Post");
        //Get action parameter
        String action = request.getParameter("action");
        System.out.println("Action Post: " + action);
        //If user is not logged in, forward to the login page
        if (action.equals("login")) {
            User user = (User)session.getAttribute("user");
            if (user.getPassword()==null)
                getServletContext().getRequestDispatcher("/login.jsp").forward(request, response);
            else{
                getServletContext().getRequestDispatcher("/products.jsp").forward(request, response);
            }
        }
        //User is logged in, proceed to updateProduct if appropriate action parameter
        switch (action) { 
            case "addProduct":
                //Get the the values to put into the new product
                String code = request.getParameter("code");
                String desc = request.getParameter("desc");
                String price = request.getParameter("price");
                System.out.println("Code: " + code + " Description: " + desc + " Price: " + price);
                double numPrice = 0;
                
                //Data validation
                if(code.isEmpty() || desc.isEmpty() || price.isEmpty() || desc.trim().isEmpty()) {
                    response.setContentType("text/html;charset=UTF-8");
                try (PrintWriter out = response.getWriter()) {
                    //Creation of the Error html Page.
                    response.setContentType("text/html");
                    out.println("<!DOCTYPE html>");
                    out.println("<html>");
                    out.println("<head>");
                    out.println("<title>Servlet MembershipServlet</title>");            
                    out.println("</head>");
                    out.println("<h1>ERROR! Make sure all fields are filled out!</h1>");
                    out.println("<h2>The following entries are invalid: </h2>");
                    out.println("<body>");
                    if(code.isEmpty()) {
                        out.println("<p>Code</p>");
                    }
                    if(desc.isEmpty() || desc.trim().isEmpty()) {
                        out.println("<p>Description</p>");
                    }
                    if(price.isEmpty()) {
                        out.println("<p>Price</p>");
                    }
                    out.println("</body>");
                    out.println("</html>");
                 }
            } else if (!price.isEmpty()) {
                numPrice = Double.parseDouble(price);
                    if(numPrice<0) {
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
                            out.println("<p>Price must be greater than 0</p>");
                            out.println("</body>");
                            out.println("</html>");
                        }
                    }
                    else{
                        try{
                    //Create new product object and put in the values
                        Product newProduct = new Product();
                        newProduct.setCode(code);
                        newProduct.setDescription(desc);
                        newProduct.setPrice(numPrice);

                        //get the product list from the session, if any 
                        session = request.getSession();

                        ArrayList<Product> products = (ArrayList<Product>) session.getAttribute("products");

                        if(products==null){
                            products =  new ArrayList<>();
                        }
                        
                        if(((Product) session.getAttribute("product"))!=null) {
                            products.remove(((Product) session.getAttribute("product")));
                            session.removeAttribute("product");
                        }
                        //Call to ProductTable to execute SQL Query
                        ProductTable.insertProduct(newProduct);
                        //add product to the list
                        products.add(newProduct);
                        // replacing the old list in the session by a the new list (that contains the new product we just added)
                        session.removeAttribute("products");
                        session.setAttribute("products", products);
                        }   catch (SQLException e){
                            System.out.println(e.getMessage());
                        }
                    }
                    
                }
                    //Redirect back to products page
                    getServletContext().getRequestDispatcher("/products.jsp").forward(request, response);
                break;
                
            case "updateProduct":
                try{
                    //Call to the ProductTable to set the products Arraylist.
                    products = ProductTable.selectProducts();
                    //Request of the session
                    session = request.getSession();
                    Product product = (Product) session.getAttribute("product");
                    //Requesting the updated parameters 
                    desc = request.getParameter("desc");
                    price = request.getParameter("price");
                    //Debugging to print to the console 
                    System.out.println("UpdateCode: " + product.getCode() + " Description " + desc + " Price " + price);
                    //Setting the new requested price and setting it to a double to be stored
                    double num = Double.parseDouble(price);
                    //Setting the description of the old product
                    product.setDescription(desc);
                    //Setting the price of the old product
                    product.setPrice(num);
                    //Setting the seesion attribute of the newly updated product
                    session.setAttribute("product", product);
                    //Call to the ProductTable to update the product in the Database
                    ProductTable.updateProduct(product);
                    //Call to the ProductTable to set the products Arraylist.
                    products = ProductTable.selectProducts();
                    //Set the sessio Attribute of the products Arraylist.
                    session.setAttribute("products", products);
                    getServletContext().getRequestDispatcher("/products.jsp").forward(request, response);
                    
                } catch (SQLException e){
                        System.out.println(e.getMessage());
                    }
                    //Redirect back to products page
                        getServletContext().getRequestDispatcher("/product.jsp").forward(request, response);
                
                break;
                
                case "actuallyDelete":
                    //Request of the Session
                    session = request.getSession();
                    //Request of the product to be deleted
                    Product product = (Product) session.getAttribute("product");
                    //Debuggin code print to the console
                    System.out.println("Code: " + product.getCode() + " Description " + product.getDescription() + " Price " + product.getPrice());
                    try{
                        //Call to the ProductTable to delete the requested product
                        ProductTable.deleteProduct(product);
                        request.removeAttribute("product");
                        //Call to the ProductTable to set the products Arraylist.
                        products = ProductTable.selectProducts();
                        //Set the sessio Attribute of the products Arraylist.
                        session.setAttribute("products", products);
                        getServletContext().getRequestDispatcher("/products.jsp").forward(request, response);
                        
                    } catch (SQLException e){
                        System.out.println(e.getMessage());
                    }
                    break;
           

            default:
                System.err.println("He's dead, Jim!");
                break;
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
    }
   
}
