import React, { useState } from 'react';
import classes from './Input.module.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../Spinner/Spinner';
const Input = ({ onSendTodo, isLoading }) => {
  const [inputValue, setInputValue] = useState('');
  //   const [initialValue, setInitialValue] = useState('')

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(inputValue);
    onSendTodo(inputValue);
    setInputValue('');
  };
  const spinner = isLoading ? <Spinner /> : null;
  return (
    <>
      <form className={classes.Form} onSubmit={submitHandler}>
        <input
          value={inputValue}
          type="text"
          id="todo"
          name="todo"
          className={classes.ToDoInput}
          placeholder="I am listening...."
          onChange={(event) => setInputValue(event.target.value)}
        />
        <button className={classes.Button}>Hit me</button>
      </form>
      {spinner}
    </>
  );
};
const mapStateToProps = state => {
  return {
    isLoading: state.isLoading
    
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onSendTodo: (inputValue) => dispatch(actions.addTodoStart(inputValue)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Input);
