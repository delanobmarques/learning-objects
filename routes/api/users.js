let express = require('express');
let router = express.Router();
const bcrypt = require('bcrypt');
let UserModel = require('../../models/user_model'); //linking to Users Model 
let LoginModel = require('../../models/login_model');//linking to Login Model
const jwt = require('jsonwebtoken'); //mporting jwt to create the token
const dotenv = require('dotenv'); //using the dotenv package to set environment variables
const verifyToken = require('../../middleware/verifyToken');

//initialize dotenv
dotenv.config();

/* GET users listing. NOT NEEDED in Assignment Just for testing*/
router.get('/',  function(req, res, next) {
  UserModel.find({}, (err, users) => {
      if(err) return res.status(400).send('Error')
      
      res.send(users);
  });
});

//create new user endpoint 
router.post('/register', (req, res) => { //router.post('/', validateToken, (req, res) => { //not invoking the function - telling the pipeline additional middlware functions to get throught
    //create a new object based on the req.body
    let newUser = new UserModel(req.body);

      bcrypt.genSalt(10,(err, salt) => {//generating Salt to hash password
        bcrypt.hash(newUser.password, salt, (error, hash) => { //hashing password       
          
          newUser.password = hash; //changing sent password for the hashed one

          newUser.save ((err, newUser) => {//saving new user with hashed password 
            if(err) {
                return res.status(400).send(err);
            }
            //storing in output variable the new generated user ID and email to return  
            let output = (`Resource created successfully\nUser ID: ${newUser._id} - User Email: ${newUser.email}`);

            jwt.sign({user: newUser.email}, process.env.JWT_SECRET_KEY,{expiresIn:'1h'}, (err, token) => {        
              res.header('Access-Control-Expose-Headers', 'x-auth-token')
              res.header('x-auth-token', token);//creating custom response header with created token
              res.status(201).send({serverMessage: output});
            });            
          })          
        })
      });//10 is the default has processing   
})


//user login endpoint
router.post('/login', (req, res) => { 

  let newLogin = new LoginModel(req.body);

  let validationError = newLogin.validateSync();//validation (Mongoose Model)
  let errorOutput = ""; //variable to hold errors message

  if(validationError){//check if there is a validation error
    errorOutput = 'Validation Error:\n';
    if(validationError.errors['email']){errorOutput+= validationError.errors['email'].message+"\n"}
    if(validationError.errors['password']){errorOutput+= validationError.errors['password'].message}
    return res.status(404).send(errorOutput); //sending message if validation error found 
  }
  
  //check if email exists in the database
  UserModel.findOne({email:newLogin.email}, (err, user) => {
    if(err) return res.status(404).send('error');
    if(!user) return res.status(404).send({ serverMessage: 'User not found' });
    
    //if email exists check if password match with hashed password stored in db       
    bcrypt.compare(newLogin.password, user.password, (err, isMatch) => {
      if(!isMatch)return res.status(401).send({ serverMessage: 'wrong password' });

      //if passord match create a new token
      jwt.sign({user: user.email}, process.env.JWT_SECRET_KEY,{expiresIn:'1h'}, (err, token) => {        
        res.header('Access-Control-Expose-Headers', 'x-auth-token')
        res.header('x-auth-token', token);//creating custom response header with created token
        res.status(200).send({ serverMessage:'User logged in successfully' });
      });      
    })
 });
})

module.exports = router;
