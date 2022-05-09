import { useState } from 'react';
import Card from "../UI/Card";
import ExpensesFilter from "./ExpensesFilter";
import './Expenses.css';
import ExpensesList from './ExpensesList';

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
        <ExpensesList items={filteredExpenses} />
      </Card>
    </div>
  );
}

export default Expenses;