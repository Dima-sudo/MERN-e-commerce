const Television = require("../Models/Television");
const Laptop = require("../Models/Laptop");
const User = require("../Models/User");

exports.validate_Account_Creation_Form = async (req, res, next) => {
  const { email, password, confirmPassword } = req.body;

  if (!email || !password || !confirmPassword)
    return res
      .status(200)
      .json({
        message: "Your form has missing information",
        error: "Missing information",
        status: "failure",
      });

  // Trim whitespace
  email.trim();
  password.trim();
  confirmPassword.trim();

  if (email.length < 4)
    return res
      .status(200)
      .json({
        message: "Email has to be atleast 5 characters long",
        error: "Email too short",
        status: "failure",
      });
  if (!email.includes("@") || !email.includes(".") || email.includes(" "))
    return res
      .status(400)
      .json({
        message: "The email or format entered is invalid",
        error: "Invalid email",
        status: "failure",
      });
  if (password.length < 5)
    return res
      .status(200)
      .json({
        message: "Password has to be atleast 6 characters long",
        error: "Password too short",
        status: "failure",
      });

  // Check for duplicates in db
  const foundUser = await User.findOne({ email });
  if (foundUser)
    return res.status(200).json({
      message: `A user with the email ${email} already exists`,
      error: "Email taken",
      status: "failure",
    });

  // Check if password and confirmPassword match
  if (password !== confirmPassword)
    return res.status(200).json({
      message: "Provided passwords do not match",
      error: "Wrong password confirmation",
      status: "failure",
    });

  next();
};

exports.validate_Laptop_Creation_Form = async (req, res, next) => {
  const form = req.body;

  // Validation
  if (
    !form.title ||
    !form.description ||
    !form.price ||
    !form.cpu ||
    !form.graphics ||
    !form.screen
  ) {
    return res.status(400).json({
      message: "One of the required fields was not provided",
      error: "Missing form information",
      status: "failure",
    });
  }
  if (form.price <= 0) {
    return res.status(400).json({
      message: "Price must be a positive integer",
      error: "Invalid form input",
      status: "failure",
    });
  }
  if (form.title.length < 6 || !form.title.includes(" "))
    return res.status(400).json({
      message: "Incomplete title. Enter brand name and model",
      error: "Invalid title",
      status: "failure",
    });
  if (form.description.length < 10 || !form.title.includes(" "))
    return res.status(400).json({
      message: "Description cannot be shorter than 10 characters",
      error: "Invalid description",
      status: "failure",
    });
  if (form.cpu.length < 6 || !form.title.includes(" "))
    return res.status(400).json({
      message: "Incorrect or incomplete CPU field. Enter brand name and model",
      error: "Invalid CPU",
      status: "failure",
    });
  if (form.graphics.length < 6)
    return res.status(400).json({
      message:
        "Incorrect or incomplete graphics field. Enter brand name and model",
      error: "Invalid graphics",
      status: "failure",
    });
  if (!form.screen.includes(":"))
    return res.status(400).json({
      message:
        "Screen field must include resolution in Width:Height format, i.e 1920:1080.",
      error: "Invalid screen",
      status: "failure",
    });
  if (form.screen.length < 6)
    return res.status(400).json({
      message: "Screen cannot be shorter than 6 characters",
      error: "Invalid screen",
      status: "failure",
    });

  next();
  //
};

exports.validate_Television_Creation_Form = async (req, res, next) => {
  const form = req.body;

  // Validation
  if (
    !form.title ||
    !form.description ||
    !form.price ||
    !form.size ||
    !form.screen ||
    !form.audio
  ) {
    return res.status(400).json({
      message: "One of the required fields was not provided",
      error: "Missing form information",
      status: "failure",
    });
  }
  if (form.price <= 0) {
    return res.status(400).json({
      message: "Price must be a positive integer",
      error: "Invalid form input",
      status: "failure",
    });
  }
  if (form.title.length < 6 || !form.title.includes(" "))
    return res.status(400).json({
      message: "Incomplete title. Enter brand name and model",
      error: "Invalid title",
      status: "failure",
    });
  if (form.description.length < 10 || !form.title.includes(" "))
    return res.status(400).json({
      message: "Description cannot be shorter than 10 characters",
      error: "Invalid description",
      status: "failure",
    });
  if (form.size.length < 2 || !form.title.includes(" "))
    return res.status(400).json({
      message:
        "Incorrect or incomplete size field. Enter the size of the screen.",
      error: "Invalid size",
      status: "failure",
    });
  if (form.audio.length < 6)
    return res.status(400).json({
      message:
        "Incorrect or incomplete audio field. Enter brand name and model",
      error: "Invalid audio",
      status: "failure",
    });
  if (!form.screen.includes(":"))
    return res.status(400).json({
      message:
        "Screen field must include resolution in Width:Height format, i.e 1920:1080.",
      error: "Invalid screen",
      status: "failure",
    });
  if (form.screen.length < 6)
    return res.status(400).json({
      message: "Screen cannot be shorter than 6 characters",
      error: "Invalid screen",
      status: "failure",
    });
  
  // #TODO redo this section because of change in how tags are constructed
  // Check that if tags are passed, are in proper format
  if (form.tags) {
    if (!Array.isArray(form.tags)) {
      return res
        .status(400)
        .json({
          message: "Tags are not passed in proper format",
          error: "Not a String array",
          status: "failure",
        });
    }
  }

  next();
  //
};

exports.validate_Files = async (req, res, next) => {
  if (req.files) {
    // .length can't be used on Objects so fileList's length is checked after the first validation for the number of files passed
    const fileList = [];

    for (let key in req.files) {
      // Check if file size exceeds limit of 6MB(in bytes)
      if (req.files[key].size > 6291456) {
        return res
          .status(400)
          .json({
            message:
              "The file provided is larger than 6 MB, product creation failed",
            error: "File size exceeds limit",
            status: "failure",
          });
      }
      //
      fileList.push(req.files[key]);
    }

    // Check that there's no more than 3 files
    if (fileList.length > 3) {
      return res
        .status(500)
        .json({
          message: "More than 3 files provided, product creation failed",
          error: "Too many files",
          status: "failure",
        });
    }
    //

    next();
  } else if (!req.files) {
    next();
  }
};
