import React, { useEffect, useCallback, useState } from 'react';
import classes from './ListArea.module.css';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/index';

const ListArea =  React.memo((props) => {
  const { onFetchTodo, todos, onDeleteTodo } = props;
  const [isDone, setIsDone] = useState(false)
  useEffect(() => {
    onFetchTodo();
  }, [onFetchTodo]);

  const deleteHandler = useCallback(
    (id) => {
      onDeleteTodo(id);
    },
    [onDeleteTodo]
  );
  const isDoneHandler = () => {
    setIsDone(!isDone)
  }
  const style = isDone ? {
    textDecoration: 'line-through'
  }  : null
  const classList = ({
    list: true,
    listDone: isDone 
  })
  let list = todos.map((todo) => {
    return (
      <span key={todo.id}>
        <li className={classList} onClick={isDoneHandler} style={style}>{todo.todo}</li>
        <button onClick={() => deleteHandler(todo.id)}>x</button>
      </span>
    );
  });
  return (
    <div className={classes.ListArea}>
      <ul>{list}</ul>
    </div>
  );
});
const mapStateToProps = (state) => {
  return {
    todos: state.todos,
    isLoading: state.isLoading,
    isDone: state.isDone
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onFetchTodo: () => dispatch(actionTypes.fetchTodoStart()),
    onDeleteTodo: (id) => dispatch(actionTypes.deleteTodoStart(id)),
    onIsDone: () => dispatch(actionTypes.isDone())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListArea);
