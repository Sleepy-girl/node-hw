const ContactDB = require("./contacts.model");
const catchAsync = require("../../utils/catchAsync");

const getContactsController = catchAsync(async (req, res, next) => {
  const { query } = req;
  const contacts = await ContactDB.getContacts(query);
  res.json(contacts);
});

const getContactByIdController = catchAsync(async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await ContactDB.getContactById(contactId);
  // console.log(contact);
  res.json(contact);
});

const createContactsController = catchAsync(async (req, res, next) => {
  const { body } = req;
  const newContact = await ContactDB.createContact(body);
  res.status(201).json(newContact);
});

const updateContactsController = catchAsync(async (req, res, next) => {
  const { id, ...data } = req.body;
  const updatedContact = await ContactDB.updateContact(id, data);
  res.json(updatedContact);
});

const deleteContactsController = catchAsync(async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await ContactDB.getContacts();
  await ContactDB.deleteContact(contactId);
  res.end();
});

module.exports = {
  getContactsController,
  getContactByIdController,
  createContactsController,
  updateContactsController,
  deleteContactsController,
};
