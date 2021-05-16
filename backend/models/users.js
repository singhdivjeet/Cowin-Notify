const mongoose = require("mongoose");


const userSchema = new mongoose.Schema(
{   

    email: {
        type: String,
        required: true,
      },

    emailtoken: {
        type: String,
    },

    isVerified: {
        type: Boolean,
        default: false
    },

    state: {
        type: String
    },
    district: {
        type: Number
    },   

    pin: {
        type: Number
    },
    vaccine: {
        type: Number
    },

    isfree: {
        type: Boolean,
        default: false,
    }
});

const User = mongoose.model("users",userSchema);

module.exports = User;