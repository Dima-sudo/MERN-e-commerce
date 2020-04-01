const Laptop = require('../Models/Laptop');


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
        status: "failure"
      });
    }
    if (form.price <= 0) {
      return res.status(400).json({
        message: "Price must be a positive integer",
        error: "Invalid form input",
        status: "failure"
      });
    }
    if (form.title.length < 6 || !form.title.includes(' '))
      return res
        .status(400)
        .json({
          message: "Incomplete title. Enter brand name and model",
          error: "Invalid title",
          status: "failure"
        });
    if (form.description.length < 10 || !form.title.includes(' '))
      return res
        .status(400)
        .json({
          message: "Description cannot be shorter than 10 characters",
          error: "Invalid description",
          status: "failure"
        });
    if (form.cpu.length < 6 || !form.title.includes(' '))
      return res
        .status(400)
        .json({
          message:
            "Incorrect or incomplete CPU field. Enter brand name and model",
          error: "Invalid CPU",
          status: "failure"
        });
    if (form.graphics.length < 6)
      return res
        .status(400)
        .json({
          message:
            "Incorrect or incomplete graphics field. Enter brand name and model",
          error: "Invalid graphics",
          status: "failure"
        });
    if (!form.screen.includes("x"))
      return res
        .status(400)
        .json({
          message:
            "Screen field must include resolution in WidthxHeight format, i.e 1920x1080.",
          error: "Invalid screen",
          status: "failure"
        });
    if (form.screen.length < 6)
      return res
        .status(400)
        .json({
          message: "Screen cannot be shorter than 6 characters",
          error: "Invalid screen",
          status: "failure"
        });
  
    // Check that if tags are passed, are in proper format
    if(form.tags){
      if(!Array.isArray(form.tags)){
        return res.status(400).json({message: "Tags are not passed in proper format", error: "Not a String array", status: "failure"});
      }
    }

    // Check for potential duplicates
    try {
      const alreadyExists = await Laptop.findOne({ title: req.body.title });
      if (alreadyExists)
        return res.status(400).json({
          message: "This laptop already exists",
          error: "Duplicate",
          status: "failure"
        });
    } catch (err) {
        console.log(err.message);
      return res.status(500).json({
        message: "Error during duplicate check",
        error: err,
        status: "failure"
      });
    }
  

    next();
    //
  };
  