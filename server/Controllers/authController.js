const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../.env' });
const { v4: uuidv4 } = require('uuid');


const User = require('../Models/User');
const InvalidToken = require('../Models/InvalidToken');

exports.signUp = async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  if(!email || !password || !confirmPassword) res.status(406).json({message: "Your form has missing information", error: "Missing information", status: "failure"})

  // Get rid of potential whitespaces
  email.trim();
  password.trim();
  confirmPassword.trim();

  // Check if email already exists
  try {
    const foundUser = await User.findOne({ email });
    if (foundUser)
      return res.status(400).json({
        message: `A user with the email ${email} already exists`,
        error: "Email taken",
        status: "failure"
      });

    // Check if password and confirmPassword match
    if (password !== confirmPassword)
      return res.status(400).json({
        message: "Provided passwords do not match",
        error: "Wrong password confirmation",
        status: "failure"
      });

    // Else everything is OK
    const hashedPassword = await bcrypt.hash(password, 16);

    const newUser = new User({
      email: email,
      password: hashedPassword
    });

    savedUser = await newUser.save();
    res.status(201).json({
      message: "Your account has been created",
      createdUser: savedUser,
      status: "success"
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server-side error during account creation",
      error: err,
      status: "failure"
    });
  }
};

exports.login = async (req, res) => {

    const {email, password} = req.body;

    try{
    foundUser = await User.findOne({email});

    if(!foundUser) return res.status(400).json({message: "User does not exist in db", error: "No user", status: "failure"});
    
    const result = await bcrypt.compare(password, foundUser.password);

    // If wrong password
    if(result !== true ){
       return res.status(401).json({message: "Wrong password", error: "Unauthorized", status: "failure"});
    }

    // Else all OK, make token
    // Trace is a unique id used for blacklisting tokens on logout
    const trace = uuidv4();
    const created = Date.now();
    let token = jwt.sign({email, trace, created}, process.env.JWT_SECRET, {expiresIn: '1h'});
    return res.status(200).json({message: "Logged in successfully", token: token, status: "success"});

    }
    catch(err){
        return res.status(500).json({message: "There was an error logging you in", error: err, status: "failure"});
    }
}

exports.logout = async (req, res) => {
    let token = null;

    // Check if token is present
    if(req.get('authorization')){
        token = req.get('authorization').split(' ')[1];
    }
    else{
        return res.status(400).json({message: "This account is not logged in", error: "No login", status: "failure"});
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded) return res.status(400).json({message: "Error in token verification", error: "Token verification error", status: "failure"});

        const email = decoded.email;
        const trace = decoded.trace;
        const created = decoded.created;
        

    // Clear db from existing tokens associated with this email
    // Then push current in use token into blacklist

    InvalidToken.deleteMany({email}).then(result => {
        console.log(`InvalidToken collection cleared. Items that were deleted: ${result}`);

        const invalidToken = new InvalidToken({
            email, trace, created
        });

        invalidToken.save();
        return res.status(400).json({message: "Logged you out successfully", status: "success"});
    }).catch(err => {
        return res.status(400).json({message: "Error while invalidating the token, logout incomplete", error: err, status: "failure"});
    })
}

// Middleware
// isLoggedIn
exports.isAuthenticated = async (req, res, next) => {

    let token = null;

    // Check if token is present
    if(req.get('authorization')){
        token = req.get('authorization').split(' ')[1];
    }
    else{
        return res.status(400).json({message: "A token was not provided, you have to be logged in.", error: "Unauthorized", status: "failure"});
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const invalidToken = await InvalidToken.findOne({trace: decoded.trace});

        // If the incoming token is blacklisted, don't authenticate
        if(invalidToken){
           return res.status(400).json({message: "The provided token is invalid", error: "Blacklisted token", status: "failure"});
        }

        // Append logged in user info to the request object
        req.User = {
          email: decoded.email,
          trace: decoded.trace,
          created: decoded.created
        }

        next();
    }
    catch(err){
        return res.status(400).json({message: "There was an error verifying the token", error: err, status: "failure"});
    }
}


