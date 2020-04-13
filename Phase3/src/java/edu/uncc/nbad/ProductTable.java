package edu.uncc.nbad;

import java.sql.*;
import java.util.*;


public class ProductTable {
    //decleration of the products List
    private static List<Product> products = null;
    //decleration of the database connection and User and Password    
    static String url = "jdbc:mysql://localhost:3306/shop";
    static String username = "user";
    static String password = "123";
    //decleration of the needed parameters within ProductTable.java
    static Connection connection = null;
    static PreparedStatement selectProduct = null;
    static ResultSet resultset = null;
    //Static initializer, it runs when the class is intialized (it is executed once)
    static {
        try {
            Class.forName("com.mysql.jdbc.Driver");
        }
        catch (ClassNotFoundException e) {
            System.out.println(e.getMessage());
            System.exit(1);
        }
    }
    //selectProducts method
    public static List<Product> selectProducts() throws SQLException {
        products = new ArrayList<Product>();
        try{                        
            //Debugging printing to the console
            System.out.println("ProductTable: Creating connection to database.");
            connection = DriverManager.getConnection(url,username,password);
            //Decleration of the Prepared SQL statement 
            String preparedSQL = "SELECT code,description,price FROM shop.products;";
            PreparedStatement statement = connection.prepareStatement(preparedSQL);
            //Puts the results of the query into the resultset
            resultset = statement.executeQuery();
            //Loops throught the resultset
                while(resultset.next()){
                    //Grabs the data from the resultset
                    String code = resultset.getString("code");
                    String description = resultset.getString("description");
                    double price = resultset.getDouble("price");
                    //Creation of new Product object
                    Product p = new Product(code,description,price);
                    //adds new prooduct object to the List
                    products.add(p);
                }
            } catch(SQLException e) {
                System.out.println(e);
            }
            //Returns the List object products
            connection.close();
            return products;
        }
    //selectProduct method
    public static Product selectProduct(String productCode) throws SQLException {
        //Call to selectProducts method
        products = selectProducts();
        //loops through the List
        for(Product p : products){
            //Checks products List for the requested prodcut code
            if (productCode != null && productCode.equalsIgnoreCase(p.getCode())){
                return p;
            }
        }
        return null;
    }
    //exists method
    public static boolean exists(String productCode) throws SQLException {
        //call to the selectProdcut method
	Product p = selectProduct(productCode);
        if (p != null) return true;
        else return false;
    }    
    //saveProducts method
    private static void saveProducts(List<Product> products) throws SQLException {
        try {
            System.out.println("ProductTable: Creating connection to database.");
            connection = DriverManager.getConnection(url,username,password);
        
            String preparedSQL = "UPDATE shop.products SET description = ?, price = ? WHERE code = ?";
            PreparedStatement statement = connection.prepareStatement(preparedSQL);
            
            for (Product p : products){
                statement.setString(1,p.getDescription());
                statement.setDouble(2,p.getPrice());
                statement.setString(3,p.getCode());
                statement.executeUpdate();
                } 
            } catch (SQLException e){
                System.out.println(e);
        }
    }
    //insertProduct method
    public static void insertProduct(Product product) throws SQLException {
        try {
            //Debugging code prints to console
            System.out.println("ProductTable: Creating connection to database.");
            connection = DriverManager.getConnection(url,username,password);
            //Decleration of the prepared SQL statement
            String preparedSQL = "INSERT INTO shop.products (code, description, price) VALUES (?,?,?)";
            PreparedStatement statement = connection.prepareStatement(preparedSQL);
            //sets the statement parameters to the passed product information
            statement.setString(1, product.getCode());
            statement.setString(2, product.getDescription());
            statement.setDouble(3, product.getPrice());
            System.out.println("ProductTable: Inserting" + product.getCode() + " " + product.getDescription() + " " + product.getPrice());
            statement.executeUpdate();
            connection.close();
            } catch (SQLException e){
                System.out.println(e);
        }
    }

    public static void updateProduct(Product product) throws SQLException {
	try {
            System.out.println("ProductTable: Creating connection to database.");
            connection = DriverManager.getConnection(url,username,password);
            String preparedSQL = "UPDATE shop.products SET description='" + product.getDescription() + "', price='" + product.getPrice() + "' WHERE code='" + product.getCode() + "'";
            PreparedStatement statement = connection.prepareStatement(preparedSQL);
            statement.execute(preparedSQL);
            statement.executeUpdate(preparedSQL);
            connection.close();
            } catch (SQLException e){
                System.out.println(e);
                System.exit(0);
            }
    }

    public static void deleteProduct(Product product) throws SQLException {
	System.out.println("ProductTable: Creating connection to database.");
            connection = DriverManager.getConnection(url,username,password);
            String preparedSQL = "DELETE FROM shop.products WHERE code=?";
            PreparedStatement statement = connection.prepareStatement(preparedSQL);
            statement.setString(1,product.getCode());
            System.out.println("Deleting Product: Code: " + product.getCode() + " Description: " + product.getDescription() + " Price: " + product.getPrice());
            statement.execute();
    }    
}

