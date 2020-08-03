const mongoose = require('mongoose');


// Schema
const Schema = mongoose.Schema;
const ImagePostSchema = new Schema({

    userId: {
        type: String,
        required: true
    },
    image: {
        type: File,
        required: true
    },
});


// Model
module.exports = mongoose.model('ImagePost', ImagePostSchema);

