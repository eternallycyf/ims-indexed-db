interface IndexedDBRecord {
  id?: number;
  name: string;
}

export class IndexedDBHelper {
  private dbName: string;
  private storeName: string;
  private db: IDBDatabase | null;
  private indexedDB: IDBFactory;

  constructor(dbName: string, storeName: string) {
    this.dbName = dbName;
    this.storeName = storeName;
    this.db = null;
    this.indexedDB =
      window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;
  }

  create(callback?: (db: InstanceType<typeof IndexedDBHelper>) => void): void {
    this.open().then(() => {
      if (callback) {
        setTimeout(() => {
          callback(this);
        }, 0);
      }
    });
  }

  open(): Promise<IDBDatabase> {
    return new Promise<IDBDatabase>((resolve, reject) => {
      const request: IDBOpenDBRequest = this.indexedDB.open(this.dbName);

      request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        //@ts-ignore
        const db: IDBDatabase = event.target.result;
        const objectStore: IDBObjectStore = db.createObjectStore(this.storeName, {
          keyPath: 'id',
          autoIncrement: true,
        });
        objectStore.createIndex('name', 'name', { unique: true });
        objectStore.transaction.oncomplete = () => {
          console.log('Object store created');
          resolve(db);
        };
      };

      request.onsuccess = (event: Event) => {
        this.db = (event.target as IDBOpenDBRequest).result as IDBDatabase;
        resolve((event.target as IDBOpenDBRequest).result as IDBDatabase);
      };

      request.onerror = (event: Event) => {
        console.log('Error opening IndexedDB database:', (event.target as IDBOpenDBRequest).error);
        reject((event.target as IDBOpenDBRequest).error);
      };
    });
  }

  add(record: IndexedDBRecord, callback?: () => void): void {
    const transaction: IDBTransaction = this.db!.transaction([this.storeName], 'readwrite');
    const objectStore: IDBObjectStore = transaction.objectStore(this.storeName);
    const request: IDBRequest<IDBValidKey> = objectStore.add(record);

    request.onsuccess = (event: Event) => {
      console.log('Record added:', (event.target as IDBRequest<IDBValidKey>).result);
      if (callback) callback();
    };

    request.onerror = (event: Event) => {
      console.log('Error adding record:', (event.target as IDBRequest<IDBValidKey>).error);
    };
  }

  update(record: IndexedDBRecord, callback?: () => void): void {
    const transaction: IDBTransaction = this.db!.transaction([this.storeName], 'readwrite');
    const objectStore: IDBObjectStore = transaction.objectStore(this.storeName);
    const request: IDBRequest<IDBValidKey> = objectStore.put(record);

    request.onsuccess = (event: Event) => {
      console.log('Record updated:', (event.target as IDBRequest<IDBValidKey>).result);
      if (callback) callback();
    };

    request.onerror = (event: Event) => {
      console.log('Error updating record:', (event.target as IDBRequest<IDBValidKey>).error);
    };
  }

  delete(id: number, callback?: () => void): void {
    const transaction: IDBTransaction = this.db!.transaction([this.storeName], 'readwrite');
    const objectStore: IDBObjectStore = transaction.objectStore(this.storeName);
    const request: IDBRequest<any> = objectStore.delete(id);

    request.onsuccess = () => {
      console.log('Record deleted:', id);
      if (callback) callback();
    };

    request.onerror = (event: Event) => {
      console.log('Error deleting record:', (event.target as IDBRequest<void>).error);
    };
  }

  get(id: number, callback: (record: IndexedDBRecord | null) => void): void {
    const transaction: IDBTransaction = this.db!.transaction([this.storeName], 'readonly');
    const objectStore: IDBObjectStore = transaction.objectStore(this.storeName);
    const request: IDBRequest<IndexedDBRecord | undefined> = objectStore.get(id);

    request.onsuccess = (event: Event) => {
      const result: IndexedDBRecord | undefined = (event.target as IDBRequest<IndexedDBRecord>)
        .result;
      console.log('Record retrieved:', result);
      callback(result || null);
    };

    request.onerror = (event: Event) => {
      console.log('Error retrieving record:', (event.target as IDBRequest<IndexedDBRecord>).error);
      callback(null);
    };
  }

  getAll(callback: (records: IndexedDBRecord[]) => void): void {
    const transaction: IDBTransaction = this.db!.transaction([this.storeName], 'readonly');
    const objectStore: IDBObjectStore = transaction.objectStore(this.storeName);
    const request: IDBRequest<IndexedDBRecord[]> = objectStore.getAll();

    request.onsuccess = (event: Event) => {
      const result: IndexedDBRecord[] = (event.target as IDBRequest<IndexedDBRecord[]>).result;
      console.log('Records retrieved:', result);
      callback(result || []);
    };

    request.onerror = (event: Event) => {
      console.log(
        'Error retrieving records:',
        (event.target as IDBRequest<IndexedDBRecord[]>).error,
      );
      callback([]);
    };
  }
}

const createIndexedDBHelper = (
  dbName: string,
  storeName: string,
  callback?: (db: InstanceType<typeof IndexedDBHelper>) => any,
) => {
  const db = new IndexedDBHelper(dbName, storeName);
  db.create(callback);
};

export default createIndexedDBHelper;
