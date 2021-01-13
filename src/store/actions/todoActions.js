import * as actionTypes from './actionTypes';
import axios from 'axios';

export const initializeTodo = () => {
  return {
    type: actionTypes.INITIALIZE_TODO
  }
}

export const fetchTodo = () => {
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
      dispatch(storeTodo(list))
    })
    .catch(error => {
      dispatch(errorTodo(error))
    })
  }
}

export const storeTodo = (todos) => {
    return {
        type: actionTypes.STORE_TODO,
        todos
        
    }
}

export const errorTodo = (error) => {
  return {
    type: actionTypes.ERROR_TODO,
    error
  }
}
export const addTodo = (todos) => {
  return dispatch => {
    dispatch(initializeTodo())
    axios.post('https://todoapp-a6d7d-default-rtdb.firebaseio.com/todo.json', {
      name: todos
    }).then(response => {
      // const list = [];
      // for(let key in response.data){
      //   list.push({
      //     ...response.data[key],
      //     id: key
      //   });
      // }
      // console.log(list);
      // dispatch(storeTodo(list))
      dispatch(fetchTodo())
    })
  };
};


export const deleteTodo = (id) => {
  return dispatch => {
    dispatch(initializeTodo())
    axios.delete(`https://todoapp-a6d7d-default-rtdb.firebaseio.com/todo/${id}/.json`)
    .then(response => {
      // const list = [];
      // for(let key in response.data){
      //   list.push({
      //     ...response.data[key],
      //     id: key
      //   });
      // }
      // dispatch(storeToDo(list))
      dispatch(fetchTodo())
    })
    .catch(error => {
      dispatch(errorTodo(error))
    })
  }
}
