import { Server } from '@logux/server';
import * as db from './db.js';
import dayjs from 'dayjs';

const server = new Server(
  Server.loadOptions(process, {
    subprotocol: '1.0.0',
    supports: '1.x',
    fileUrl: import.meta.url,
  })
);

server.auth(() => {
  // Allow only local users until we will have a proper authentication
  return true;
});

server.channel('table/items', {
  access () {
    return true;
  },
  resend () {
    // Resend this action to everyone who subscribed
    return 'table/items';
  },
  async load () {
    const items = await db.getTableItems();
    return { type: 'table/items', items };
  }
});

server.type('table/items/count', {
  access (ctx, action, meta) {
    return true;
  },
  resend () {
    // Resend this action to everyone who subscribed
    return 'table/items';
  },
  async process (ctx, action, meta) {
    let lastChanged = await db.getTableItem(action.itemID);
    // Ignore action if somebody already changed the name later

    if (dayjs(lastChanged).isBefore(meta.time)) {
      await db.saveTableItemAttribute(action.itemID, 'count', action.count)
    }
  }
});

server.type('table/items/description', {
  access (ctx, action, meta) {
    return true;
  },
  resend () {
    // Resend this action to everyone who subscribed
    return 'table/items';
  },
  async process (ctx, action, meta) {
    let lastChanged = await db.getTableItem(action.itemID);
    // Ignore action if somebody already changed the name later

    if (dayjs(lastChanged).isBefore(meta.time)) {
      await db.saveTableItemAttribute(action.itemID, 'description', action.description)
    }
  }
});

server.listen().then(() => {
  db.seedDatabase();
});