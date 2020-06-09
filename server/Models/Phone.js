const AbstractProduct = require('./AbstractProduct');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Phone = AbstractProduct.discriminator('Phone', new Schema({
    cpu:{
        type: String,
        required: true
    },
    graphics:{
        type: String,
        required: true
    },
    screen:{
        type: String,
        required: true
    },
    OS: {
        type: String,
        required: true
    }
}));

module.exports = mongoose.model('Phone');