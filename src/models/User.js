const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, minlength: 6 },
    isVerified: { type: Boolean, default: true },
    verificationToken: String,
    resetToken: {
        token: String,
        expires: Date
    }
}, {
        timestamps: true
    }
);

userSchema.methods.toJSON = function () {
    var user = this.toObject();
    delete user.password;
    return user;
}

module.exports = model('User', userSchema);