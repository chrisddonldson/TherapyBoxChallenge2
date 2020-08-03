const mongoose = require('mongoose');
const bcrypt = require("bcrypt")

// Schema
const Schema = mongoose.Schema;
const UserSchema = new Schema({
   username:{
       type: String,
        default:""
   },
    email:{
       type:String,
         default:""
    },
    password:{
       type:String,
         default:""
    },
});

UserSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}
UserSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password)
}

// Model
module.exports = mongoose.model('User', UserSchema);

