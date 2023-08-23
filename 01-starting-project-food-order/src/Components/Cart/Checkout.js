import classes from './Checkout.module.css';
import useInput from '../../store/use-input'
// import { useRef, useState } from 'react';

// const isEmpty = value => value.trim() === ''
// const isFiveChar = value => value.trim().length === 5

const Checkout = (props) => {

  const {
    value: enteredName,
    isValid: enteredNameValid,
    hasError: nameError,
    enteredValueHandler: enteredNameHandler,
    blurHandler: blurNameHandler,
    resetHandler: resetNameHandler
  } = useInput((value) => value.trim() !== '')

  const {
    value: enteredStreet,
    isValid: enteredStreetValid,
    hasError: streetError,
    enteredValueHandler: enteredStreetHandler,
    blurHandler: blurStreetHandler,
    resetHandler: resetStreetHandler
  } = useInput((value) => value.trim() !== '')

  const {
    value: enteredCity,
    isValid: enteredCityValid,
    hasError: cityError,
    enteredValueHandler: enteredCityHandler,
    blurHandler: blurCityHandler,
    resetHandler: resetCityHandler
  } = useInput((value) => value.trim() !== '')

  const {
    value: enteredPostal,
    isValid: enteredPostalValid,
    hasError: postalError,
    enteredValueHandler: enteredPostalHandler,
    blurHandler: blurPostalHandler,
    resetHandler: resetPostalHandler
  } = useInput((value) => value.trim().length === 5)

  // const [formCheckValid, setFormCheckValid] = useState({
  //   name: true,
  //   street: true,
  //   city: true,
  //   postalCode: true
  // })

  // const nameInputRef = useRef()
  // const streetInputRef = useRef()
  // const postalInputRef = useRef()
  // const cityInputRef = useRef()

  // const confirmHandler = (event) => {
  //   event.preventDefault();

  //   const enteredName = nameInputRef.current.value
  //   const enteredStreet = streetInputRef.current.value
  //   const enteredPostal = postalInputRef.current.value
  //   const enteredCity = postalInputRef.current.value

  //   const enteredNameIsValid = !isEmpty(enteredName)
  //   const enteredCityIsValid = !isEmpty(enteredCity)
  //   const enteredStreetIsValid = !isEmpty(enteredStreet)
  //   const enteredPostalIsValid = isFiveChar(enteredPostal)

  //   setFormCheckValid({
  //       name: enteredNameIsValid,
  //       street: enteredStreetIsValid,
  //       postalCode: enteredPostalIsValid,
  //       city: enteredCityIsValid
  //   })

  //   const formIsValid = enteredCityIsValid && enteredNameIsValid && enteredStreetIsValid && enteredPostalIsValid

  //   if (!formIsValid) {
  //       return;
  //   }
  // };
  const formIsValid = enteredNameValid && enteredStreetValid && enteredCityValid && enteredPostalValid

  const submitHandler = (event) => {
    event.preventDefault()

    if (!formIsValid) {
      return
    }
    props.onConfirm({
      name: enteredName,
      city: enteredCity,
      street: enteredStreet,
      postal: enteredPostal
    })
    resetNameHandler()
    resetCityHandler()
    resetStreetHandler()
    resetPostalHandler()
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={`${classes.control} ${!nameError ? '' : classes.invalid}`}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' onChange={enteredNameHandler} onBlur={blurNameHandler} value={enteredName}/>
        {nameError && <p>Please enter a valid name</p>}
      </div>
      <div className={`${classes.control} ${!streetError ? '' : classes.invalid}`}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' onChange={enteredStreetHandler} onBlur={blurStreetHandler} value={enteredStreet}/>
        {streetError && <p>Please enter a valid street</p>}
      </div>
      <div className={`${classes.control} ${!postalError ? '' : classes.invalid}`}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' onChange={enteredPostalHandler} onBlur={blurPostalHandler} value={enteredPostal}/>
        {postalError && <p>Please enter a valid postalCode</p>}
      </div>
      <div className={`${classes.control} ${!cityError ? '' : classes.invalid}`}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' onChange={enteredCityHandler} onBlur={blurCityHandler} value={enteredCity}/>
        {cityError && <p>Please enter a valid city</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;