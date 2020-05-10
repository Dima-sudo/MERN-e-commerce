const AbstractProduct = require("../Models/AbstractProduct");
const User = require("../Models/User");

const fs = require("fs");

require("dotenv").config({ path: `${__dirname}/.env` });

const cloudinary = require("cloudinary");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { v4: uuid } = require("uuid");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * @returns a list of products that match the value queried by the user
 */
exports.query = async (req, res) => {

  // Unformatted
  const inputArray = req.body.query.split(' ');
  // Formatted data with every element in lowercase since the search is case-sensitive
  let queryData = []

  inputArray.forEach(tag => {
    lowercaseTag = tag.toLowerCase();
    queryData = [...queryData, lowercaseTag];
  });

  try{
    // Splits the user input into an array and looks for matching tags 
    const products = await AbstractProduct.find({tags: {"$in": queryData }});

    if(!products || products.length === 0) return res.status(200).json({message: "No products were found", status: "success"});
  
    return res.status(200).json({message: "Products found", products: products, status: "success"});
  }
  catch(err){
    return res.status(500).json({message: "Error searching for the requested query", error: err.message, status: "failure"});
  }
}

/**
 * @param token A purchase token should be passed as the req.body object from the client. Makes a payment via Stripe servers
 * and handles the customer data flow between the db and the Stripe servers
 */
