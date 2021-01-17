import React, { useEffect, useCallback } from 'react';
import classes from './ListArea.module.css';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/index';
import Navigation from '../../Navigations/Navigation';
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
  // const style = itsDone
  //   ? {
  //       textDecoration: 'line-through',
  //     }
  //   : null;
  // const classList = {
  //   list: true,
  //   listDone: itsDone,
  // };

  const list = mytodos.map((key) => {
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
  return (
    <React.Fragment>
      <div className={classes.ListArea}>
        <Navigation />
        <ul className={classes.List}>
          {list}
          {/* {console.log(mytodos)} */}
        </ul>
      </div>
    </React.Fragment>
  );
});
const mapStateToProps = (state) => {
  return {
    mytodos: state.mytodos,
    isLoading: state.isLoading,
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
