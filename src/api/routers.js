const express = require("express");
const app = express();
const usersRouter = require("./users/users.router");
const contactsRouter = require("./contacts/contacts.router");

app.use("/users", usersRouter);
app.use("/contacts", contactsRouter);

module.exports = app;
