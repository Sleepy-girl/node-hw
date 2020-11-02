const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 3000;
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const cookieParser = require("cookie-parser");

const authRouter = require("./api/auth/auth.router");
const mongoose = require("mongoose");
// const { patch } = require("./api/routers");

class RunServer {
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
      mongoose.set("debug", true);
      await mongoose.connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
        useCreateIndex: true,
      });
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
    this.server.use(cookieParser());
  }

  initRouters() {
    this.server.use("/auth", authRouter);
    this.server.use("/api", require("./api/routers"));
    this.server.use("/", express.static(path.resolve(__dirname, "public")));
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

exports.RunServer = RunServer;
exports.runServer = new RunServer();
