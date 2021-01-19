import React, { useState } from 'react';
import classes from './auth.module.css';
import { useFormik  } from 'formik';
import { connect } from 'react-redux';
import * as action from '../store/actions/index'

const validate = values => {
    const errors = {};
    // if (!values.firstName) {
    //   errors.firstName = 'Required';
    // } else if (values.firstName.length > 15) {
    //   errors.firstName = 'Must be 15 characters or less';
    // }
  
    // if (!values.lastName) {
    //   errors.lastName = 'Required';
    // } else if (values.lastName.length > 20) {
    //   errors.lastName = 'Must be 20 characters or less';
    // }
  
    if (!values.email) {
      errors.email = 'Email Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }
  
      if (!values.password) {
      errors.password = 'Password Required';
    } else if ( values.password.length < 6 && values.password.length < 20  ) {
      errors.password = 'Password must be at between 6 to 20 characters';
    }
    return errors;
  };
const Auth = ({onAuth, error}) => {
    const [isSignUp, setIsSignUp] = useState(true);

    const SignUpHandler = () => {
        setIsSignUp(!isSignUp);
    }
    const FormHandler = (values) => {
        // console.log(values.email,values.password,isSignUp);
        onAuth(values.email,values.password,isSignUp)
    }
    const formik = useFormik({
        initialValues: {
          email: '',
          password: ''
        },
        validate,
        onSubmit: values => {
            FormHandler(values);
        },
      });
  return (
    <div className={classes.Auth}>
      <h2 className={classes.title}> Ronchi Todo</h2>
      <div style={{textAlign: 'center', color: 'red',marginBottom: '15px'}}>{error ? error : null}</div>
     <form className={classes.Form} onSubmit={formik.handleSubmit}>
     {/* <label htmlFor="firstName">First Name</label>
     <input
       id="firstName"
       name="firstName"
       type="text"
       onChange={formik.handleChange}
       value={formik.values.firstName}
     />
     {formik.errors.firstName ? <div>{formik.errors.firstName}</div> : null}
     <label htmlFor="lastName">Last Name</label>
     <input
       id="lastName"
       name="lastName"
       type="text"
       onChange={formik.handleChange}
       value={formik.values.lastName}
     />
     {formik.errors.lastName ? <div>{formik.errors.lastName}</div> : null} */}
     <label htmlFor="email">Email Address</label>
     <input
      className={classes.Input}
       id="email"
       name="email"
       type="email"
       onChange={formik.handleChange}
       value={formik.values.email}
     />
     {formik.errors.email ? <div className={classes.errors}>{formik.errors.email}</div> : null}

     <label htmlFor="password">Password</label>
     <input
     className={classes.Input}
       id="password"
       name="password"
       type="password"
       onChange={formik.handleChange}
       value={formik.values.password}
     />
     {formik.errors.password ? <div className={classes.errors}>{formik.errors.password}</div> : null}
     <button className={classes.Button}type="submit">{ isSignUp ?  'Sign Up': 'Sign In'}</button>
   </form>
   <p onClick={SignUpHandler}className={classes.switching}>Click here to switch to {isSignUp ?  'Sign In': 'Sign Up'}</p>
    </div>
);
}
const mapStateToProps = (state) => {
 return {
   error: state.authReducer.error
 }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email,password,isSignUp) => dispatch(action.auth(email,password,isSignUp))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Auth);
