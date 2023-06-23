import { faker } from '@faker-js/faker';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

const db = new Low(new JSONFile('database.json'), {});

export const generateItems = (value) => {
  const items = [];

  for (let i = 0; i < value; i++) {
    items.push({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      description: faker.lorem.lines(),
      count: faker.number.int({ min: 1, max: 100 }),
      updatedAt: new Date(),
    });
  }

  return items;
};

export const seedDatabase = () => {
  db.data = { tableItems: generateItems(1000) };
  db.write();
};

export const getTableItems = async () => {
  await db.read();
  return db.data.tableItems;
};

export const getTableItem = async (id) => {
  await db.read();
  return db.data.tableItems.find(item => item.id === id);
};

export const saveTableItemAttribute = async (id, attributeName, value) => {
  await db.read();
  const tableItems = db.data.tableItems;
  const newTableItems = tableItems.map(item => {
    if (item.id !== id) return item;
    return { ...item, [attributeName]: value };
  });
  db.data = { tableItems: newTableItems };
  db.write();
};