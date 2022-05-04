import {useState} from 'react';
import Card from "../UI/Card";
import ExpensesFilter from "./ExpensesFilter";
import ExpenseItem from "./ExpenseItem";
import './Expenses.css';

function Expenses(props) {
  const [enteredYear, setEnteredYear] = useState('2022');
  const filterYearHandler = (filterYear) => {
    setEnteredYear(filterYear);
  }

  return (
    <div>
      <Card className='expenses'>
      <ExpensesFilter selectedYear={enteredYear} onFilterYear={filterYearHandler}/>
        <ExpenseItem
          title={props.expenses[0].title}
          amount={props.expenses[0].amount}
          date={props.expenses[0].date} />
        <ExpenseItem
          title={props.expenses[1].title}
          amount={props.expenses[1].amount}
          date={props.expenses[1].date} />
        <ExpenseItem
          title={props.expenses[2].title}
          amount={props.expenses[2].amount}
          date={props.expenses[2].date} />
        <ExpenseItem
          title={props.expenses[3].title}
          amount={props.expenses[3].amount}
          date={props.expenses[3].date} />
      </Card>

    </div>
  );
}

export default Expenses;