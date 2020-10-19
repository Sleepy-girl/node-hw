const { Router } = require('express');
const contactsRouter = Router();
const {
  validateAddContact,
  validateUpdateContact,
} = require('../../helpers/validation');
const {
  createContact,
  getlistContacts,
  getContact,
  updateContact,
  deleteContact,
} = require('./controllers');

// C - Create
contactsRouter.post('/', validateAddContact, createContact);

// R - Read
contactsRouter.get('/', getlistContacts);
contactsRouter.get('/:contactId', getContact);

// U - Update
contactsRouter.patch('/:contactId', validateUpdateContact, updateContact);

// D - Delete
contactsRouter.delete('/:contactId', deleteContact);

module.exports = contactsRouter;
