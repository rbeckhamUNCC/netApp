# Groupmeet Instructions
## Heroku link:
https://groupmeet-capstone.herokuapp.com/

## Installation and Running Locally:

### Running Groupmeet
1. Install [Node.js and npm](https://www.npmjs.com/get-npm). 
2. Navigate to the groupmeet folder and open it in your terminal of choice and run "npm install".
3. After installation is complete run "npm start" or alternatively run "node app.js".

### Getting MongoDB installed and working
0. Installing MongoDB is not neccessary for application use as the database is being hosted by Mongo Atlas, this is just for access to the db in the command terminal on your machine.
1. Make sure you have [MongoDB](https://www.mongodb.com/download-center/community?jmp=docs) installed on your machine. 
2. In your Local Disk (C:) drive make a folder called "data" and within that folder another named "db".
3. Navigate to where you installed MongoDB and run the application "mongod", **FOLLOWED** by "mongo".
4. In the "mongo.js" file located in the public/routes/ folder there are 2 connection options that can be commented out or in to select which database to use [Connection 1: for Mongo Atlas & heroku, Connection 2: for local & heroku]
