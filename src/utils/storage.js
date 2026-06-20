/**
 * Storage Utility
 * Prepared for future integration with IndexedDB.
 * Currently uses localStorage to persist data gracefully.
 */

// Helper to handle serialization
const serialize = (value) => JSON.stringify(value);
const deserialize = (value) => {
  if (!value) return null;
  try {
    return JSON.parse(value);
  } catch (e) {
    console.error('Failed to parse from storage', e);
    return null;
  }
};

export const storage = {
  get: async (key) => {
    try {
      const item = localStorage.getItem(key);
      return deserialize(item);
    } catch (e) {
      console.error(`Error reading ${key} from storage:`, e);
      return null;
    }
  },

  set: async (key, value) => {
    try {
      localStorage.setItem(key, serialize(value));
    } catch (e) {
      console.error(`Error writing ${key} to storage:`, e);
    }
  },

  remove: async (key) => {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error(`Error removing ${key} from storage:`, e);
    }
  },

  clear: async () => {
    try {
      localStorage.clear();
    } catch (e) {
      console.error('Error clearing storage:', e);
    }
  }
};
