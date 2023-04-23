const { createStore, applyMiddleware } = require("redux");

const {
  delayActionsMiddleware,
  fetchTodoMiddleware,
} = require("./middlewares");

// initialState

const initialState = {
  todos: [],
};

// reducer

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "todos/todoAdded":
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            title: action.payload,
          },
        ],
      };

    case "todos/todoLoaded":
      return {
        ...state,
        todos: [...state.todos, ...action.payload],
      };

    default:
      return state;
  }
};

//store
const store = createStore(
  todoReducer,
  applyMiddleware(delayActionsMiddleware, fetchTodoMiddleware)
);

// subscribe to state changes

store.subscribe(() => {
  console.log(store.getState());
});

// dispatch actions

// store.dispatch({
//   type: "todos/todoAdded",
//   payload: "Learn about actions",
// });

store.dispatch({
  type: "todos/fetchTodos",
});
