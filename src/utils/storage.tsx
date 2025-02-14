import { openDB } from 'idb';
import { AttendeeFormData } from './zodschema';

const DB_NAME = 'attendeeDB';
const STORE_NAME = 'attendees';

export const initDB = async () => {
  const db = await openDB(DB_NAME, 1, {
    upgrade(db) {
      db.createObjectStore(STORE_NAME, { keyPath: 'email' });
    },
  });
  return db;
};

export const saveToIndexedDB = async (data: AttendeeFormData) => {
  const db = await initDB();
  await db.put(STORE_NAME, data);
};

export const getFromIndexedDB = async (email: string) => {
  const db = await initDB();
  return db.get(STORE_NAME, email);
};

export const saveToLocalStorage = (data: AttendeeFormData) => {
  localStorage.setItem(`attendee-${data.email}`, JSON.stringify(data));
};

export const getFromLocalStorage = (email: string) => {
  const data = localStorage.getItem(`attendee-${email}`);
  return data ? JSON.parse(data) : null;
};