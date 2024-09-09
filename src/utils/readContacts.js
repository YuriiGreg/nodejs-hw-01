import { promises as fs } from 'fs';
import path from 'path';

const PATH_DB = path.join(process.cwd(), 'src/db/db.json');

export const readContacts = async () => {
  try {
    const data = await fs.readFile(PATH_DB, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading contacts:', error);
    return [];
  }
};

