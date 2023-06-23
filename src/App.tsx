import './App.css';
import { useSubscription } from '@logux/redux';
// import { useSelector } from 'react-redux';
import { TableItem } from './types';
import { store } from './store';
import { Atom, atom, useAtom } from 'jotai';
import { splitAtom } from 'jotai/utils';
import { atomWithStore } from 'jotai-redux';
import { Input } from './components/Input';

const atomStore = atomWithStore(store);
const tableItemsAtom = atom(get => get(atomStore).tableItems.items as TableItem[]);
const tableItemAtom = splitAtom(tableItemsAtom);

const TableItemComponent: React.FC<{ itemAtom: Atom<TableItem> }> = ({ itemAtom }) => {
  const [item] = useAtom(itemAtom);

  const handleDispatchCount = (count: number) => {
    store.dispatch.sync({ type: 'table/items/count', itemID: item.id, count });
  };

  const handleDispatchDescription = (description: string) => {
    store.dispatch.sync({ type: 'table/items/description', itemID: item.id, description });
  };

  console.log('ITEM RE-RENDER', { item });

  return (
    <tr key={item.id}>
      <td>{item.name}</td>
      <td><Input value={item.description} onChange={handleDispatchDescription}/></td>
      <td>
        <button onClick={() => handleDispatchCount(item.count - 1)}>-</button>
        {item.count}
        <button onClick={() => handleDispatchCount(item.count + 1)}>+</button>
      </td>
    </tr>
  );
};

function App() {
  const isSubscribing = useSubscription(['table/items']);
  // const tableItems: TableItem[] = useSelector((state: any) => state.tableItems.items);
  const [atomicTableItems] = useAtom(tableItemAtom);

  if (isSubscribing || !atomicTableItems || atomicTableItems?.length === 0) return <div>is loading</div>;

  console.log('RE-RENDER', { atomicTableItems });

  return (
    <>
      <div>
        <table>
          <thead>
            <th>name</th>
            <th>description</th>
            <th>count</th>
          </thead>

          <tbody>
            {atomicTableItems?.map(atomicTableItem => (
              <TableItemComponent itemAtom={atomicTableItem} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default App
