import React, { useEffect, useCallback } from 'react';
import classes from './ListArea.module.css';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/index';

const ListArea = (props) => {
  const { onFetchTodo, todos, onDeleteTodo } = props;
  useEffect(() => {
    onFetchTodo();
  }, [onFetchTodo]);

  const deleteHandler = useCallback((id) => {
    onDeleteTodo(id);
  },[onDeleteTodo]);
 
  let list = todos.map((todo) => {
    return (
      <li key={todo.id} onClick={() => deleteHandler(todo.id)}>
        {todo.todo}
      </li>
    );
  });
  return (
    <div className={classes.ListArea}>
      <ul>{list}</ul>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    todos: state.todos,
    isLoading: state.isLoading
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onFetchTodo: () => dispatch(actionTypes.fetchTodoStart()),
    onDeleteTodo: (id) => dispatch(actionTypes.deleteTodoStart(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListArea);
