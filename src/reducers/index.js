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
  UPDATE_LABEL,
  UPDATE_CARD_IN_STORE,
  UPDATE_LIST_IN_STORE,
  LOGIN_USER,
  LOGOUT_USER,
  REGISTER_USER
} from "../actions";

let initialState = {
  initLabels: {
    "#61be4f": { color: "#61be4f" },
    "#f2d600": { color: "#f2d600" },
    "#ff9f1a": { color: "#ff9f1a" },
    "#eb5946": { color: "#eb5946" },
    "#c377e0": { color: "#c377e0" },
    "#0079bf": { color: "#0079bf" },
    "#00c2e0": { color: "#00c2e0" },
    "#ff77cb": { color: "#ff77cb" },
    "#344562": { color: "#344562" }
  }
};

const reducer = (state = initialState, action) => {
  console.log("action.payload: ", action.payload, "action.type", action.type);

  switch (action.type) {
    case LOGIN_USER:
      if (localStorage.getItem("user")) {
        localStorage.removeItem("user");
      }
      sessionStorage.setItem("user", action.payload);
      return state;

    case LOGOUT_USER:
      if (sessionStorage.getItem("user")) {
        sessionStorage.removeItem("user");
      }

      return state;

    case REGISTER_USER:
      localStorage.setItem("registeredUser", {
        username: action.payload.username
      });

      return state;

    case UPDATE_LIST_IN_STORE:
      let updateListsInStore = [...state.lists];

      for (let i = 0; i < updateListsInStore.length; i++) {
        if (updateListsInStore[i].id === action.payload.id) {
          updateListsInStore[i] = Object.assign(
            {},
            { ...updateListsInStore[i] },
            { ...action.payload }
          );
        }
      }

      return Object.assign({}, state, { lists: updateListsInStore });

    case UPDATE_CARD_IN_STORE:
      let updateCardsInStore = [...state.cards];
      for (let i = 0; i < updateCardsInStore.length; i++) {
        if (updateCardsInStore[i].id === action.payload.id) {
          updateCardsInStore[i] = Object.assign(
            {},
            { ...updateCardsInStore[i] },
            { ...action.payload }
          );
        }
      }

      return Object.assign({}, state, { cards: updateCardsInStore });

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
      let updateLabel = { ...state.labels };
      updateLabel[action.payload.color] = action.payload;
      return Object.assign({}, state, { labels: updateLabel });

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
      if (state.boards) {
        let updateBoard = [...state.boards];
        for (let i = 0; i < updateBoard.length; i++) {
          if (updateBoard[i].id === action.payload.id) {
            updateBoard.splice(i, 1, action.payload);

            return Object.assign({}, state, { boards: updateBoard });
          }
        }
      }

      return Object.assign({}, state, { ...action.payload });

    case CREATE_LABEL:
      let createLabel = { ...state.labels };
      createLabel[action.payload.color] = action.payload;
      return Object.assign({}, state, { labels: createLabel });

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
      let getBoardDataInitLabels = { ...state.initLabels };
      let { labels } = action.payload;

      for (let i = 0; i < labels.length; i++) {
        getBoardDataInitLabels[labels[i].color] = labels[i];
      }

      if (action.payload.lists) {
        let getBoardDataLists = [...action.payload.lists];
        action.payload.lists = getBoardDataLists.sort((a, b) => {
          return parseFloat(a.position) - parseFloat(b.position);
        });
      }

      action.payload.labels = getBoardDataInitLabels;
      return Object.assign({}, state, action.payload);

    case GET_BOARDS:
      return Object.assign({}, state, { boards: action.payload });

    default:
      return state;
  }
};

export default reducer;
