import * as actionTypes from '../actions/actionTypes';
const initialState = {
  isLoading: false,

  mytodos: [],

  error: null,
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_TODO_SUCCESS:
      // console.log('reducer',action.payload);
      // let id,todo,isDone = null;
      // const arr = [];
      // action.payload.forEach(key => {
      //   // id= key.id;
      //   // todo= key.objTodo.todo;
      //   // isDone= key.objTodo.isDone;
      //   arr.push(key);
      // })
      // console.log(arr);
      return {
        ...state,
        mytodos: [...action.payload],
        isLoading:false
      };

    case actionTypes.FETCH_TODO_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case actionTypes.INITIALIZE_TODO:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.ADD_TODO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isDone: false,
      };
    case actionTypes.ADD_TODO_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case actionTypes.DELETE_TODO_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case actionTypes.DELETE_TODO_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    // case actionTypes.IS_DONE:
    //   return {
    //     ...state,
    //     isDone: true,
    //   };
    default:
      return state;
  }
};

export default reducers;
