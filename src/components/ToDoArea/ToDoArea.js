import React from 'react';
import * as action from '../../store/actions/index';
import { connect } from 'react-redux';
import classes from './ToDoArea.module.css';
import Input from '../../UI/Input/Input';
// import { Redirect } from 'react-router-dom';
// import { authStart } from '../../store/actions/authActions';

const ToDoArea = ({ onLogout, isAuth, location }) => {



  const logOutHandler = () => {
    onLogout();
    // let action = null;
    // if (!isAuth) {
    //   action = <Redirect to="/" />;
    // }
    // console.log(action);
    // return {
    //   action
    
    // }
    window.location.reload();
  };

  return (
    <div className={classes.ToDoArea}>
      <h2 className={classes.title}>
        What ToDo, Baby?{' '}
        <span
          onClick={logOutHandler}
          style={{
            textDecoration: 'underline',
            color: 'red',
            fontSize: '13px',
            cursor: 'pointer',
          }}
        >
          Logout
        </span>
      </h2>
      <Input />
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    isAuth: state.authReducer.localId !== null,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(action.logout()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ToDoArea);
