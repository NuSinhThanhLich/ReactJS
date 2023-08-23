import { useState, useReducer } from "react";

const initialInputState = {
    value: '',
    isTouched: false
}

const inputStateReducer = (state, action) => {
    if (action.type === 'INPUT') {
        return {value: action.value, isTouched: state.isTouched}
    }
    if (action.type === 'BLUR') {
        return {value: state.value, isTouched: true}
    }
    if (action.type === 'RESET') {
        return {value: '', isTouched: false}
    }
    return initialInputState
}

const useInput2 = (validate) => {
    const [inputState, dispatch] = useReducer(inputStateReducer, initialInputState)

    // const [enteredValue, setEnteredValue] = useState('')
    // const [isTouched, setIsTouched] = useState(false)

    const valueIsValid = validate(inputState.value)
    const hasError = !valueIsValid && inputState.isTouched

    const enteredValueHandler = (event) => {
        dispatch({type: 'INPUT', value: event.target.value})
        // setEnteredValue(event.target.value)
    } 

    const inputBlurHandler = () => {
        dispatch({type: 'BLUR'})
        // setIsTouched(true)
    }

    const reset = () => {
        dispatch({type: 'RESET'})
        // setEnteredValue('')
        // setIsTouched(false)
    }

    return {
        value: inputState.value,
        isVaild: valueIsValid,
        hasError: hasError,
        enteredValueHandler,
        inputBlurHandler,
        reset
    }
}  

export default useInput2