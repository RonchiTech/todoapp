import React, { useEffect, useCallback } from 'react';
import classes from './ListArea.module.css';
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
  const isDoneHandler = (id,isDone) => {
    console.log(id);
    onIsDone(id,isDone);
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
    console.log(key);
    return (
      <span key={key.id}>
        <li
          style={{textDecoration: key.objTodo.isDone ? 'line-through' : null,
        background: key.objTodo.isDone ? 'gray' : null}}
          onClick={()=>isDoneHandler(key.id,!key.objTodo.isDone)}
        >
          {key.objTodo.todo}
        </li>
        <button onClick={() => deleteHandler(key.id)}>x</button>
      </span>
    );
  });
  return (
    <div className={classes.ListArea}>
      <ul>
        {list}
        {console.log(mytodos)}
      </ul>
    </div>
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
    onIsDone: (id,isDone) => dispatch(actionTypes.isDoneStart(id,isDone)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListArea);
