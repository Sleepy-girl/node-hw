const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 3000;

const express = require("express");
const contactsRouter = require("./api/contacts/router.js");

const app = express();

app.use((request, response, next) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Header", "*");
  response.setHeader("Access-Control-Allow-Method", "*");
  next();
});

app.use(express.json());
app.use("/contacts", contactsRouter);

app.use((err, req, res, next) => {
  return res.status(err.status).send(err.message);
});

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
