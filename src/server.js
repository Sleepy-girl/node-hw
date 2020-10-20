const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const contactsRouter = require("./api/contacts/contacts.router");

class ContactsServer {
  constructor() {
    this.server = null;
  }

  start() {
    this.initServer();
    this.initMiddlewares();
    this.initRouters();
    this.initErrorHandling();
    this.startListening();
  }

  initServer() {
    this.server = express();
  }

  initMiddlewares() {
    this.server.use(express.json());
    this.server.use(morgan("combined"));
    this.server.use(cors({ origin: "http://localhost:3000" }));
  }

  initRouters() {
    this.server.use("/api/contacts", contactsRouter);
    this.server.use((req, res) =>
      res
        .status(404)
        .json({ message: "Not found, try to move on correct adress" })
    );
  }

  initErrorHandling() {
    this.server.use((err, req, res, next) => {
      const statusCode = err.statusCode || 500;
      const status = err.status || "error";
      res.status(statusCode).send({ status, message: err.message });
    });
  }

  startListening() {
    this.server.listen(PORT, (err) => {
      if (err) {
        return console.log("something went wrong");
      }
      console.log(`Server started on ${PORT}`);
    });
  }
}

// exports.ContactsServer = ContactsServer;
// exports.contactsServer = new ContactsServer();
module.exports = new ContactsServer();
