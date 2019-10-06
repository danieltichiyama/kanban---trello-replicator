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
  console.log("action.payload: ", action.payload, "action.type", action.type); //leave in for future checks

  switch (action.type) {
    case LOAD_CARDS:
      return Object.assign({}, state, { cards: action.payload });

    case ADD_CARD:
      return Object.assign({}, state, {
        cards: [...state.cards, action.payload]
      });

    case EDIT_CARD:
      let cards = state.cards.map(element => {
        if (element.id !== action.payload.id) {
          return element;
        } else {
          return action.payload;
        }
      });
      return Object.assign({}, state, {
        cards: [...cards, action.payload]
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
