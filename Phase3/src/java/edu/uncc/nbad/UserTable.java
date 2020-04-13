package edu.uncc.nbad;

import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;

public class UserTable {
    //decleration of the database connection and User and Password
    static String url = "jdbc:mysql://localhost:3306/shop";
    static String username = "user";
    static String password = "123";
    //decleration of the needed parameters within UserTable.java
    static Connection connection = null;
    static PreparedStatement selectProduct = null;
    static ResultSet resultset = null;
    private static ArrayList<User> users = null;

    //Static initializer, it runs when the class is intialized (it is executed once)
    static {
        try {
            Class.forName("com.mysql.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            System.out.println(e.getMessage());
            System.exit(1);
        }
    }
    //addRecord method
    public static void addRecord(User user) throws SQLException {
        try{
            //Debugging printing to the console
            System.out.println("UserTable: Creating connection to database.");
            connection = DriverManager.getConnection(url,username,password);
            //The preparedSQL statement
            String preparedSQL = "INSERT INTO shop.users (firstName, lastName, email, password) VALUES (?,?,?,?);";
            PreparedStatement statement = connection.prepareStatement(preparedSQL);
            //setting of the needed attributes for the SQL querry
            statement.setString(1, user.getFirstName());
            statement.setString(2, user.getLastName());
            statement.setString(3, user.getEmail());
            statement.setString(4, user.getPassword());
            //Execution of the SQL querry
            statement.executeUpdate();
        }
        catch(SQLException e){
            System.out.println(e.getMessage());
        }
    }
    //getUser method
    public static User getUser(String emailAddress) throws SQLException {
        User user = null;
        try{
            //Debugging code to print to the console
            System.out.println("UserTable: Creating connection to database.");
            connection = DriverManager.getConnection(url,username,password);
            //Decleration of the prepared SQL statement
            String preparedSQL = "SELECT firstName, lastName, email, password FROM shop.users WHERE email=?;";
            PreparedStatement statement = connection.prepareStatement(preparedSQL);
            //Setting the passed parameter to get the User from the Database
            statement.setString(1, emailAddress);
            //puts the results of the Query to be created into a user object
            resultset = statement.executeQuery();
            //loops through the resultset
            while (resultset.next()){        
                //Acquisition of the data from the database
                String fName = resultset.getString("firstName");
                String lName = resultset.getString("lastName");
                String email = resultset.getString("email");
                String rpass = resultset.getString("password");
                //Creation of a new user object
                user = new User(fName, lName, email, rpass);
                }
            } catch(SQLException e){
                System.out.println(e.getMessage());
            }
        //Returns the new user object
        return user;
    }

    public static ArrayList<User> getUsers() throws SQLException {
        users = new ArrayList<User>();
        try{
            //Debugging code prints to console
            System.out.println("ProductTable: Creating connection to database.");
            connection = DriverManager.getConnection(url,username,password);
            //decleration of the prepared SQL statement
            String preparedSQL = "SELECT firstName, lastName, email, password FROM shop.users;";
            PreparedStatement statement = connection.prepareStatement(preparedSQL);
            //resultset of the SQL query
            resultset = statement.executeQuery();
                //loops through the resultset
                while (resultset.next()){        
                    //Acquisition of the data from the database
                    String fName = resultset.getString("firstName");
                    String lName = resultset.getString("lastName");
                    String email = resultset.getString("email");
                    String password = resultset.getString("password");
                    //Creation of a new user object
                    User u = new User(fName, lName, email, password);
                    //Add the new user object to the ArrayList
                    users.add(u);
                }
            } catch(SQLException e) {
                System.out.println(e);
            }
            connection.close();
            //Returns the users ArrayList
            return users;
    }

    public static HashMap<String, User> getUsersMap() throws SQLException {
        HashMap<String, User> users = new HashMap<String, User>();
        try{
            //Debugging code prints to console
            System.out.println("ProductTable: Creating connection to database.");
            connection = DriverManager.getConnection(url,username,password);
            //Decleration of prepared SQL statemennt
            String preparedSQL = "SELECT firstName, lastName, email, password FROM shop.users;";
            PreparedStatement statement = connection.prepareStatement(preparedSQL);
            //Resultset holding the requested query
            resultset = statement.executeQuery();
               //loops through the resultset
                while (resultset.next()){        
                    //Acquisition of the data from the database
                    String fName = resultset.getString("firstName");
                    String lName = resultset.getString("lastName");
                    String email = resultset.getString("email");
                    String password = resultset.getString("password");
                    //Creation of a new user object
                    User u = new User(fName, lName, email, password);
                    //Add the new user object to the Hashmap
                    users.put(email,u);
                }
            } catch(SQLException e) {
                System.out.println(e);
            }
            connection.close();
            //Prints the Hashmap to the Console with the memory locations of the user objects
            System.out.println("users entries : " + users);
        //Returns the users HashMap
        return users;
    }
}