exports.checkout = async (req, res) => {
  let customer = null;

  try {
    const user = await User.findById({ _id: req.User.id });

    if (!user)
      return res
        .status(200)
        .json({ message: "No user found", status: "failure" });

    // If the user exists on stripe servers, retrieve
    if (user.identifier) {
      customer = await stripe.customers.retrieve(user.identifier);
    }
    // Else create a new user
    else {
      customer = await stripe.customers.create({
        email: user.email,
        source: req.body.id,
      });

      // Set identifier on User instance in db
      await User.findByIdAndUpdate(
        { _id: user._id },
        { identifier: customer.id },
        { useFindAndModify: false }
      );
    }

    const idempotencyKey = uuid();

    const product = await AbstractProduct.findById({ _id: req.params.itemId });

    const charge = await stripe.charges.create(
      {
        amount: product.price,
        currency: "ils",
        description: product.description,
        receipt_email: user.email,
        customer: customer.id,
      },
      { idempotencyKey }
    );

    console.log("Charge created: ");
    console.log(charge);

    if (charge.status === "succeeded") {
      return res
        .status(200)
        .json({
          message: "Payment process complete",
          charge: charge,
          status: "success",
        });
    } else {
      return res
        .status(200)
        .json({
          message: "Payment process failed",
          charge: charge,
          status: "failure",
        });
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //                                                                                                          //
    // NOTE:                                                                                                    //
    // Here will normally be code that searches for the bought product and removes it from db, associated files //
    // and additional general cleanup. Since this is not a production app and any transaction goes through,     //
    // this was not implemented.                                                                                //
    //                                                                                                          //
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  } catch (err) {
    return res
      .status(500)
      .json({
        message: "Error during checkout",
        error: err.message,
        status: "failure",
      });
  }
};

/**
 * @param req.User.id should be used by logged in users only for an id to search by
 * @returns a list of products created by a specific user
 */
exports.getListings = async (req, res) => {
  try {
    const productList = await AbstractProduct.find({ createdBy: req.User.id });

    if (!productList || productList.length === 0) {
      return res
        .status(200)
        .json({ message: "No products found", status: "success" });
    }
    return res
      .status(200)
      .json({
        message: "Products found",
        products: productList,
        status: "success",
      });
  } catch (err) {
    return res
      .status(500)
      .json({
        message: "Error fetching listings",
        error: err.message,
        status: "failure",
      });
  }
};

/**
 * Gets everything. All products for all categories, no filters.
 */
exports.getProducts = async (req, res) => {
  try {
    // Additional populate for nested models
    const productList = await AbstractProduct.find()
      .populate("createdBy comments")
      .populate({
        path: "comments",
        populate: {
          path: "createdBy",
          model: "User",
        },
      });
    if (!productList)
      return res
        .status(200)
        .json({ message: "No products were found", status: "success" });
    return res.status(200).json({
      message: "Products were found",
      products: productList,
      status: "success",
    });
  } catch (err) {
    return res.status(500).json({
      message: "There was an error fetching the products",
      error: err,
      status: "failure",
    });
  }
};

/**
 * This applies to all functions below:
 * @param Product accepts a non abstract child Product model (i.e TV/Laptop)
 * @returns a function definition that can be used in any product category for easily reusable controllers.
 *
 *
 * Controllers are generic by design for re-use and scalability. Validation is done in Validators.js middleware.
 */

exports.create = (Product) => {
  return function (req, res) {
    const images = [];
    const filePathList = [];
    // Temp file names
    const filesToDelete = [];
    // Tags are coming in from the formData as a string in the format of x,y,z so need to format before saving
    const unformattedTags = req.body.tags.split(',');
    let tags = [];

    // Tags might be in mixed-case so converting everything to lower case before saving to db
    unformattedTags.forEach(tag => {
      const lowercaseTag = tag.toLowerCase();
      tags = [...tags, lowercaseTag];
    });

    // If there are files attached, upload
    if (req.files) {
      for (let key in req.files) {
        filePathList.push(req.files[key].tempFilePath);
      }

      // Upload images
      filePathList.forEach((file, i) => {
        cloudinary.uploader
          .upload(file)
          .then((response) => {
            console.log(response);

            // Create image ref object that will be saved as product property in db
            const image = { public_id: response.public_id, url: response.url };
            images.push(image);

            // Push tmp file name to be deleted (Auto created during upload)
            filesToDelete.push(response.original_filename);

            // Once all uploads done
            if (images.length === filePathList.length) {
              // Checks if the image that finished uploading is the last one

              const product = new Product({
                ...req.body,
                createdBy: req.User.id,
                images,
                tags
              });

              // Async delete temp files
              filesToDelete.forEach((fileName) => {
                fs.unlink(`${__dirname}/../tmp/${fileName}`, (err) => {
                  if (err) {
                    console.log(err.message);
                  } else console.log(`Temp file: ${fileName} was removed.`);
                });
              });

              product
                .save()
                .then((savedProduct) => {
                  return res
                    .status(201)
                    .json({
                      message: "Your product was created",
                      product: savedProduct,
                      status: "success",
                    });
                })
                .catch((err) => {
                  return res
                    .status(500)
                    .json({
                      message: "Error saving the product",
                      error: err,
                      status: "failure",
                    });
                });
            }
          })
          .catch((err) => {
            return res
              .status(500)
              .json({
                message: `Error uploading image number ${i}`,
                error: err,
                status: "failure",
              });
          });
      });
    }

    // If no images are provided
    if (!req.files) {
  
      const product = new Product({
        ...req.body,
        createdBy: req.User.id,
        tags
      });

      product
        .save()
        .then((savedProduct) => {
          return res
            .status(201)
            .json({
              message: `Your product was created`,
              product: savedProduct,
              status: "success",
            });
        })
        .catch((err) => {
          return res
            .status(500)
            .json({
              message: "Error saving the product",
              error: err,
              status: "failure",
            });
        });
    }
  };
};

exports.delete = (Product) => {
  return function (req, res) {
    const { itemId } = req.params;

    Product.findByIdAndDelete({ _id: itemId })
      .then((deletedProduct) => {
        if (!deletedProduct)
          return res
            .status(200)
            .json({
              message: "No product was found",
              error: "No product",
              status: "failure",
            });

        // Delete files from cloud storage if they exist
        if (deletedProduct.images) {
          const images = deletedProduct.images;
          images.forEach((image) => {
            cloudinary.uploader
              .destroy(image.public_id)
              .then((res) => {
                console.log(
                  `Image with the public_id of  ${image.public_id} was deleted`
                );
              })
              .catch((err) => {
                console.log("Error deleting the image");
                console.log(err.message);
              });
          });
        }
        //

        return res
          .status(200)
          .json({
            message: "Product deleted",
            product: deletedProduct,
            status: "success",
          });
      })
      .catch((err) => {
        return res
          .status(500)
          .json({
            message: "Error deleting the product",
            error: err,
            status: "failure",
          });
      });
  };
};

exports.update = (Product) => {
  return function (req, res) {
    console.log("req.body is: ");
    console.log(req.body);
    console.log("req.files is: ");
    console.log(req.files);

    const images = [];
    const filePathList = [];
    // Temp file names
    const filesToDelete = [];
    // Tags are coming in from the form data as a string in the format of x,y,z so need to format before saving
    const unformattedTags = req.body.tags.split(',');
    let tags = [];


    // Tags might be in mixed-case so converting everything to lower case before saving to db
    unformattedTags.forEach(tag => {
      const lowercaseTag = tag.toLowerCase();
      tags = [...tags, lowercaseTag];
    });

    if (req.files) {
      const { itemId } = req.params;

      Product.findById({ _id: itemId })
        .then((product) => {
          if (!product)
            return res
              .status(200)
              .json({ message: "No product found", status: "failure" });

          console.log("Found product is: ");
          console.log(product);

          // Delete original files from cloud storage if they exist
          if (product.images) {
            const images = product.images;
            images.forEach((image) => {
              cloudinary.uploader
                .destroy(image.public_id)
                .then((res) => {
                  console.log(
                    `Image with the public_id of  ${image.public_id} was deleted`
                  );
                })
                .catch((err) => {
                  console.log("Error deleting the image");
                  console.log(err.message);
                });
            });
          }
        })
        .catch((err) => {
          console.log("Error fetching the product");
          console.log(err.message);
        });
      //

      // Prepare paths array for upload
      for (let key in req.files) {
        filePathList.push(req.files[key].tempFilePath);
      }

      // Upload images
      filePathList.forEach((file, i) => {
        cloudinary.uploader.upload(file).then((response) => {
          console.log(response);

          // Create image ref object that will be saved as product property in db
          const image = { public_id: response.public_id, url: response.url };
          images.push(image);

          // Push tmp file name to be deleted (Auto created during upload)
          filesToDelete.push(response.original_filename);

          // Once all uploads done
          if (images.length === filePathList.length) {
            // Checks if the image that finished uploading is the last one

            // Async delete temp files
            filesToDelete.forEach((fileName) => {
              fs.unlink(`${__dirname}/../tmp/${fileName}`, (err) => {
                if (err) {
                  console.log(err.message);
                } else console.log(`Temp file: ${fileName} was removed.`);
              });
            });
            //

            // Update product
            const updatedProduct = { ...req.body, images, tags };

            Product.findByIdAndUpdate({ _id: itemId }, updatedProduct, {
              useFindAndModify: false,
            })
              .then((product) => {
                if (!product)
                  return res
                    .status(200)
                    .json({
                      message: "No product was found",
                      error: "No product",
                      status: "failure",
                    });
                return res
                  .status(201)
                  .json({
                    message: "The product was updated",
                    product: updatedProduct,
                    status: "success",
                  });
              })
              .catch((err) => {
                return res
                  .status(500)
                  .json({
                    message: "Error updating the product",
                    error: err,
                    status: "failure",
                  });
              });
            //
          }
          // End of last file promise
        });
      });
    }
    // End of file case
    else if (!req.files) {
      const { itemId } = req.params;

      const updatedProduct = { ...req.body, tags };

      Product.findByIdAndUpdate({ _id: itemId }, updatedProduct, {
        useFindAndModify: false,
      })
        .then((product) => {
          if (!product)
            return res
              .status(200)
              .json({
                message: "No product was found",
                error: "No product",
                status: "failure",
              });
          return res
            .status(201)
            .json({
              message: "The product was updated",
              product: updatedProduct,
              status: "success",
            });
        })
        .catch((err) => {
          return res
            .status(500)
            .json({
              message: "Error updating the product",
              error: err,
              status: "failure",
            });
        });
    }
  };
};

exports.findById = (Product) => {
  return function (req, res) {
    const { itemId } = req.params;

    Product.findById({ _id: itemId })
      .populate("comments")
      .then((foundProduct) => {
        if (!foundProduct)
          return res
            .status(200)
            .json({
              message: "No product was found",
              error: "No product",
              status: "failure",
            });
        return res
          .status(200)
          .json({
            message: "Product found",
            product: foundProduct,
            status: "success",
          });
      })
      .catch((err) => {
        return res
          .status(500)
          .json({
            message: "Error fetching product from DB",
            error: err,
            status: "failure",
          });
      });
  };
};

exports.getCategory = (Product) => {
  return function (req, res) {
    Product.find()
      .populate("createdBy comments")
      .populate({
        path: "comments",
        populate: {
          path: "createdBy",
          model: "User",
        },
      })
      .then((productList) => {
        if (!productList || productList.length == 0)
          return res
            .status(200)
            .json({ message: "No products were found", status: "success" });
        return res
          .status(200)
          .json({
            message: "Products found",
            products: productList,
            status: "success",
          });
      })
      .catch((err) => {
        return res
          .status(400)
          .json({
            message: "Error fetching products from DB",
            error: err,
            status: "failure",
          });
      });
  };
};
