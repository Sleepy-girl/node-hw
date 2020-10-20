const fs = require("fs").promises;
const path = require("path");

class Contacts {
  constructor() {
    this.contactsPath = path.resolve(__dirname, "../../db", "contacts.json");
  }

  listContacts = async () => {
    const contactsData = await fs.readFile(this.contactsPath, {
      encoding: "utf-8",
    });
    return JSON.parse(contactsData);
  };

  getContactById = async (contactId) => {
    const contactsData = await this.listContacts();
    return contactsData.find((contact) => contact.id === contactId);
  };

  removeContact = async (contactId) => {
    const contactsData = await this.listContacts();
    const result = contactsData.filter((contact) => contact.id !== contactId);
    await fs.writeFile(this.contactsPath, JSON.stringify(result));
    return this.listContacts();
  };

  addContact = async (name, email, phone) => {
    const contactsData = await this.listContacts();
    const newContact = {
      id: contactsData.length ? [...contactsData].pop().id + 1 : 1,
      name,
      email,
      phone,
    };
    contactsData.push(newContact);
    const contactsDataAsJSON = JSON.stringify(contactsData);
    await fs.writeFile(this.contactsPath, contactsDataAsJSON);
    return this.listContacts();
  };

  updateContact = async (contactId, contactParams) => {
    const contacts = await this.listContacts();
    const contactIndex = contacts.findIndex(
      (contact) => contact.id === contactId
    );
    if (contactIndex === -1) {
      return;
    }
    contacts[contactIndex] = {
      ...contacts[contactIndex],
      ...contactParams,
    };
    const contactsAsJSON = JSON.stringify(contacts);
    await fs.writeFile(this.contactsPath, contactsAsJSON);

    return contacts[contactIndex];
  };
}

module.exports = new Contacts();
