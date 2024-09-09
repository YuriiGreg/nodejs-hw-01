const fs = require('fs').promises;
const path = require('path');
const { program } = require('commander');
const { faker } = require('@faker-js/faker'); 

const contactsPath = path.join(__dirname, 'contacts.json');

async function ensureContactsFileExists() {
  try {
    await fs.access(contactsPath);
  } catch (error) {
    await fs.writeFile(contactsPath, '[]', 'utf8');
  }
}

async function getContacts() {
  await ensureContactsFileExists();
  const data = await fs.readFile(contactsPath, 'utf8');
  return JSON.parse(data);
}

function createFakeContact() {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    phone: faker.phone.number(), 
    email: faker.internet.email(), 
    job: faker.person.jobTitle() 
  };
}

async function addContact() {
  try {
    const contacts = await getContacts();
    const newContact = createFakeContact();
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    console.log('New contact added:', newContact);
  } catch (error) {
    console.error('Error adding contact:', error);
  }
}

async function removeContact(id) {
  try {
    let contacts = await getContacts();
    const filteredContacts = contacts.filter(contact => contact.id !== id);
    if (contacts.length === filteredContacts.length) {
      console.log(`Contact with ID ${id} not found.`);
      return;
    }
    await fs.writeFile(contactsPath, JSON.stringify(filteredContacts, null, 2));
    console.log(`Contact with ID ${id} has been deleted.`);
  } catch (error) {
    console.error('Error deleting contact:', error);
  }
}

async function listContacts() {
  try {
    const contacts = await getContacts();
    console.log('All contacts:', contacts);
  } catch (error) {
    console.error('An error occurred while retrieving the contact list:', error);
  }
}

async function getContactById(id) {
  try {
    const contacts = await getContacts();
    const contact = contacts.find(contact => contact.id === id);
    if (contact) {
      console.log('Contact found:', contact);
    } else {
      console.log(`Contact with ID ${id} not found.`);
    }
  } catch (error) {
    console.error('Error receiving contact:', error);
  }
}

program
  .command('list')
  .description('Display all contacts')
  .action(listContacts);

program
  .command('get')
  .description('Get contact by ID')
  .requiredOption('-i, --id <string>', 'ID contact')
  .action((options) => getContactById(options.id));

program
  .command('add')
  .description('Add a new random contact')
  .action(addContact);

program
  .command('remove')
  .description('Delete contact by ID')
  .requiredOption('-i, --id <string>', 'ID contact')
  .action((options) => removeContact(options.id));

program.parse(process.argv);


