import { openDB } from 'idb';

let dbPromise = null;

if (typeof window !== 'undefined') {
  dbPromise = openDB('sd-arcade-db', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('roms')) {
        db.createObjectStore('roms', { keyPath: 'romHash' });
      }
    },
  });
}

export const saveRomLocally = async (romHash, blob) => {
  if (!dbPromise) return;
  const db = await dbPromise;
  await db.put('roms', {
    romHash,
    blob,
    addedAt: Date.now()
  });
};

export const getRomLocally = async (romHash) => {
  if (!dbPromise) return null;
  const db = await dbPromise;
  const entry = await db.get('roms', romHash);
  return entry ? entry.blob : null;
};

export const deleteRomLocally = async (romHash) => {
  if (!dbPromise) return;
  const db = await dbPromise;
  await db.delete('roms', romHash);
};

export const checkRomExistsLocally = async (romHash) => {
  if (!dbPromise) return false;
  const db = await dbPromise;
  const entry = await db.get('roms', romHash);
  return !!entry;
};
