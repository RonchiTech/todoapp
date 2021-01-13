import React from 'react';
import classes from './Main.module.css';
import ToDoArea from '../ToDoArea/ToDoArea';
import ListArea from '../ListArea/ListArea';
const Main = () => {
  
  return (
    <div className={classes.Main}>
      <ToDoArea/>
      <ListArea/>
    </div>
  );
};
export default Main;
