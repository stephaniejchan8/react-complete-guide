import React, { useState, useEffect, useReducer, useContext, useRef } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';
import Input from '../UI/Input/Input';

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  const authCtx = useContext(AuthContext);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

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
    if (formIsValid) {
      authCtx.onLogin(emailState.value, passwordState.value);
    } else if (!emailIsValid) {
      emailInputRef.current.activate();
    } else {
      passwordInputRef.current.activate();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>

        <Input
          ref={emailInputRef}
          id="email"
          label="E-Mail"
          type="email"
          isValid={emailIsValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />

        <Input
          ref={passwordInputRef}
          id="password"
          label="Password"
          type="password"
          isValid={passwordIsValid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
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
