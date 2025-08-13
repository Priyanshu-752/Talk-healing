// Storage utility that handles server-side rendering and localforage initialization
let localforage: any = null;

// Simple in-memory storage fallback for server-side
const memoryStorage: { [key: string]: any } = {};

export const storage = {
  async getItem(key: string): Promise<any> {
    if (typeof window === 'undefined') {
      return memoryStorage[key] || null;
    }

    if (!localforage) {
      await initializeLocalForage();
    }

    try {
      return await localforage.getItem(key);
    } catch (error) {
      console.warn('Storage getItem failed:', error);
      return null;
    }
  },

  async setItem(key: string, value: any): Promise<void> {
    if (typeof window === 'undefined') {
      memoryStorage[key] = value;
      return;
    }

    if (!localforage) {
      await initializeLocalForage();
    }

    try {
      await localforage.setItem(key, value);
    } catch (error) {
      console.warn('Storage setItem failed:', error);
    }
  },

  async removeItem(key: string): Promise<void> {
    if (typeof window === 'undefined') {
      delete memoryStorage[key];
      return;
    }

    if (!localforage) {
      await initializeLocalForage();
    }

    try {
      await localforage.removeItem(key);
    } catch (error) {
      console.warn('Storage removeItem failed:', error);
    }
  },

  async clear(): Promise<void> {
    if (typeof window === 'undefined') {
      Object.keys(memoryStorage).forEach(key => delete memoryStorage[key]);
      return;
    }

    if (!localforage) {
      await initializeLocalForage();
    }

    try {
      await localforage.clear();
    } catch (error) {
      console.warn('Storage clear failed:', error);
    }
  },

  async ready(): Promise<void> {
    if (typeof window === 'undefined') {
      return;
    }

    if (!localforage) {
      await initializeLocalForage();
    }
  }
};

async function initializeLocalForage(): Promise<void> {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    // Dynamic import to avoid SSR issues
    const localforageModule = await import('localforage');
    localforage = localforageModule.default;

    // Configure localforage
    localforage.config({
      driver: [localforage.INDEXEDDB, localforage.WEBSQL, localforage.LOCALSTORAGE],
      name: 'TalkHealingApp',
      version: 1.0,
      storeName: 'keyvaluepairs',
      description: 'Talk Healing app storage'
    });

    // Wait for it to be ready
    await localforage.ready();
    console.log('LocalForage initialized successfully');
  } catch (error) {
    console.error('Failed to initialize LocalForage:', error);
    // Fallback to a simple storage implementation
    createFallbackStorage();
  }
}

function createFallbackStorage() {
  localforage = {
    async getItem(key: string) {
      return localStorage.getItem(key);
    },
    async setItem(key: string, value: any) {
      localStorage.setItem(key, JSON.stringify(value));
    },
    async removeItem(key: string) {
      localStorage.removeItem(key);
    },
    async clear() {
      localStorage.clear();
    },
    async ready() {
      return Promise.resolve();
    }
  };
}
