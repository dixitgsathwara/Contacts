const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModels");
const getAllContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  if (!contacts) {
    res.status(404);
    throw new error("Contacts not available pls create...!");
  } else {
    res.status(200).json(contacts);
  }
});
const getSpeContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new error("Contact is not available pls create...!");
  } else {
    res.status(200).json(contact);
  }
});
const addContact = asyncHandler(async (req, res) => {
  const { name, phone } = req.body;
  if (!name || !phone) {
    res.status(403);
    throw new Error("All field is mendatory");
  } else {
    const contact = await Contact.create({
      name,
      phone,
      user_id: req.user.id,
    });
    console.log(req.body);
    res.status(200).json(contact);
  }
});
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new error("Contact is not available pls create...!");
  } else {
    if (contact.user_id.toString() !== req.user.id) {
      res.status(403);
      throw new Error(
        "user don't have permition to update other user contacct"
      );
    }
    const updateContact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updateContact);
  }
});
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new error("Contact is not available pls create...!");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("user don't have permition to delete other user contacct");
  }
  await Contact.findByIdAndDelete(req.params.id);
  res.status(200).json(contact);
});
module.exports = {
  getAllContacts,
  getSpeContact,
  addContact,
  updateContact,
  deleteContact,
};
