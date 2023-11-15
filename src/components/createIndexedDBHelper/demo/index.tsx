import { createIndexedDBHelper } from 'ims-indexed-db';
import { useEffect } from 'react';

const Demo = () => {
  useEffect(() => {
    handleInitPage();
  }, []);

  const handleInitPage = () => {
    createIndexedDBHelper('myDB', 'myStore', (db) => {
      const record = { name: 'John', age: 28 };
      db.add(record, () => {
        console.log('Record added');
      });
      const idToDelete = 1;
      db.delete(idToDelete, () => {
        console.log('Record deleted');
      });
      const idToGet = 2;
      db.get(idToGet, (record) => {
        console.log('Record retrieved:', record);
      });
      // 获取所有数据
      db.getAll((records) => {
        console.log('Records retrieved:', records);
      });
    });
  };
};

export default Demo;
