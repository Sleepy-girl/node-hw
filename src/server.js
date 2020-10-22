const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const morgan = require("morgan");
const express = require("express");

const authRouter = require("./api/auth/auth.router");
const usersRouter = require("./api/users/users.router");
const contactsRouter = require("./api/contacts/contacts.router");
const mongoose = require("mongoose");

class ContactsServer {
  constructor() {
    this.server = null;
  }

  start() {
    this.initDB();
    this.initServer();
    this.initMiddlewares();
    this.initRouters();
    this.initErrorHandling();
    this.startListening();
  }

  async initDB() {
    try {
      await mongoose.connect(process.env.DB_URI, { useUnifiedTopology: true });
      console.log("Database connection successful");
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
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
    this.server.use("/auth", authRouter);
    this.server.use("/api/users", usersRouter);
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

exports.ContactsServer = ContactsServer;
exports.contactsServer = new ContactsServer();
