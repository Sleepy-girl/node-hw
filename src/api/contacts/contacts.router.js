const { Router } = require("express");
const {
  getContactsController,
  getContactByIdController,
  createContactsController,
  updateContactsController,
  deleteContactsController,
} = require("./contacts.controllers");
const contactsRouter = Router();

contactsRouter.post("/", createContactsController);
contactsRouter.get("/", getContactsController);
contactsRouter.get("/:contactId", getContactByIdController);
contactsRouter.patch("/", updateContactsController);
contactsRouter.delete("/:contactId", deleteContactsController);

module.exports = contactsRouter;
