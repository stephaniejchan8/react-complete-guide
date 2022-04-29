import './components/Expenses.css';
import Expenses from "./components/Expenses";

function App() {
  const expenses = [
    {
      id: 'e1',
      title: 'Concert tickets',
      amount: 94.12,
      date: new Date(2021, 4, 20),
    },
    {
      id: 'e2',
      title: 'Couch',
      amount: 799.49,
      date: new Date(2021, 8, 11),
    },
    {
      id: 'e3',
      title: 'RACV',
      amount: 294.67,
      date: new Date(2021, 12, 2),
    },
    {
      id: 'e4',
      title: 'Carpet',
      amount: 450,
      date: new Date(2022, 3, 3),
    },
  ];

  return (
    <div>
      <h2>Expenses</h2>
      <Expenses expenses={expenses} />
    </div>
  );
}

export default App;
