const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const invalidTokenSchema = new Schema({
  email: {
    type: String,
    required: true
  },

  // Random id that is appended to every token on creation to refrain from saving the original token to db
  trace: {
    type: String,
    required: true
  },
  // In milliseconds
  created: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("InvalidToken", invalidTokenSchema);
