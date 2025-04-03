const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
    user_id:{//this is for the user creating the contact
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"},
    name: {
        type: String,
        required: [true, "Please add the contact name."],
        },
    email: {
        type: String,
        required: [true, "Please add the email id."],
    },
    phone: {
        type: String,
        required: [true, "Please add the phone number."]
    }

},
{timestamps: true}
);

module.exports = mongoose.model("Contact", contactSchema);