import useInput2 from "../hooks/use-input2";

const BasicForm = (props) => {

  const {
    value: enteredFirstName,
    isVaild: firstNameIsValid,
    hasError: firstError,
    enteredValueHandler: enteredFirstNameHandler,
    inputBlurHandler: inputFirstNameBlurHandler,
    reset: resetFirstName
  } = useInput2(value => value.trim() !== '')

  const {
    value: enteredLastName,
    isVaild: lastNameIsValid,
    hasError: lastError,
    enteredValueHandler: enteredLastNameHandler,
    inputBlurHandler: inputLastNameBlurHandler,
    reset: resetLastName
  } = useInput2(value => value.trim() !== '')

  
  const {
    value: enteredEmail,
    isVaild: emailIsValid,
    hasError: emailError,
    enteredValueHandler: enteredEmailHandler,
    inputBlurHandler: inputEmailBlurHandler,
    reset: resetEmail
  } = useInput2(value => value.trim() !== '' && value.includes('@'))

  let formValid = false
  if (firstNameIsValid && lastNameIsValid && emailIsValid ) {
    formValid = true
  }

  const submitHandler = (event) => {
    event.preventDefault();

    if (!formValid) {
      return
    }

    resetFirstName()
    resetLastName()
    resetEmail()
  }

  const firstNameClass = firstError ? 'form-control invalid' : 'form-control'
  const lastNameClass = lastError ? 'form-control invalid' : 'form-control'
  const emailClass = emailError ? 'form-control invalid' : 'form-control'

  return (
    <form onSubmit={submitHandler}>
      <div className='control-group'>
        <div className={firstNameClass}>
          <label htmlFor='name'>First Name</label>
          <input type='text' id='name' onChange={enteredFirstNameHandler} onBlur={inputFirstNameBlurHandler} value={enteredFirstName}/>
          {firstError && <p className="error-text">First name must not be empty</p>}
        </div>
        <div className={lastNameClass}>
          <label htmlFor='name'>Last Name</label>
          <input type='text' id='name' onChange={enteredLastNameHandler} onBlur={inputLastNameBlurHandler} value={enteredLastName}/>
          {lastError && <p className="error-text">Last name must not be empty</p>}
        </div>
      </div>
      <div className={emailClass}>
        <label htmlFor='name'>E-Mail Address</label>
        <input type='email' id='email' onChange={enteredEmailHandler} onBlur={inputEmailBlurHandler} value={enteredEmail}/>
        {emailError && <p className="error-text">Email is not valid</p>}
      </div>
      <div className='form-actions'>
        <button disabled={!formValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
