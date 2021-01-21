import * as actionTypes from './actionTypes';
import axios from 'axios';

export const initializeTodo = () => {
  return {
    type: actionTypes.INITIALIZE_TODO
  }
}

export const fetchTodoStart = (localId) => {
  
  return dispatch => {
    dispatch(initializeTodo())
    axios.get(`https://todoapp-a6d7d-default-rtdb.firebaseio.com/${localId}/todo.json`)
    .then(response => {
      
      const list = [];
      for(let key in response.data){
        // console.log(key);
        list.push({
          ...response.data[key],
          id: key,
          // todo: response.data[key].objTodo.todo,
          // isDone: response.data[key].objTodo.isDone
        });
      }
      // console.log(list);
      dispatch(fetchTodoSuccess(list))
    })
    .catch(error => {
      console.log(error);
      dispatch(fetchTodoFailed(error.toString()))
    })
  }
}

export const fetchTodoFailed = (error) => {
  return {
    type: actionTypes.FETCH_TODO_FAILED,
    error
  }
}
export const fetchTodoSuccess = (todos) => {
    return {
        type: actionTypes.FETCH_TODO_SUCCESS,
        payload: todos
        // todo: arrTodo,
        // isDone: isDoneTodo,
        // id: idTodo
    }
}


export const addTodoStart = (todo,localId) => {
  return dispatch => {
    dispatch(initializeTodo())
  
    axios.post(`https://todoapp-a6d7d-default-rtdb.firebaseio.com/${localId}/todo.json`, {
      todo,
      isDone: false
    }).then(response => {
      dispatch(addTodoSuccess())
      dispatch(fetchTodoStart(localId))
    }).catch(error => {
      dispatch(addTodoFailed(error))
    })
  };
};
export const addTodoSuccess = () => {
  return { 
    type: actionTypes.ADD_TODO_SUCCESS
  }
}

export const addTodoFailed = (error) => {
  return{
    type: actionTypes.ADD_TODO_FAILED,
    error
  }
}

export const deleteTodoStart = (id,localId) => {
  return dispatch => {
    dispatch(initializeTodo())
    axios.delete(`https://todoapp-a6d7d-default-rtdb.firebaseio.com/${localId}/todo/${id}/.json`)
    .then(response => {
      dispatch(deleteTodoSuccess())
      dispatch(fetchTodoStart(localId))
    })
    .catch(error => {
      dispatch(deleteTodoFailed(error))
    })
  }
}

export const deleteTodoSuccess = () => {
  return {
    type: actionTypes.DELETE_TODO_SUCCESS
  }
}

export const deleteTodoFailed = (error) => {
  return {
    type: actionTypes.DELETE_TODO_FAILED,
    error
  }
}

export const isDoneStart = (id,isDone,localId) => {
  return dispatch => {
    dispatch(initializeTodo())
    axios.patch(`https://todoapp-a6d7d-default-rtdb.firebaseio.com/${localId}/todo/${id}/.json`,{
      isDone
    }).then(response =>{
     dispatch(fetchTodoStart(localId));
    }).catch(err => {
      console.log(err);
    })
  }
}