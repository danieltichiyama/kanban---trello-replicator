import { GET_BOARDS } from "../actions";

let initialState = {
  boards: []
};

const reducer = (state = initialState, action) => {
  console.log("action.payload: ", action.payload, "action.type", action.type);

  switch (action.type) {
    case GET_BOARDS:
      return Object.assign({}, action.payload);

    default:
      return state;
  }
};

export default reducer;
