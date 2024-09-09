import { createFakeContact } from '../utils/createFakeContact.js';
import { readContacts } from '../utils/readContacts.js';
import { writeContacts } from '../utils/writeContacts.js';

export const generateContacts = async (number) => {
  try {
    const contacts = await readContacts();
    
    for (let i = 0; i < number; i++) {
      contacts.push(createFakeContact());
    }

    await writeContacts(contacts);
    console.log(`${number} new contacts generated and added.`);
  } catch (error) {
    console.error('Error generating contacts:', error);
  }
};

generateContacts(5);


