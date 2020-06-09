const express = require("express");
const router = express.Router();

const productController = require("../Controllers/productController");
const authController = require("../Controllers/authController");

// Middleware
const isLoggedIn = authController.isAuthenticated;


// Administrative info actions on products as a whole (Buy, history etc.)
router.get("/search/:query", productController.query);
router.post("/:itemId/checkout", isLoggedIn, productController.checkout);
router.get("/getpurchases", isLoggedIn, productController.getPurchases);
router.get("/getlistings", isLoggedIn, productController.getListings);
router.get("/", productController.getProducts);

module.exports = router;
