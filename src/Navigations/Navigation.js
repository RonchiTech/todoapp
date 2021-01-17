import React from 'react';
import classes from './Navigation.module.css';
import { NavLink } from 'react-router-dom';
const Navigation = () => {
  const active = {
    color: '#fff'
  }
  const style={
    textDecoration: 'none',
    color: '#2A2D34'
  }
  return (
    <nav>
      <ul className={classes.NavList}>
      <NavLink exact  style={style} activeStyle={active} to='/'> <li>All</li></NavLink>
      <NavLink style={style} activeStyle={active} to='/todos'> <li>Todos</li></NavLink>
      <NavLink style={style} activeStyle={active} to='/done'><li>Done</li></NavLink>
      </ul>
    </nav>
  );
};

export default Navigation;
