const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please add a name"],
    },
    email: {
        type: String,
        required: [true, "Please add an email"],
        unique: [true, "Email address already exists"],
    },
    password: {
        type: String,
        required: [true, "Please add a password"],

    },
},{
    timestamps: true,
});

module.exports = mongoose.model("User", userSchema);