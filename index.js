require('./model/mongodb');
const productController = require('./controllers/productController');
const userController = require('./controllers/userController');
const categoryController = require('./controllers/categoryController');
const auth = require('./controllers/auth')
const authMiddleware = require('./middlewares/auth')
const config = require('config')
//Import the necessary packages
const express = require('express');

var app = express();
const bodyparser = require('body-parser');
 
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

 if(!config.get("jwtPrivateKey")){
    console.log('JWT PRIVATE KEY IS NOT DEFINED')
    process.exit(1)
} 
//Create a welcome message and direct them to the main page
app.get('/', (req, res) => {
    res.send('Welcome to our app');
});

//Set the Controller path which will be responding the user actions
app.use('/api/products', authMiddleware, productController);
app.use('/api/users',userController);
app.use('/api/category',categoryController);
app.use('/api/auth',auth)
//Establish the server connection
//PORT ENVIRONMENT VARIABLE
const port = 3400;
app.listen(port,()=>{
    console.log(`Server running on port...${port}`)
}) 