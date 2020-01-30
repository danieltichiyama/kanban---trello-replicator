import {
  GET_BOARDS,
  GET_BOARD_DATA,
  CREATE_BOARD,
  CREATE_LIST,
  CREATE_CARD,
  CREATE_LABEL,
  UPDATE_BOARD,
  UPDATE_LIST,
  UPDATE_CARD,
  UPDATE_LABEL
} from "../actions";

let initialState = {};

const reducer = (state = initialState, action) => {
  console.log("action.payload: ", action.payload, "action.type", action.type);
  switch (action.type) {
    case UPDATE_CARD:
      return state;

    case UPDATE_LABEL:
      return state;

    case UPDATE_LIST:
      let updateMutableLists = [...state.lists];
      for (let i = 0; i < updateMutableLists.length; i++) {
        if (updateMutableLists[i].id === action.paylaod.id) {
          updateMutableLists.splice(i, 1, action.payload);
          return Object.assign({}, state, { lists: updateMutableLists });
        }
      }
      break;

    case UPDATE_BOARD:
      let mutableBoards = [...state.boards];
      console.log(mutableBoards);
      for (let i = 0; i < mutableBoards.length; i++) {
        if (mutableBoards[i].id === action.payload.id) {
          mutableBoards.splice(i, 1, action.payload);
          return Object.assign({}, state, { boards: mutableBoards });
        }
      }
      break;

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
