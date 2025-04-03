const asyncHandler = require("express-async-handler")
const Contact = require("../models/contactModel")

//@desc Get all contacts
//@route GET /api/contacts
//@access private

const getContacts = asyncHandler(async(req, res) => {
    const contacts = await Contact.find({user_id: req.user.id});
    res.status(200).json(contacts);
});

//@desc Post contacts
//@route POST /api/contacts
//@access private
const createContact = asyncHandler(async(req, res) => {
    console.log(req.body);
    const {name, email, phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("all fields are manadatory")
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    });
    res.status(201).json(contact);
});

//@desc put contacts
//@route PUT /api/contacts
//@access private
const updateContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact with this id does not exist")
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("You are not authorized to update another user's contact.")
    }
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id,
        req.body,
        {new:true}
    );

    res.status(200).json(updatedContact);
});

//@desc Delete contacts
//@route DELETE /api/contacts
//@access private
const deleteContact = asyncHandler(async(req, res) => {
    const deletedContact = await Contact.findById(req.params.id);
    if(!deletedContact){
        res.status(404);
        throw new Error("CONTACT NOT FOUND");
    }
    if(deletedContact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("You are not authorized to delete another user's contact.")
    }
    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedContact);
});

//@desc Get a particular contact
//@route GET /api/contacts
//@access private
const getContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found.")
    }
    res.status(200).json(contact);
});

module.exports = {getContacts,
    createContact,
    updateContact,
    deleteContact,
    getContact
}