import { GET_BOARDS } from "../actions";

let initialState = {};

const reducer = (state = initialState, action) => {
  console.log("action.payload: ", action.payload, "action.type", action.type);

  switch (action.type) {
    case GET_BOARDS:
      return Object.assign({}, { boards: action.payload });

    default:
      return state;
  }
};

export default reducer;
