import { combineReducers } from 'redux';
import { TableItem } from './types';

const tableItemsReducers = (state = { items: [] } as { items: TableItem[] }, action: any) => {
  if (action.type === 'table/items') {
    return { ...state, items: action.items };
  } if (action.type === 'table/items/count') {
    return { ...state, items: state.items.map((item) => {
      if (item.id !== action.itemID) return item;
      return { ...item, count: action.count };
    }) };
  } if (action.type === 'table/items/description') {
    console.log({ action });
    return { ...state, items: state.items.map((item) => {
      if (item.id !== action.itemID) return item;
      return { ...item, description: action.description };
    }) };
  } else {
    return state;
  }
};

export default combineReducers({
  // TODO: Add reducers depends on application purposes
  test: (state = 0) => state, // Remove me when you will have real reducer,
  tableItems: tableItemsReducers,
});