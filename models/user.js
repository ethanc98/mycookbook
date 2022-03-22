const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: 'Invalid email.'
        }
    },
    recipes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Recipe'
        }
    ],
    resetPasswordToken: String,
    resetPasswordExpires: Date
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);