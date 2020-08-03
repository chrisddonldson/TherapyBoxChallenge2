const mongoose = require('mongoose');


// Schema
const Schema = mongoose.Schema;
const ImagePostSchema = new Schema({

    userId: {
        type: String,
        required: true
    },
    image_loc: {
        type: String,
        required: true
    },
    image_sm_loc: {
        type: String,
        required: true
    },
    deleted: {
        type: Boolean,
        default: false
    },
});


// Model
module.exports = mongoose.model('ImagePost', ImagePostSchema);

