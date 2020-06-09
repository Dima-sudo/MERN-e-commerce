const AbstractProduct = require('./AbstractProduct');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


/**
 * For any item that doesn't fall into existing categories
 */
const Other = AbstractProduct.discriminator('Other', new Schema({
    condition:{
        type: String,
        required: true
    },
    additionalInfo:{
        type: String,
        required: true
    }
}));

module.exports = mongoose.model('Other');