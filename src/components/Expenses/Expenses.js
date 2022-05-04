import { useState } from 'react';
import Card from "../UI/Card";
import ExpensesFilter from "./ExpensesFilter";
import ExpenseItem from "./ExpenseItem";
import './Expenses.css';

function Expenses(props) {
  const [enteredYear, setEnteredYear] = useState('2022');
  const filterYearHandler = (filterYear) => {
    setEnteredYear(filterYear);
  }

  const filteredExpenses = props.items.filter(expense => {
    return expense.date.getFullYear().toString() === enteredYear;
  });

  return (
    <div>
      <Card className='expenses'>
        <ExpensesFilter selectedYear={enteredYear} onFilterYear={filterYearHandler} />
        {filteredExpenses.map((expense) => (
          <ExpenseItem
            key={expense.id}
            title={expense.title}
            amount={expense.amount}
            date={expense.date} />
        ))}
      </Card>
    </div>
  );
}

export default Expenses;