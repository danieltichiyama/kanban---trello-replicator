import { LOAD_CARDS } from "../actions";
import { ADD_CARD } from "../actions";

let initialState = { cards: [] };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CARDS:
      return Object.assign({}, state, { cards: action.payload });

    case ADD_CARD:
      return Object.assign({}, state, {
        cards: [...state.cards, action.payload]
      });

    default:
      return state;
  }
};

export default reducer;
