
import useInput from "../hooks/use-input";

const SimpleInput = (props) => {
  const {
    value: enteredName, 
    hasError: nameInputHasError,
    isValid: enteredNameIsValid,
    valueChangeHandler: nameChangeHandler, 
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput
  } = useInput(value => value.trim() !== '')

  const {
    value: enteredEmail, 
    hasError: emailInputHasError,
    isValid: enteredEmailIsValid,
    valueChangeHandler: emailChangeHandler, 
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput
  } = useInput(value => value.trim() !== '' && value.includes('@'))
  

  
  let formIsValid = false
    if (enteredNameIsValid && enteredEmailIsValid) {
      formIsValid = true
    } 

  const formSubmitsionHandler = event => {
    event.preventDefault()
    resetNameInput()
    resetEmailInput()
  }

  const nameInputClass = nameInputHasError ? 'form-control invalid' : 'form-control'
  const emailInputClass = emailInputHasError ? 'form-control invalid' : 'form-control'

  return (
    <form onSubmit={formSubmitsionHandler}>
      <div className={nameInputClass}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' onChange={nameChangeHandler} onBlur={nameBlurHandler} value={enteredName}/>
        {nameInputHasError && <p className="error-text">Name must not be empty</p>}
      </div>
      <div className={emailInputClass}>
        <label htmlFor='email'>Your Email</label>
        <input type='email' id='email' onChange={emailChangeHandler} onBlur={emailBlurHandler} value={enteredEmail}/>
        {emailInputHasError && <p className="error-text">Email is invalid</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
