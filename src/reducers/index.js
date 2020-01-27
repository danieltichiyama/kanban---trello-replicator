import { GET_BOARDS, GET_BOARD_DATA } from "../actions";

let initialState = {};

const reducer = (state = initialState, action) => {
  console.log("action.payload: ", action.payload, "action.type", action.type);

  switch (action.type) {
    case GET_BOARD_DATA:
      return Object.assign({}, state, { boardData: action.payload });

    case GET_BOARDS:
      return Object.assign({}, state, { boards: action.payload });

    default:
      return state;
  }
};

export default reducer;
