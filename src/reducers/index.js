import { LOAD_CARDS } from "../actions";

let initialState = { cards: [] };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CARDS:
      return Object.assign({}, state, { cards: action.payload });

    default:
      return state;
  }
};

export default reducer;
