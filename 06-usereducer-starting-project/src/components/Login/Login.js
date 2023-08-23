import React, { useState, useEffect, useReducer, useContext, useRef } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';
import Input from '../UI/Input/Input';

const emailReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return {value: action.val, isValid: action.val.includes('@')}
  }
  if (action.type === 'BLUR_INPUT') {
    return {value: state.value, isValid: state.value.includes('@')}
  }
  return {value: '', isValid: false}
}

const passwordReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return {value: action.val, isValid: action.val.trim().length > 6}
  }
  if (action.type === 'BLUR_INPUT') {
    return {value: state.value, isValid: state.value.trim().length > 6}
  }
  return {value:'', isValid: false}
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {value:'', isValid: null})
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {value:'', isValid: null})
  const ctx = useContext(AuthContext)

  const emailInputRef = useRef()
  const passwordInputRef = useRef()

  const {isValid: emailIsValid } = emailState;
  const {isValid: passwordIsValid } = passwordState
  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('Checking form validity!');
      setFormIsValid(
        emailIsValid && passwordIsValid
      );
    }, 500);

    return () => {
      console.log('CLEANUP');
      clearTimeout(identifier);
      // tranh chay effect qua nhieu ma doi ng dung nhap input xong
    };
  }, [emailIsValid, passwordIsValid]);
  // su dung isValid de tranh chay effect qua nhieu lan so voi thay doi gia tri input

  const emailChangeHandler = (event) => {
    dispatchEmail({type:'USER_INPUT', val: event.target.value})

    // setFormIsValid(
    //   event.target.value.includes('@') && passwordState.isValid
    // );
  };

  const passwordChangeHandler = (event) => {
   dispatchPassword({type:'USER_INPUT', val: event.target.value})

    // setFormIsValid(
    //   emailState.isValid && event.target.value.trim().length > 6
    // );
  };

  const validateEmailHandler = () => {
    dispatchEmail({type: 'BLUR_INPUT'})
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type: 'BLUR_INPUT'})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      ctx.onLogin(emailState.value, passwordState.value);
    } else if (!emailIsValid) {
       emailInputRef.current.focus()
    } else {
      passwordInputRef.current.focus()
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>

        <Input type="email"
            ref={emailInputRef}
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
            label="E-mail"
            isValid={emailIsValid}>  
        </Input>

        <Input type="password"
            ref={passwordInputRef}
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
            label="Password"
            isValid={passwordIsValid}>  
        </Input>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
