import * as actionTypes from '../actions/actionTypes';
const initialState = {
  isLoading: false,
  todos: [],
  error: null
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_TODO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        todos: [...action.todos],
      };
    case actionTypes.FETCH_TODO_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    case actionTypes.INITIALIZE_TODO: 
    return {
      ...state,
      isLoading: true
    }
    case actionTypes.ADD_TODO_SUCCESS:
      return {
        ...state,
        isLoading: false,
      }
      case actionTypes.ADD_TODO_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
      case actionTypes.DELETE_TODO_SUCCESS:
      return {
        ...state,
        isLoading: false,
      }
      case actionTypes.DELETE_TODO_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    default:
      return state;
  }
};

export default reducers;
