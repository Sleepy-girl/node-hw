const { Router } = require("express");
const Contacts = require('../../contacts');
const contactsRouter = Router();

contactsRouter.get('/', async (req, res) => {
  const contacts = await Contacts.listContacts();
  res.json(contacts);
})

contactsRouter.get('/:contactId', async (req, res) => { 
  const { contactId } = req.params;
  // console.log(contactId)
  const contact = await Contacts.getContactById(+contactId);
  if (contact) {
    res.json(contact);
    return;
  }
  res.status(404).json('Not found');
})

contactsRouter.post ('/', async (req, res) => {
  const { name, email, phone } = req.body;
  if ( typeof name === 'string' && name.length && typeof email === 'string' && email.length && phone.length ) {
    const contacts = await Contacts.addContact(name, email, phone);
    res.status(201).json(contacts);
    return;
  }
  res.status(400).json('missing required name field');
});

contactsRouter.delete('/:contactId', async (req, res) => {
  const { contactId } = req.params;
  // console.log(req.params)
  const id = await Contacts.getContactById(+contactId);
  // console.log(id)
  if (id) {
    await Contacts.removeContact(+contactId);
    res.status(200).json("contact deleted");
    return;
  }
  res.status(404).json("Not found");
})

contactsRouter.patch('/:contactId', async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contacts.getContactById(+contactId);

  if (contact && req.body) {
    const updateContact = await Contacts.updateContact(+contactId, req.body);
    res.status(200).send(updateContact);
    return;
  };
  res.status(404).json('Not found')
})

module.exports = contactsRouter;