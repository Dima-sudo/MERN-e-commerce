const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const baseOptions = {
  discriminatorKey: "itemtype", // Discriminator key, could be anything
  collection: "items" // Collection name
};

// Abstract only schema
const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    created: {
        type: Date,
        required: true,
        default: Date.now()
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    // For filtering on the clientside
    tags: {
        type: [String],
        required: false
    }
  },

  baseOptions
);

module.exports = mongoose.model("AbstractProduct", productSchema);
