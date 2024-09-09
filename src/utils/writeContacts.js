import { promises as fs } from 'fs';
import path from 'path';

const PATH_DB = path.join(process.cwd(), 'src/db/db.json');

export const writeContacts = async (contacts) => {
  try {
    await fs.writeFile(PATH_DB, JSON.stringify(contacts, null, 2));
    console.log('Contacts have been successfully saved to the file.');
  } catch (error) {
    console.error('Error while writing contacts:', error);
  }
};

