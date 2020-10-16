const Contacts = require("./contacts");
// console.log(Contacts);
const argv = require("yargs").argv;

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      console.table(await Contacts.listContacts());
      break;

    case "get":
      console.table(await Contacts.getContactById(id));
      break;

    case "add":
      console.table(await Contacts.addContact(name, email, phone));
      break;

    case "remove":
      console.table(await Contacts.removeContact(id));
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);

// # Получаем и выводим весь список контакстов в виде таблицы (console.table)
// node index.js --action="list"

// # Получаем контакт по id
// node index.js --action="get" --id=5

// # Добавялем контакт
// node index.js --action="add" --name="Mango" --email="mango@gmail.com" --phone="322-22-22"

// # Удаляем контакт
// node index.js --action="remove" --id='6458315a-5305-4428-8f00-dc03324f73df'
