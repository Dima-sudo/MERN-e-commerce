const AbstractProduct = require('./AbstractProduct');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Television = AbstractProduct.discriminator('Television', new Schema({
    size:{
        type: String,
        required: true
    },
    screen:{
        type: String,
        required: true
    },
    audio:{
        type: String,
        required: true
    }
}));

module.exports = mongoose.model('Television');