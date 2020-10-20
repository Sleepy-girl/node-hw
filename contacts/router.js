const { Router } = require("express");
const {
  getContactsController,
  createContactsController,
  updateContactsController,
  deleteContactsController,
} = require("./contacts.controllers");
const contactsRouter = Router();

contactsRouter.post("/", createContactsController);
contactsRouter.get("/", getContactsController);
contactsRouter.patch("/", updateContactsController);
contactsRouter.delete("/:contactId", deleteContactsController);

module.exports = contactsRouter;
