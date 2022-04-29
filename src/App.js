import ExpenseItem from "./components/ExpenseItem";

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
      <h2>Hello world!</h2>
      <p>Titi is a gym junkie.</p>
      <ExpenseItem
        title={expenses[0].title}
        amount={expenses[0].amount}
        date={expenses[0].date}
      />
      <ExpenseItem
        title={expenses[1].title}
        amount={expenses[1].amount}
        date={expenses[1].date}
      />
      <ExpenseItem
        title={expenses[2].title}
        amount={expenses[2].amount}
        date={expenses[2].date}
      />
      <ExpenseItem
        title={expenses[3].title}
        amount={expenses[3].amount}
        date={expenses[3].date}
      />
    </div>
  );
}

export default App;
