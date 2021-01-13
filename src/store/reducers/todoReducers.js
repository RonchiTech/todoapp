import * as actionTypes from '../actions/actionTypes';
const initialState = {
  isLoading: false,
  todos: [],
  error: null
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.STORE_TODO:
      return {
        ...state,
        isLoading: false,
        todos: [...action.todos],
      };
    case actionTypes.INITIALIZE_TODO: 
    return {
      ...state,
      isLoading: true
    }
    case actionTypes.ERROR_TODO:
      return {
        ...state,
        error: action.error,
        isLoading: false
      }
    default:
      return state;
  }
};

export default reducers;
