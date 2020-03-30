const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });
const mongoose = require("mongoose");

exports.connect = () => {
  mongoose
    .connect(process.env.DB_HOST, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log(`Connection to DB Successful.`);
    })
    .catch(err => {
      console.log("Error connecting to DB.");
      console.log(err);
    });
};
