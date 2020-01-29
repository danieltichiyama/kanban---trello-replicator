import { GET_BOARDS, GET_BOARD_DATA, CREATE_BOARD } from "../actions";

let initialState = {
  phUser: 1
};

const reducer = (state = initialState, action) => {
  console.log("action.payload: ", action.payload, "action.type", action.type);

  switch (action.type) {
    case CREATE_BOARD:
      let boards = [...state.boards];
      boards.push(action.payload);
      return Object.assign({}, state, { boards: boards });

    case GET_BOARD_DATA:
      return Object.assign({}, state, { boardData: action.payload });

    case GET_BOARDS:
      return Object.assign({}, state, { boards: action.payload });

    default:
      return state;
  }
};

export default reducer;
