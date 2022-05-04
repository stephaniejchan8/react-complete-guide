// import {useState} from 'react';
import './ExpensesFilter.css';

const ExpensesFilter = (props) => {
  // const [filterYear, setFilterYear] = useState('');
  const filterChangeHandler = (event) => {
    // setFilterYear(event.target.value);
    props.onFilterYear(event.target.value);
  };

  return (
    <div className='expenses-filter'>
      <div className='expenses-filter__control'>
        <label>Filter by year</label>
        <select value={props.selectedYear} onChange={filterChangeHandler}>
          <option value='2022'>2022</option>
          <option value='2021'>2021</option>
          <option value='2020'>2020</option>
        </select>
      </div>
    </div>
  );
};

export default ExpensesFilter;