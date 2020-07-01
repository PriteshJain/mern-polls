# mern-polls
### Prerequsite for the project
-  Nodejs with Npm installed.
   Can be found at https://nodejs.org/en/download/
- Visual studio code. with command line `code` enabled.
- Create Account with mongodb atlas and create a cluster
- Github account setup with ssh keys added in account.

**npm** is a node package manager for nodejs.
Allows you to download and install node libraries in project.


###  1. Create web.
    <!-- Make directory -->
    mkdir nodejs-polls

    <!-- change directory -->
    cd nodejs-polls

    npx create-react-app web


<!-- backend -->
    <!-- make project nodejs ready -->
    npm init -y
    
    <!-- install web server and ODM -->
    npm install -S express mongoose

    <!-- Open the project in Vs code IDE  -->
    code .



###  2. create file server.js with below code
        // server.js
        const express = require('express');
        const app = express();

        const PORT = process.env.PORT || 5000;

        // configure body parser for AJAX requests
        app.use(express.urlencoded({ extended: true }));
        app.use(express.json());

        // routes
        app.get('/', (req, res) => {
            res.send('Hello from Nodejs');
        });

        // Bootstrap server
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}.`);
        });
    ```

###  3. run the project
    npm start



