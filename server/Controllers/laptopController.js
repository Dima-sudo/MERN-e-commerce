const AbstractProduct = require("../Models/AbstractProduct");
const Laptop = require("../Models/Laptop");
const User = require('../Models/User');

exports.getLaptops = async (req, res, next) => {
  try {
    const laptopList = await Laptop.find();
    if (!laptopList)
      return res
        .status(400)
        .json({ message: "Error fetching the laptop list", status: "failure" });
    if (laptopList.length == 0)
      return res
        .status(200)
        .json({ message: "No laptops were found", status: "success" });
    // Else return results
    return res.status(200).json({
      message: "Laptops were found",
      Laptops: laptopList,
      status: "success"
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error fetching the laptop list",
      error: err,
      status: "failure"
    });
  }
};

exports.createLaptop = async (req, res) => {

  let currentUser = null;
  let currentUserId = null;

  try{
    currentUser = await User.findOne({email: req.User.email}).select('_id');
    if(!currentUser) return res.status(200).json({message: "No user was found", error: "No user", status: "success"})

    // Extract from ObjectId
    currentUserId = currentUser._id;
  }
  catch(err){
    console.log(err.message);
    return res.status(500).json({message: "Error finding active user", error: err, status: "failure"});
  }

  const laptop = new Laptop({
    ...req.body, createdBy: currentUserId
  });

  try {
    const savedLaptop = await laptop.save();
    return res.status(201).json({
      message: "Laptop was successfully saved",
      laptop: savedLaptop,
      status: "success"
    });
  } catch (err) {
    return res.status(500).json({
      message: "There was an error during product creation",
      error: err,
      status: "failure"
    });
  }
};

exports.deleteLaptop = async (req, res) => {
  const { laptopId } = req.params;

  try {
    deletedLaptop = await Laptop.findByIdAndDelete({ _id: laptopId });
    if (!deletedLaptop) {
      return res.status(204).json({
        message: "Could not find the laptop",
        error: "No laptop found",
        status: "failure"
      });
    }
    return res.status(200).json({
      message: "Laptop deleted",
      laptop: deletedLaptop,
      status: "success"
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error in deleting your laptop",
      error: err,
      status: "failure"
    });
  }
};

exports.updateLaptop = async (req, res) => {
  const { laptopId } = req.params;

  let currentUser = null;
  let currentUserId = null;

  try{
    currentUser = await User.findOne({email: req.User.email}).select('_id');
    if(!currentUser) return res.status(200).json({message: "No user was found", error: "No user", status: "success"})

    // Extract from ObjectId
    currentUserId = currentUser._id;
  }
  catch(err){
    console.log(err.message);
    return res.status(500).json({message: "Error finding active user", error: err, status: "failure"});
  }


  const laptop = new Laptop({
    ...req.body, createdBy: currentUserId
  });

  try {
    const updatedLaptop = await Laptop.findByIdAndUpdate(
      { _id: laptopId },
      { laptop }
    );
    if (!updatedLaptop)
      return res
        .status(400)
        .json({
          message: "Laptop was not updated",
          error: "No laptop found",
          status: "failure"
        });
    return res
      .status(200)
      .json({
        message: "Laptop was updated",
        laptop: laptop,
        status: "success"
      });
  } catch (err) {
    return res
      .status(500)
      .json({
        message: "Laptop was not updated due to a server-side error",
        error: err,
        status: "failure"
      });
  }
};

exports.findById = async (req, res) => {
  const {laptopId} = req.params;
  
  try{
    const foundLaptop = await Laptop.findById({_id: laptopId});
    if(!foundLaptop) return res.status(200).json({message: "No laptop was found", error: "No matching results", status: "success"});
    return res.status(200).json({message: "Laptop found", laptop: foundLaptop, status: "success"});
  }
  catch(err){
    return res.status(400).json({message: "There was an error finding the laptop", error: "Laptop fetch error", status: "failure"});
  }
};


// Middleware

// Checks whether the requesting user created the laptop item
exports.check_Laptop_Ownership = async (req, res, next) => {
  const {laptopId} = req.params;
  
  const requestingUserId = req.User._id;
  const objectId = await Laptop.findById({_id: laptopId}).select('createdBy');
  const creatorId = objectId._id;
   
  if(requestingUserId !== creatorId) return res.status(401).json({message: "Requesting user is not the creator of the resource", error: "Unauthorized", status: "failure"});

  next();

}