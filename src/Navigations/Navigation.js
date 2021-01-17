import React from 'react';
import classes from './Navigation.module.css';
import { NavLink } from 'react-router-dom';
const Navigation = () => {
  return (
    <nav>
      <ul className={classes.NavList}>
      <NavLink to='/'> <li>All</li></NavLink>
      <NavLink to='/'> <li>Todos</li></NavLink>
      <NavLink to='/'><li>Done</li></NavLink>
      </ul>
    </nav>
  );
};

export default Navigation;
