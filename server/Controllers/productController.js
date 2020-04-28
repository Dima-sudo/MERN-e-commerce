const AbstractProduct = require('../Models/AbstractProduct');

const fs = require('fs');

require('dotenv').config({ path: `${__dirname}/.env` })

const cloudinary = require('cloudinary');



cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
  
});

/**
 * Gets products for all categories, no filters.
 */
exports.getProducts = async (req, res) => {
  try {
    // Additional populate for nested models
    const productList = await AbstractProduct.find().populate('createdBy comments').populate({
      path: 'comments',
      populate: {
        path: 'createdBy',
        model: 'User'
      }
    });
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

/**
 * This applies to all functions below:
 * @param Product accepts a non abstract child Product model (i.e TV/Laptop)
 * @returns a function definition that can be used in any product category for easily reusable controllers.
 * 
 * 
 * Controllers are generic by design. Validation is done in Validators.js middleware.
 */

exports.create = (Product) => {

  return function(req, res){
  
    const images = [];
    const filePathList = [];
    // Temp file names
    const filesToDelete = [];

    // If there are files attached, upload
    if(req.files){
      for(let key in req.files){
        filePathList.push(req.files[key].tempFilePath)
      }

      // Upload images
      filePathList.forEach((file, i) => {
        cloudinary.uploader.upload(file).then(response => {
          console.log(response);

          // Create image ref object that will be saved as product property in db
          const image = {public_id: response.public_id, url: response.url}
          images.push(image);

          // Push tmp file name to be deleted (Auto created during upload)
          filesToDelete.push(response.original_filename);

          // Once all uploads done
          if(images.length === filePathList.length){ // Checks if the image that finished uploading is the last one

            const product = new Product({
              ...req.body, createdBy: req.User.id, images
          });

          // Async delete temp files
          filesToDelete.forEach(fileName => {
            fs.unlink(`${__dirname}/../tmp/${fileName}`, (err) => {
              if(err){
                console.log(err.message);
              }
              else console.log(`Temp file: ${fileName} was removed.`);
            });
          });
            
           
          product.save().then(savedProduct => {
            return res.status(201).json({message: "Your product was created", product: savedProduct, status: "success"});
          }).catch(err => {
            return res.status(500).json({message: "Error saving the product", error: err, status: "failure"});
          });

          }
        }).catch(err => {
          return res.status(500).json({message: `Error uploading image number ${i}`, error: err, status: "failure"})
        });
      });

    }

     // If no images are provided
    if(!req.files){
          const product = new Product({
            ...req.body, createdBy: req.User.id
          });

          product.save().then(savedProduct => {
          return res.status(201).json({message: `Your product was created`, product: savedProduct, status: "success"});
          }).catch(err => {
          return res.status(500).json({message: "Error saving the product", error: err, status: "failure"});
          });
    }

  }

}

exports.delete = (Product) => {

  return function(req, res){
    const {itemId} = req.params;

    Product.findByIdAndDelete({_id: itemId}).then(deletedProduct => {
      if (!deletedProduct) return res.status(200).json({message: "No product was found", error: "No product", status: "failure"});
      return res.status(200).json({message: "Product deleted", product: deletedProduct, status: "success"});
    }).catch(err => {
      return res.status(500).json({message: "Error deleting the product", error: err, status: "failure"});
    })
  }

}

exports.update = (Product) => {
  
  return function(req, res){
    const {itemId} = req.params;

    const updatedProduct = {...req.body}

    Product.findByIdAndUpdate({_id: itemId}, updatedProduct, {useFindAndModify: false}).then(product => {
  
      if(!product) return res.status(200).json({message: "No product was found", error: "No product", status: "failure"});
      return res.status(201).json({message: "The product was updated", product: updatedProduct, status: "success"});
    }).catch(err => {
      return res.status(500).json({message: "Error updating the product", error: err, status: "failure"});
    })

  }
}

exports.findById = (Product) => {

  return function(req, res){
    const {itemId} = req.params;

    Product.findById({_id: itemId}).populate('comments').then(foundProduct => {
      if (!foundProduct) return res.status(200).json({message: "No product was found", error: "No product", status: "failure"});
      return res.status(200).json({message: "Product found", product: foundProduct, status: "success"});
    }).catch(err => {
      return res.status(500).json({message: "Error fetching product from DB", error: err, status: "failure"});
    })
  }

}

exports.getCategory = (Product) => {
  
  return function(req, res){
    Product.find().then(productList => {
      if(!productList || productList.length == 0) return res.status(200).json({message: "No products were found", status: "success"});
      return res.status(200).json({message: "Products found", products: productList, status: "success"});
    }).catch(err => {
      return res.status(400).json({message: "Error fetching products from DB", error: err, status: "failure"});
    })
  }

}