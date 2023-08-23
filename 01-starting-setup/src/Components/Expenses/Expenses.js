import React, { useState } from "react";

import "./Expenses.css";
import Card from "../UI/Card";
import ExpensesFilter from "./ExpensesFilter";
import ExpenseList from "./ExpenseList";
import ExpensesChart from "./ExpensesChart";

const Expenses = (props) => {
  const [currentYear, setCurrentYear] = useState("2020");
  const changeFilterHandler = (year) => {
    setCurrentYear(year);
    console.log(year);
  };

  const filterYear = props.items.filter(expense => {
    return expense.date.getFullYear().toString() === currentYear
  })

  return (
    <div>
      <Card className="expenses">
        <ExpensesFilter
          current={currentYear}
          onChangeFilter={changeFilterHandler}
        ></ExpensesFilter>
        <ExpensesChart expenses={filterYear}></ExpensesChart>
        <ExpenseList items={filterYear}></ExpenseList>

           {/* {filterYear.length === 0 && <p>No expenses found.</p>}
        {filterYear.length >= 1 && 
          filterYear.map((expense) => (
          <ExpenseItem
            key={expense.id}
            title={expense.title}
            amount={expense.amount}
            date={expense.date}
          ></ExpenseItem>
        ))}  */}
      </Card>
    </div>
  );
};

export default Expenses;
