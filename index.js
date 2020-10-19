const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const contactsRouter = require('./api/contacts/router');

const app = express();

app.use(cors({ origin: 'http://localhost:3000/' }));
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use('/api/contacts', contactsRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const status = err.status || 'error';
  res.status(statusCode).send({ status, message: err.message });
});

app.listen(PORT, err => {
  if (err) {
    return console.log('something went wrong');
  }
  console.log(`Server started on ${PORT}`);
});
