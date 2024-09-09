import { readContacts } from '../utils/readContacts.js';
import { writeContacts } from '../utils/writeContacts.js';

export const removeLastContact = async () => {
  try {
    const contacts = await readContacts();
    
    if (contacts.length === 0) {
      console.log('There are no contacts to delete.');
      return;
    }

    const removedContact = contacts.pop();

    await writeContacts(contacts);
    console.log('Last contact deleted:', removedContact);
  } catch (error) {
    console.error('Error deleting last contact:', error);
  }
};

removeLastContact();


