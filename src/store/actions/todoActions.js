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
  // console.log(todos);
    // const arrTodo = [];
    // let idTodo = null;
    // let isDoneTodo = null;
    // for(let key in todos){
    //   // console.log('key',key);
    //   // console.log('todos',todos);
    //   arrTodo.push(todos[key].objTodo.todo);
    //   isDoneTodo = todos[key].objTodo.isDone
    //   idTodo= todos[key].id;
    //   // arrTodo.push(todos[key])
    // }
    // console.log('this is array todo', todos);
    // let arr = [];
    // for(let key in todos) {
    //   console.log(todos[key])
    //   arr.push({
    //     id: todos[key].id,
    //     isDone: todos[key].objTodo.isDone,
    //     todo: todos[key].objTodo.todo
    //   })
    // }
    // console.log('hey',arr);
    return {
        type: actionTypes.FETCH_TODO_SUCCESS,
        payload: todos
        // todo: arrTodo,
        // isDone: isDoneTodo,
        // id: idTodo
    }
}


export const addTodoStart = (todo) => {
  return dispatch => {
    dispatch(initializeTodo())
    const objTodo = {
      todo,
      isDone: false
    }
    axios.post('https://todoapp-a6d7d-default-rtdb.firebaseio.com/todo.json', {
      objTodo
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

export const isDoneStart = (id) => {
  return dispatch => {
    axios.patch(`https://todoapp-a6d7d-default-rtdb.firebaseio.com/todo/${id}/objTodo.json`,{
      isDone: 'true'
    }).then(response =>{
      console.log(response);
    }).catch(err => {
      console.log(err);
    })
  }
}