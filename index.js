const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 3000;

const express = require("express");
const fs = require("fs").promises;
const contactsRouter = require("./api/contacts/router.js");
const cors = require("cors");

const app = express();

app.use((request, response, next) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Header", "*");
  response.setHeader("Access-Control-Allow-Method", "*");
  next();
});

app.use(express.json());
app.use("/contacts", contactsRouter);



app.listen(PORT, () => console.log(`Server started on ${PORT}`));
