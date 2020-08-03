const mongoose = require('mongoose');
const bcrypt = require("bcrypt")

// Schema
const Schema = mongoose.Schema;
const TodoSchema = new Schema({
    title: {
        type: String,
        default: "",
        required: true
    },
    notes: {
        type: String,
        default: "",
        required: false
    },
    completed: {
        type: Boolean,
        default: false,
        required: false
    },
    userId: {
        type: String,
        required: true
    },
});


// Model
module.exports = mongoose.model('Todo', TodoSchema);

