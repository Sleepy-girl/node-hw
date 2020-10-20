const Contacts = require("./contacts.model");
const Joi = require("@hapi/joi");
const catchAsync = require("../../utils/catchAsync");

exports.validateAddContact = (req, res, next) => {
  const body = req.body;
  const contactRules = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
  });
  const validationResult = contactRules.validate(body);
  if (validationResult.error) {
    return res.status(400).send(validationResult.error);
  }
  next();
};

exports.createContact = catchAsync(async (req, res, next) => {
  const { name, email, phone } = req.body;
  const contacts = await Contacts.addContact(name, email, phone);
  res.status(201).json(contacts);
});

exports.getlistContacts = catchAsync(async (req, res, next) => {
  const contacts = await Contacts.listContacts();
  res.json(contacts);
});

exports.getContact = catchAsync(async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contacts.getContactById(+contactId);
  if (contact) {
    return res.json(contact);
  }
  res.status(404).json({ message: "Not found" });
});

exports.validateUpdateContact = (req, res, next) => {
  const body = req.body;
  const contactRules = Joi.object({
    name: Joi.string(),
    email: Joi.string(),
    phone: Joi.string(),
  });
  const validationResult = contactRules.validate(body);
  if (validationResult.error) {
    return res.status(400).json(validationResult.error);
  }
  next();
};

exports.updateContact = catchAsync(async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contacts.getContactById(+contactId);
  if (contact && req.body) {
    const updateContact = await Contacts.updateContact(+contactId, req.body);
    res.status(200).send(updateContact);
    return;
  }
  res.status(404).json({ message: "Not found" });
});

exports.deleteContact = catchAsync(async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contacts.getContactById(+contactId);
  if (contact) {
    await Contacts.removeContact(+contactId);
    res.status(200).json({ message: "contact deleted" });
    return;
  }
  res.status(404).json({ message: "Not found" });
});
