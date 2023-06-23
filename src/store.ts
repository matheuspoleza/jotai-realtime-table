import { CrossTabClient, badge, badgeEn, log } from '@logux/client';
import { createStoreCreator } from '@logux/redux';
import reducer from './reducers';
import { badgeStyles } from '@logux/client/badge/styles';

const client = new CrossTabClient({
  server: 'ws://localhost:31337',
  subprotocol: '1.0.0',
  userId: 'anonymous',  // TODO: We will fill it in Authentication recipe
  token: ''  // TODO: We will fill it in Authentication recipe
});

const createStore = createStoreCreator(client);

export const store = createStore(reducer);

badge(store.client, { messages: badgeEn, styles: badgeStyles })
log(store.client);

store.client.start();