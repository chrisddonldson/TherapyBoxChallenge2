const mongoose = require('mongoose');


// Schema
const Schema = mongoose.Schema;
const UserSessionSchema = new Schema({
    userId: {
        type: String,
        default: "",
    },
    timestamps: {
        type: Date,
        default: Date.now()
    },
    isDeleted: {
        type: Boolean,
        default: false
    }

});


// Model
module.exports = mongoose.model('UserSession', UserSessionSchema);

