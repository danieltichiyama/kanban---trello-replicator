import {
  GET_BOARDS,
  GET_BOARD_DATA,
  CREATE_BOARD,
  CREATE_LIST,
  CREATE_CARD,
  CREATE_LABEL
} from "../actions";

let initialState = {
  phUser: 1
};

const reducer = (state = initialState, action) => {
  console.log("action.payload: ", action.payload, "action.type", action.type);

  switch (action.type) {
    case CREATE_LABEL:
      let mutableLabels = [...state.labels];
      mutableLabels.push(action.payload);
      return Object.assign({}, state, { labels: mutableLabels });

    case CREATE_CARD:
      let addCardToList = [...state.lists];
      for (let i = 0; i < addCardToList.length; i++) {
        if (addCardToList[i].id === action.payload.list_id) {
          let newList = Object.assign({}, addCardToList[i]);
          newList.cards.push(action.payload);
          addCardToList[i] = newList;
          return Object.assign({}, state, { lists: addCardToList });
        }
      }
      break;

    case CREATE_LIST:
      let mutableLists = [...state.lists];
      mutableLists.push(action.payload);
      return Object.assign({}, state, { lists: mutableLists });

    case CREATE_BOARD:
      let boards = [...state.boards];
      boards.push(action.payload);
      return Object.assign({}, state, { boards: boards });

    case GET_BOARD_DATA:
      return Object.assign({}, state, action.payload);

    case GET_BOARDS:
      return Object.assign({}, state, { boards: action.payload });

    default:
      return state;
  }
};

export default reducer;
