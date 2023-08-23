import React, { useState } from 'react'
import './NewExpense.css'
import ExpenseForm from './ExpenseForm'

const NewExpense = (props) => {

    const saveExpenseDataHandler = (enterExpenseData) => {
        const expenseData = {
            ...enterExpenseData,
            id: Math.random().toString()
        }
        props.onAddExpense(expenseData)
        setShow(false)
    }

    const [show, setShow] = useState(false);
    const showHandler = () => {
        setShow(true)
    }
    const hideHandler = () => {
        setShow(false)
    }

    return (
        <div className='new-expense'>
            {show && <ExpenseForm onSaveExpenseData={saveExpenseDataHandler} onHide={hideHandler}></ExpenseForm>}
            {!show && <button onClick={showHandler}>Add New Expense</button>}
        </div>
    )
}

export default NewExpense