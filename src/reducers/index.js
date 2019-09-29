import { CASE_1, CASE_2 } from "../actions"; //defined in your actions/index.js

const reducer = (state = [], action) => {
  switch (action.type) {
    case CASE_1:
      return "returnsSomething"; //depending on the case;

    case CASE_2:
      return "returnsSomething"; //depending on the case;

    default:
      return state;
  }
};

export default reducer; //exports to src/index.js
