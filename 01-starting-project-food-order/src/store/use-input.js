import { useReducer } from "react"

const initialValue = {
    value: '',
    isTouched: false
}

const inputStateReducer = (state, action) => {
    if (action.type === 'INPUT') {
        return {value: action.value, isTouched: state.isTouched}
    }
    if (action.type === 'BLUR') {
        return {isTouched: true, value: state.value}
    }
    if (action.type === 'RESET') {
        return {isTouched: false, value: ''}
    }
    return initialValue
}

const useInput = (validate) => {
    const [inputState, dispatch] = useReducer(inputStateReducer, initialValue)
    const valueIsValid = validate(inputState.value)
    const hasError = !valueIsValid && inputState.isTouched

    const enteredValueHandler = event => {
        dispatch({type: 'INPUT', value: event.target.value})
    }

    const blurHandler = event => {
        dispatch({type: 'BLUR'})
    }

    const resetHandler = event => {
        dispatch({type: 'RESET'})
    }

    return {
        value: inputState.value,
        isValid: valueIsValid,
        hasError: hasError,
        enteredValueHandler,
        blurHandler,
        resetHandler
    }
}

export default useInput