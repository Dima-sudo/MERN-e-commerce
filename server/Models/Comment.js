const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const commentSchema = new Schema({

    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    created: {
        type: Date,
        required: true,
        default: Date.now()
    },
    content: {
        type: String,
        required: true
    }

})


module.exports = mongoose.model('Comment', commentSchema);