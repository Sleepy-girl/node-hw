const { Router } = require("express");
const Joi = require('@hapi/joi');
const uuid = require('uuid');

const Contacts = require('../../contacts');
const { version } = require("yargs");

const contactsRouter = Router();

// --------------- CRUD -----------------

// C - Create
contactsRouter.post("/", validateAddContact, createContact);

// R - Read
contactsRouter.get("/", getlistContacts);
contactsRouter.get("/:id", getContact);

// U - Update
contactsRouter.put("/:id", validateUpdateContact, updateContact);

// D - Delete
contactsRouter.delete("/:id", deleteContact);

module.exports = contactsRouter;

// -----------------------------------------

function validateAddContact(req, res, next) {
  const body = req.body;
  const contactRules = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
  });
  const validationResult = contactRules.validate(body);
  if (validationResult.error) {
    return res.status(400).send(validationResult.error);
  }
  next();
}

function createContact(req, res, next) {
  const { name, email, phone } = req.body;
  if (name.length) {
    const contacts = Contacts.addContact(name, email, phone);
    res.status(201).json(contacts);
    return;
  }
  res.status(400).json('missing required name field');
}

function getlistContacts(req, res, next) {
  return res.status(200).json(Contacts.listContacts());
}

function getContact(req, res, next) { 
  const { contactId } = req.params;
  // console.log(contactId)
  const contact = Contacts.getContactById(+contactId);
  if (contact) {
    res.json(contact);
    return;
  }
  res.status(404).json('Not found');
}

function validateUpdateContact(req, res, next) {
  const body = req.body;
  const contactRules = Joi.object({
    name: Joi.string(),
    email: Joi.string(),
  });
  const validationResult = contactRules.validate(body);
  if (validationResult.error) {
    return res.status(400).json(validationResult.error);
  }
  next();
}

function updateContact(req, res, next) {
  const { contactId } = req.params;
  const contact = Contacts.getContactById(+contactId);

  if (contact && req.body) {
    const updateContact = Contacts.updateContact(+contactId, req.body);
    res.status(200).send(updateContact);
    return;
  };
  res.status(404).json('Not found')
}

function deleteContact(req, res, next) {
  const { contactId } = req.params;
  // console.log(req.params)
  const id =  Contacts.getContactById(+contactId);
  // console.log(id)
  if (id) {
    Contacts.removeContact(+contactId);
    res.status(200).json("contact deleted");
    return;
  }
  res.status(404).json("Not found");
}



// ------------ first version --------------

// contactsRouter.get('/', async (req, res) => {
//   const contacts = await Contacts.listContacts();
//   res.json(contacts);
// })

// contactsRouter.get('/:contactId', async (req, res) => { 
//   const { contactId } = req.params;
//   // console.log(contactId)
//   const contact = await Contacts.getContactById(+contactId);
//   if (contact) {
//     res.json(contact);
//     return;
//   }
//   res.status(404).json('Not found');
// })

// contactsRouter.post ('/', async (req, res) => {
//   const { name, email, phone } = req.body;
//   if ( typeof name === 'string' && name.length && typeof email === 'string' && email.length && phone.length ) {
//     const contacts = await Contacts.addContact(name, email, phone);
//     res.status(201).json(contacts);
//     return;
//   }
//   res.status(400).json('missing required name field');
// });

// contactsRouter.delete('/:contactId', async (req, res) => {
//   const { contactId } = req.params;
//   // console.log(req.params)
//   const id = await Contacts.getContactById(+contactId);
//   // console.log(id)
//   if (id) {
//     await Contacts.removeContact(+contactId);
//     res.status(200).json("contact deleted");
//     return;
//   }
//   res.status(404).json("Not found");
// })

// contactsRouter.patch('/:contactId', async (req, res) => {
//   const { contactId } = req.params;
//   const contact = await Contacts.getContactById(+contactId);

//   if (contact && req.body) {
//     const updateContact = await Contacts.updateContact(+contactId, req.body);
//     res.status(200).send(updateContact);
//     return;
//   };
//   res.status(404).json('Not found')
// })

// module.exports = contactsRouter;