# How to Launch instructions (For the TAs and Profesor, from slides)
### Checkout Groupmeet on Heroku by following the URL below:
URL: https://groupmeet-capstone.herokuapp.com/


### Running Groupmeet on a local machine
1. Download the project in a zip folder on our git page using the URL: (https://github.com/mmccoy23/groupmeet.git)
OR
Clone the project from the git page by using the following command
“git clone https://github.com/mmccoy23/groupmeet.git”
2. Install Node.js and npm(https://www.npmjs.com/get-npm). 
3. Navigate to the groupmeet folder and open it in your terminal of choice and run "npm install".
4. After installation is complete run "npm start" or alternatively run "node app.js".

### Getting MongoDB installed and working
(Not required unless you want to run a local mongo collection)
0. Installing MongoDB is not necessary for application use as the database is being hosted by Mongo Atlas, this is just for access to the db in the command terminal on your machine.
1. Make sure you have https://www.mongodb.com/download-center/community?jmp=docs installed on your machine. 
2. In your Local Disk (C:) drive make a folder called "data" and within that folder another named "db".
3. Navigate to where you installed MongoDB and run the application "mongod", FOLLOWED by "mongo".
4. In the "mongo.js" file located in the public/routes/ folder there are 2 connection options that can be commented out or in to select which database to use [Connection 1: for Mongo Atlas & heroku, Connection 2: for local & heroku]








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
