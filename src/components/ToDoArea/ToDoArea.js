import React from 'react';
import classes from './ToDoArea.module.css';
import Input from '../../UI/Input/Input';

const ToDoArea = ({onsubmit}) => {
  return (
  <div className={classes.ToDoArea}>

      <h2 className={classes.title}>What ToDo, Baby?</h2>
        <Input/>
  </div>
  );
};

export default ToDoArea;
