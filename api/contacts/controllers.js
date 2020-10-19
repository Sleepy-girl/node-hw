const Contacts = require('../../contacts');
const catchAsync = require('../../utils/catchAsync');

exports.createContact = catchAsync(async (req, res, next) => {
  const { name, email, phone } = req.body;
  const contacts = await Contacts.addContact(name, email, phone);
  res.status(201).json(contacts);
});

exports.getlistContacts = catchAsync(async (req, res, next) => {
  const contacts = await Contacts.listContacts();
  // console.log(contacts);
  res.json(contacts);
});

exports.getContact = catchAsync(async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contacts.getContactById(+contactId);
  if (contact) {
    return res.json(contact);
  }
  res.status(404).json({ message: 'Not found' });
});

exports.updateContact = catchAsync(async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contacts.getContactById(+contactId);
  if (contact && req.body) {
    const updateContact = await Contacts.updateContact(+contactId, req.body);
    res.status(200).send(updateContact);
    return;
  }
  res.status(404).json({ message: 'Not found' });
});

exports.deleteContact = catchAsync(async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contacts.getContactById(+contactId);
  if (contact) {
    await Contacts.removeContact(+contactId);
    res.status(200).json({ message: 'contact deleted' });
    return;
  }
  res.status(404).json({ message: 'Not found' });
});
