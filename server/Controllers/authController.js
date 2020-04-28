const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../.env" });
const { v4: uuidv4 } = require("uuid");

const User = require("../Models/User");
const InvalidToken = require("../Models/InvalidToken");
const Comment = require("../Models/Comment");

/**
 * Creates a new User model
 */
exports.signUp = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Else everything is OK
    const hashedPassword = await bcrypt.hash(password, 16);

    const newUser = new User({
      email: email,
      password: hashedPassword,
    });

    savedUser = await newUser.save();
    res.status(201).json({
      message: "Your account has been created",
      createdUser: savedUser,
      status: "success",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server-side error during account creation",
      error: err,
      status: "failure",
    });
  }
};

/**
 * Signs a token that is valid for one hour and returns it to the front-end. Also, stores user information in req.User
 */
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    foundUser = await User.findOne({ email });

    if (!foundUser)
      return res.status(400).json({
        message: "User does not exist in db",
        error: "No user",
        status: "failure",
      });

    const result = await bcrypt.compare(password, foundUser.password);

    // If wrong password
    if (result !== true) {
      return res.status(401).json({
        message: "Wrong password",
        error: "Unauthorized",
        status: "failure",
      });
    }

    // Else all OK, make token
    // Trace is a unique id used for blacklisting tokens on logout
    const trace = uuidv4();
    const created = Date.now();
    const userId = foundUser._id;
    let token = jwt.sign({ email, trace, created, userId }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.status(200).json({
      message: "Logged in successfully",
      token: token,
      status: "success",
      email: email
    });
  } catch (err) {
    return res.status(500).json({
      message: "There was an error logging you in",
      error: err,
      status: "failure",
    });
  }
};

/**
 * Logs the user out, blacklists current active token in case it didn't run out and destroys previously saved tokens
 * to prevent bloating the collection.
 */
exports.logout = async (req, res) => {
  let token = null;

  // Check if token is present
  if (req.get("authorization")) {
    token = req.get("authorization").split(" ")[1];
  } else {
    return res.status(400).json({
      message: "This account is not logged in",
      error: "No login",
      status: "failure",
    });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (!decoded)
    return res.status(400).json({
      message: "Error in token verification",
      error: "Token verification error",
      status: "failure",
    });

  const email = decoded.email;
  const trace = decoded.trace;
  const created = decoded.created;

  // Clear db from existing tokens associated with this email
  // Then push current in use token into blacklist

  InvalidToken.deleteMany({ email })
    .then((result) => {
      console.log(
        `InvalidToken collection cleared. Items that were deleted: ${result}`
      );

      const invalidToken = new InvalidToken({
        email,
        trace,
        created,
      });

      invalidToken.save();
      return res
        .status(200)
        .json({ message: "Logged you out successfully", status: "success" });
    })
    .catch((err) => {
      return res.status(400).json({
        message: "Error while invalidating the token, logout incomplete",
        error: err,
        status: "failure",
      });
    });
};

// Middleware
/**
 * Checks whether a user is logged in
 */
exports.isAuthenticated = async (req, res, next) => {
  let token = null;

  // Check if token is present
  if (req.get("authorization")) {
    token = req.get("authorization").split(" ")[1];
  } else {
    return res.status(401).json({
      message: "A token was not provided, you have to be logged in.",
      error: "Unauthorized",
      status: "failure",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const invalidToken = await InvalidToken.findOne({ trace: decoded.trace });

    // If the incoming token is blacklisted, don't authenticate
    if (invalidToken) {
      return res.status(400).json({
        message: "The provided token is invalid",
        error: "Blacklisted token",
        status: "failure",
      });
    }

    // Append logged in user info to the request object
    req.User = {
      email: decoded.email,
      trace: decoded.trace,
      created: decoded.created,
      id: decoded.userId
    };

    next();
    
  } catch (err) {
    return res.status(400).json({
      message: "There was an error verifying the token",
      error: err,
      status: "failure",
    });
  }
};

/**
 * @param Item represents a mongoose model name, can be re-used with different products.
 * @returns a function definition with (req, res, next) params to use as middleware.
 * 
 * This part is written with promises. Async functions return a promise instead of a function definition which express requires.
 */
exports.isOwner = (Item) => {
  let requestingUserId = null;
  let requestingUserObjectId = null;
  let creatorId = null;

  return function (req, res, next) {
    let itemId = null;

    if(Item === Comment) itemId = req.params.commentId;
    else itemId = req.params.itemId;

    User.findOne({ email: req.User.email })
      .select("_id")
      .then((foundUser) => {
        {
          requestingUserObjectId = foundUser;
          if (!requestingUserObjectId)
            return res.status(200).json({
              message: "Requesting user was not found",
              error: "No user",
              status: "success",
            });
          // Convert objectId to _id
          requestingUserId = requestingUserObjectId._id;
        }
      })
      .then(() => {
        // Extract id of user who created the resource
        Item.findById({ _id: itemId })
          .select("createdBy -_id")
          .then((item) => {
            objectId = item;
            creatorId = objectId.createdBy;
            // Obj can't be compared directly, stringified to compare contents
            if (requestingUserId.toString() !== creatorId.toString())
              return res.status(401).json({
                message: "Requesting user is not the creator of the resource",
                error: "Unauthorized",
                status: "failure",
              });

            next();
          });
      })
      .catch((err) => {
        console.log(err.message);
        return res.status(400).json({
          message: "Error fetching item or user Item from db",
          error: "resource fetch failed",
          status: "failure",
        });
      });
  };
};
