const { Router } = require("express");
const contactsRouter = Router();

const {
  validateAddContact,
  createContact,
  getlistContacts,
  getContact,
  validateUpdateContact,
  updateContact,
  deleteContact,
} = require("./contacts.controllers");

// C - Create
contactsRouter.post("/", validateAddContact, createContact);

// R - Read
contactsRouter.get("/", getlistContacts);
contactsRouter.get("/:contactId", getContact);

// U - Update
contactsRouter.patch("/:contactId", validateUpdateContact, updateContact);

// D - Delete
contactsRouter.delete("/:contactId", deleteContact);

module.exports = contactsRouter;
