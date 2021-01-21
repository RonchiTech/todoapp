import React, { useEffect, useCallback } from 'react';
import { Route } from 'react-router-dom';
import classes from './ListArea.module.css';
import Navigation from '../../Navigations/Navigation';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/index';
const ListArea = React.memo((props) => {
  const { onFetchTodo, mytodos, onDeleteTodo, onIsDone, localId } = props;
  useEffect(() => {
    onFetchTodo(localId);
  }, [onFetchTodo,localId]);

  const deleteHandler = useCallback(
    (id) => {
      onDeleteTodo(id,localId);
    },
    [onDeleteTodo,localId]
  );
  const isDoneHandler = (id, isDone, ) => {
    // console.log(id);
    onIsDone(id, isDone, localId);
  };
  // console.log('mytodos', mytodos);
  const listAll = mytodos.map((key) => {
    // console.log(key);
    return (
      <span key={key.id}>
        <li
          style={{
            textDecoration: key.isDone ? 'line-through' : null,
            background: key.isDone ? '#DADBE6' : null,
            color: key.isDone ? '#2A2D34' : null,
          }}
          className={classes.Todolist}
          onClick={() => isDoneHandler(key.id, !key.isDone)}
        >
          {key.todo}
        </li>
        <button onClick={() => deleteHandler(key.id)}>x</button>
      </span>
    );
  });

  const listTodo = mytodos
    .filter((todo) => todo.isDone !== true)
    .map((key) => {
      return (
        <span key={key.id}>
          <li
            style={{
              textDecoration: key.isDone ? 'line-through' : null,
              background: key.isDone ? '#DADBE6' : null,
              color: key.isDone ? '#2A2D34' : null,
            }}
            className={classes.Todolist}
            onClick={() => isDoneHandler(key.id, !key.isDone)}
          >
            {key.todo}
          </li>
          <button onClick={() => deleteHandler(key.id)}>x</button>
        </span>
      );
    });
  const listDone = mytodos
    .filter((todo) => todo.isDone !== false)
    .map((key) => {
      return (
        <span key={key.id}>
          <li
            style={{
              textDecoration: key.isDone ? 'line-through' : null,
              background: key.isDone ? '#DADBE6' : null,
              color: key.isDone ? '#2A2D34' : null,
            }}
            className={classes.Todolist}
            onClick={() => isDoneHandler(key.id, !key.isDone)}
          >
            {key.todo}
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
    localId: state.authReducer.localId
    // isDone: state.mytodos.isDone,
    // id: state.mytodos
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onFetchTodo: (localId) => dispatch(actionTypes.fetchTodoStart(localId)),
    onDeleteTodo: (id,localId) => dispatch(actionTypes.deleteTodoStart(id,localId)),
    onIsDone: (id, isDone, localId) => dispatch(actionTypes.isDoneStart(id, isDone, localId)),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListArea);
