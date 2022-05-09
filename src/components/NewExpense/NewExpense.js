import {useState} from 'react';
import './NewExpense.css';
import ExpenseForm from './ExpenseForm';

const NewExpense = (props) => {
  const [isEditing, setIsEditing] = useState(false);

  const saveExpenseDataHandler = (enteredExpenseData) => {
    const expenseData = {
      ...enteredExpenseData,
      id: Math.random().toString()
    };
    props.onAddExpense(expenseData);
  };
  
  const newExpenseHandler = () => {
    setIsEditing(true);
  };

  const closeExpenseFormHandler = () => {
    setIsEditing(false);
  }

  return (
    <div className='new-expense'>
      {!isEditing && <button onClick={newExpenseHandler}>Add New Expense</button>}
      {isEditing && <ExpenseForm onCloseExpenseForm={closeExpenseFormHandler} onSaveExpenseData={saveExpenseDataHandler} />}
    </div>
  )
};

export default NewExpense;