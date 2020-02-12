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
      let updateCards = [...state.cards];
      for (let i = 0; i < updateCards.length; i++) {
        if (updateCards[i].id === action.payload.id) {
          updateCards.splice(i, 1, action.payload);
          return Object.assign({}, state, { cards: updateCards });
        }
      }
      break;

    case UPDATE_LABEL:
      let updateLabel = [...state.labels];
      for (let i = 0; i < updateLabel.length; i++) {
        if (updateLabel[i].id === action.payload.id) {
          updateLabel.splice(i, 1, action.payload);
          return Object.assign({}, state, { labels: updateLabel });
        }
      }
      break;

    case UPDATE_LIST:
      let updateList = [...state.lists];
      for (let i = 0; i < updateList.length; i++) {
        if (updateList[i].id === action.payload.id) {
          updateList.splice(i, 1, action.payload);
          return Object.assign({}, state, { lists: updateList });
        }
      }
      break;

    case UPDATE_BOARD:
      let updateBoard = [...state.boards];
      for (let i = 0; i < updateBoard.length; i++) {
        if (updateBoard[i].id === action.payload.id) {
          updateBoard.splice(i, 1, action.payload);
          return Object.assign({}, state, { boards: updateBoard });
        }
      }
      break;

    case CREATE_LABEL:
      let createLabel = [...state.labels];
      for (let i = 0; i < createLabel.length; i++) {
        if (createLabel[i].id === action.payload.id) {
          createLabel.splice(i, 1, action.payload);
          return Object.assign({}, state, { labels: createLabel });
        }
      }
      break;

    case CREATE_CARD:
      let createCard = [...state.cards];
      createCard.push(action.payload);
      return Object.assign({}, state, { cards: createCard });

    case CREATE_LIST:
      let createList = [...state.lists];
      createList.push(action.payload);
      return Object.assign({}, state, { lists: createList });

    case CREATE_BOARD:
      let createBoard = [...state.boards];
      createBoard.push(action.payload);
      return Object.assign({}, state, { boards: createBoard });

    case GET_BOARD_DATA:
      return Object.assign({}, state, action.payload);

    case GET_BOARDS:
      return Object.assign({}, state, { boards: action.payload });

    default:
      return state;
  }
};

export default reducer;
