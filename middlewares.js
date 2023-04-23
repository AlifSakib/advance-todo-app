const fetch = require("node-fetch");

const delayActionsMiddleware = (store) => (next) => (action) => {
  if (action.type === "todos/todoAdded") {
    console.log("I am delaying you!");

    setTimeout(() => {
      next(action);
    }, 2000);

    return;
  }

  return next(action);
};

const fetchTodoMiddleware = (store) => (next) => async (action) => {
  if (action.type === "todos/fetchTodos") {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/todos?_limit=5"
    );
    const todos = (aawait = response.json());
    store.dispatch({
      type: "todos/todoLoaded",
      payload: todos,
    });

    return;
  }

  return next(action);
};

module.exports = {
  delayActionsMiddleware,
};
