import React, { useState, useEffect, useReducer,useContext } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  const authCtx = useContext(AuthContext);

  // useEffect(() => {
  //   console.log('EFFECT RUNNING');

  //   return () => {
  //     console.log('EFFECT CLEANUP');
  //   };
  // }, []);

  const emailReducer = (state, action) => {
    if (action.type === 'USER_INPUT') {
      return { value: action.val, isValid: action.val.includes('@') };
    }
    if (action.type === 'BLUR_EMAIL') {
      return { value: state.value, isValid: state.value.includes('@') };
    }
    return {
      value: '',
      isValid: false
    }
  };

  const passwordReducer = (state, action) => {
    if (action.type === "PASSWORD_INPUT") {
      return { value: action.val, isValid: action.val.trim().length > 6 };
    } if (action.type === "BLUR_PASSWORD") {
      return { value: state.value, isValid: state.value.trim().length > 6 };
    }
    return { value: '', isValid: false };
  };

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '',
    isValid: undefined
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: '',
    isValid: undefined
  });

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(
        emailIsValid && passwordIsValid
      );
      console.log('useEffect');
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({
      type: 'USER_INPUT',
      val: event.target.value
    });
    console.log('EMAILCHANGE emailState value: ' + emailState.value + ' emailState.isValid: ' + emailState.isValid);
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({
      type: 'PASSWORD_INPUT',
      val: event.target.value
    });
    console.log('passwordChangeHandler passwordState value: ' + passwordState.value + ' isValid: ' + passwordState.isValid);

    setFormIsValid(
      emailState.isValid && passwordState.isValid
    );
  };

  const validateEmailHandler = () => {
    dispatchEmail({
      type: 'BLUR_EMAIL'
    });
    console.log('BLUR_EMAIL emailState value: ' + emailState.value + ' emailState.isValid: ' + emailState.isValid);
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: 'BLUR_PASSWORD' });
    console.log('BLUR_PASSWORD passwordState value: ' + passwordState.value + ' isValid: ' + passwordState.isValid);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    authCtx.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${ classes.control } ${ emailState.isValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${ classes.control } ${ passwordState.isValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
