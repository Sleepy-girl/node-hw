const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      name: "NoName",
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    subscription: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      // required: true,
      unique: true,
    },
  },
  { versionKey: false }
);

class Contact {
  constructor() {
    this.db = mongoose.model("Contacts", contactSchema);
  }

  getContacts = async (query) => {
    return await this.db.find(query);
  };
  getContactById = async (contactId) => {
    return await this.db.findById(contactId);
  };

  createContact = async (contactData) => {
    return await this.db.create(contactData);
  };

  updateContact = async (contactId, contactData) => {
    return await this.db.findByIdAndUpdate(contactId, contactData, {
      new: true,
    });
  };

  deleteContact = async (contactId) => {
    return await this.db.findByIdAndRemove(contactId);
  };
}
module.exports = new Contact();
