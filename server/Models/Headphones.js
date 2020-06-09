const AbstractProduct = require('./AbstractProduct');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Headphones = AbstractProduct.discriminator('Headphones', new Schema({
    drivers:{
        type: String,
        required: true
    },
    frequency:{
        type: String,
        required: true
    },
    sensitivity:{
        type: String,
        required: true
    },
    color:{
        type: String,
        required: true
    },
}));

module.exports = mongoose.model('Headphones');