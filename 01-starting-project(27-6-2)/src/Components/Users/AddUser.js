import React from "react";
import { useState } from "react";
import Card from "../UI/Card";
import classes from './AddUser.module.css'
import Button from "../UI/Button";
import ErrorModel from "../UI/ErrorModel";
const AddUser = (props) => {
    const [enteredUserName, setEnteredUserName] = useState('')
    const [enteredUserAge, setEnteredUserAge] = useState('')
    const [error, setError] = useState()
    const addUserHandler = (event) => {
        event.preventDefault()
        if (enteredUserName.trim().length === 0 || enteredUserAge.trim().length === 0) {
            setError({
                title: 'Invalid input',
                message: 'Please enter a valid name and age (non-empty values)'
            })
            return
        }
        if (+enteredUserAge < 1) {
            setError({
                title: 'Invalid age',
                message: 'Please enter a valid age (> 0)'
            })
            return 
        }
        // console,log(enteredUserName, enteredUserAge)
        props.onAddUser(enteredUserName, enteredUserAge)
        setEnteredUserName('')
        setEnteredUserAge('')
    }

    const usernameChangeHandler = (event) => {
        setEnteredUserName(event.target.value)
       
    } 

    const ageChangeHandler = (event) => {
        setEnteredUserAge(event.target.value)
       
    }

    const resetHandler = () => {
        setError(null)
    }

    return (
    <React.Fragment>
        {error && <ErrorModel title={error.title} message={error.message} onConfirm={resetHandler}></ErrorModel>}
        <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
            <label htmlFor="username">Username</label>
            <input id="username" type="text" onChange={usernameChangeHandler} value={enteredUserName}></input>
            <label htmlFor="age">Age (Years)</label>
            <input id="age" type="number" onChange={ageChangeHandler} value={enteredUserAge}></input>
            <Button type="submit">Add User</Button>
        </form>
        </Card>
    </React.Fragment>
    )
}

export default AddUser