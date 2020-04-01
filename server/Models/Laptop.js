const AbstractProduct = require('./AbstractProduct');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Laptop = AbstractProduct.discriminator('Laptop', new Schema({
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
    }
}));

module.exports = mongoose.model('Laptop');