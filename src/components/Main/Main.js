import React from 'react';
import classes from './Main.module.css';
import ToDoArea from '../ToDoArea/ToDoArea';
import ListArea from '../ListArea/ListArea';
import Auth from '../../auth/auth'

const Main = () => {
  
  return (
    <div className={classes.Main}>
      {/* <ToDoArea/>
      <ListArea/> */}
      <Auth/>
    </div>
  );
};
export default Main;
