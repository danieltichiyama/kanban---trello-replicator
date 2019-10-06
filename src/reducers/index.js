import { LOAD_CARDS, ADD_CARD, EDIT_CARD, GET_CARD } from "../actions";

let initialState = {
  cards: [],
  editor: {
    title: "",
    body: "",
    id: undefined,
    priority_id: undefined,
    status_id: undefined,
    created_by: undefined,
    assigned_to: undefined
  }
};

const reducer = (state = initialState, action) => {
  console.log("reducer, action.payload", action.payload);

  switch (action.type) {
    case LOAD_CARDS:
      return Object.assign({}, state, { cards: action.payload });

    case ADD_CARD:
      return Object.assign({}, state, {
        cards: [...state.cards, action.payload]
      });

    case EDIT_CARD:
      return Object.assign({}, state, {
        cards: [...state.cards, action.payload]
      });

    case GET_CARD:
      let card;
      for (let i = 0; i < state.cards.length; i++) {
        if (state.cards[i].id === action.payload) {
          card = state.cards[i];
        }
      }
      return Object.assign({}, state, { editor: card });

    default:
      return state;
  }
};

export default reducer;
