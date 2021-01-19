import React, { useEffect, useCallback } from 'react';
import { Route } from 'react-router-dom';
import classes from './ListArea.module.css';
import Navigation from '../../Navigations/Navigation';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/index';
const ListArea = React.memo((props) => {
  const { onFetchTodo, mytodos, onDeleteTodo, onIsDone } = props;
  useEffect(() => {
    onFetchTodo();
  }, [onFetchTodo]);

  const deleteHandler = useCallback(
    (id) => {
      onDeleteTodo(id);
    },
    [onDeleteTodo]
  );
  const isDoneHandler = (id, isDone) => {
    // console.log(id);
    onIsDone(id, isDone);
  };
  // console.log('mytodos', mytodos);
  const listAll = mytodos.map((key) => {
    // console.log(key);
    return (
      <span key={key.id}>
        <li
          style={{
            textDecoration: key.objTodo.isDone ? 'line-through' : null,
            background: key.objTodo.isDone ? '#DADBE6' : null,
            color: key.objTodo.isDone ? '#2A2D34' : null,
          }}
          className={classes.Todolist}
          onClick={() => isDoneHandler(key.id, !key.objTodo.isDone)}
        >
          {key.objTodo.todo}
        </li>
        <button onClick={() => deleteHandler(key.id)}>x</button>
      </span>
    );
  });

  const listTodo = mytodos
    .filter((todo) => todo.objTodo.isDone !== true)
    .map((key) => {
      return (
        <span key={key.id}>
          <li
            style={{
              textDecoration: key.objTodo.isDone ? 'line-through' : null,
              background: key.objTodo.isDone ? '#DADBE6' : null,
              color: key.objTodo.isDone ? '#2A2D34' : null,
            }}
            className={classes.Todolist}
            onClick={() => isDoneHandler(key.id, !key.objTodo.isDone)}
          >
            {key.objTodo.todo}
          </li>
          <button onClick={() => deleteHandler(key.id)}>x</button>
        </span>
      );
    });
  const listDone = mytodos
    .filter((todo) => todo.objTodo.isDone !== false)
    .map((key) => {
      return (
        <span key={key.id}>
          <li
            style={{
              textDecoration: key.objTodo.isDone ? 'line-through' : null,
              background: key.objTodo.isDone ? '#DADBE6' : null,
              color: key.objTodo.isDone ? '#2A2D34' : null,
            }}
            className={classes.Todolist}
            onClick={() => isDoneHandler(key.id, !key.objTodo.isDone)}
          >
            {key.objTodo.todo}
          </li>
          <button onClick={() => deleteHandler(key.id)}>x</button>
        </span>
      );
    });

  // console.log('remaining: ',listTodo);
  return (
    <div className={classes.ListArea}>
      <Navigation />
      <ul className={classes.List}>
        <Route exact path="/" render={() => listAll} />
        <Route path="/todos" render={() => listTodo} />
        <Route path="/done" render={() => listDone} />
      </ul>
    </div>
  );
});

const mapStateToProps = (state) => {
  return {
    mytodos: state.todoReducer.mytodos,
    isLoading: state.todoReducer.isLoading,
    // isDone: state.mytodos.isDone,
    // id: state.mytodos
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onFetchTodo: () => dispatch(actionTypes.fetchTodoStart()),
    onDeleteTodo: (id) => dispatch(actionTypes.deleteTodoStart(id)),
    onIsDone: (id, isDone) => dispatch(actionTypes.isDoneStart(id, isDone)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListArea);
