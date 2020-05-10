const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false,
    required: true
  },
  // Stores the customer.id identifier from stripe payments. This field serves as a link between the account as it's
  // saved in the database and the one associated that's saved on the stripe servers
  identifier:{
    type: String,
    default: null,
    required: false
  },
  
  purchases: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'AbstractProduct',
      required: false,
    }],
    default: []
  }
});

module.exports = mongoose.model("User", userSchema);
