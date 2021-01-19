import React from 'react';
import classes from './auth.module.css';
import { useFormik  } from 'formik';

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
const Auth = () => {
    const FormHandler = (values) => {
        console.log(values);
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
      <h2 className={classes.title}>Ronchi Todo</h2>
     <form onSubmit={formik.handleSubmit}>
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
       id="email"
       name="email"
       type="email"
       onChange={formik.handleChange}
       value={formik.values.email}
     />
     {formik.errors.email ? <div className={classes.errors}>{formik.errors.email}</div> : null}

     <label htmlFor="password">Password</label>
     <input
       id="password"
       name="password"
       type="password"
       onChange={formik.handleChange}
       value={formik.values.password}
     />
     {formik.errors.password ? <div className={classes.errors}>{formik.errors.password}</div> : null}

     <button type="submit">Submit</button>
   </form>
    </div>
);
}
export default Auth;
