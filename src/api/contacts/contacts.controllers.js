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
  if (contact) {
    return res.json(contact);
  }
  res.status(404).json({ message: "Not found" });
});

const createContactsController = catchAsync(async (req, res, next) => {
  const { body } = req;
  const newContact = await ContactDB.createContact(body);
  res.status(201).json(newContact);
});

const updateContactsController = catchAsync(async (req, res, next) => {
  const { id, ...data } = req.body;
  const contact = await ContactDB.getContactById(id);
  if (contact && req.body) {
    const updatedContact = await ContactDB.updateContact(id, data);
    return res.send(updatedContact);
  }
  res.status(404).json({ message: "Not found" });
});

const deleteContactsController = catchAsync(async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await ContactDB.getContactById(contactId);
  if (contact) {
    await ContactDB.deleteContact(contactId);
    return res.json({ message: "contact deleted" });
  }
  res.status(404).json({ message: "Not found" });
});

module.exports = {
  getContactsController,
  getContactByIdController,
  createContactsController,
  updateContactsController,
  deleteContactsController,
};
