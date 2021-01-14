import * as actionTypes from './actionTypes';
import axios from 'axios';

export const initializeTodo = () => {
  return {
    type: actionTypes.INITIALIZE_TODO
  }
}

export const fetchTodoStart = () => {
  return dispatch => {
    dispatch(initializeTodo())
    axios.get('https://todoapp-a6d7d-default-rtdb.firebaseio.com/todo.json')
    .then(response => {
      const list = [];
      for(let key in response.data){
        list.push({
          ...response.data[key],
          id: key
        });
      }
      dispatch(fetchTodoSuccess(list))
    })
    .catch(error => {
      dispatch(fetchTodoFailed(error))
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
        todos
        
    }
}


export const addTodoStart = (todo) => {
  return dispatch => {
    dispatch(initializeTodo())
    axios.post('https://todoapp-a6d7d-default-rtdb.firebaseio.com/todo.json', {
      todo
    }).then(response => {
      dispatch(addTodoSuccess())
      dispatch(fetchTodoStart())
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

export const deleteTodoStart = (id) => {
  return dispatch => {
    dispatch(initializeTodo())
    axios.delete(`https://todoapp-a6d7d-default-rtdb.firebaseio.com/todo/${id}/.json`)
    .then(response => {
      dispatch(deleteTodoSuccess())
      dispatch(fetchTodoStart())
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

export const isDone = () => {
  return {
    type: actionTypes.IS_DONE
  }
}