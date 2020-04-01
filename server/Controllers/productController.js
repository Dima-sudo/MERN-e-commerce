const AbstractProduct = require("../Models/AbstractProduct");
const Laptop = require("../Models/Laptop");

// Get all products with no filters, All categories.
exports.getProducts = async (req, res) => {
  try {
    const productList = await AbstractProduct.find();
    if (!productList)
      return res
        .status(200)
        .json({ message: "No products were found", status: "success" });
    return res
      .status(200)
      .json({
        message: "Products were found",
        products: productList,
        status: "success"
      });
  } catch (err) {
    return res
      .status(500)
      .json({
        message: "There was an error fetching the products",
        error: err,
        status: "failure"
      });
  }
};

