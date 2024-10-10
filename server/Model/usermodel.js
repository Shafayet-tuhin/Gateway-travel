const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const userSchema = new Schema({
     username: {
         type: String,
         required: true,
         trim : true,
         minlength: 3,
         maxlength: 20,
     },
     email : {
            type: String,
            required: true,
            unique: true,
     },
     password : {
         type: String,
         minlength: 6,
         required: true ,
     },
     profilePicture:{
            type: String,
            default: "https://i.ibb.co.com/nzbdkCB/profile.png"
     },
     role: {
        type: String,
        enum: ["SUPER_ADMIN", "ADMIN", "GUEST"],
        default: "GUEST",
    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
 