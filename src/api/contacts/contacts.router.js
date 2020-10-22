const { Router } = require("express");
const {
  getContactsController,
  getContactByIdController,
  createContactsController,
  updateContactsController,
  deleteContactsController,
} = require("./contacts.controllers");
const contactsRouter = Router();

const {
  checkAuthTokenMiddleWare,
} = require("../../middlewares/auth.middleware");

contactsRouter.post("/", createContactsController);

contactsRouter.get("/", checkAuthTokenMiddleWare, getContactsController);
contactsRouter.get("/:contactId", getContactByIdController);

contactsRouter.patch("/", updateContactsController);

contactsRouter.delete("/:contactId", deleteContactsController);

module.exports = contactsRouter;
