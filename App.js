import MainTab from './navigate';
import { DataProvider } from './components/DataProvider';

export default function App() {
  return (
    <DataProvider>
      <MainTab/>
    </DataProvider>
  );
}