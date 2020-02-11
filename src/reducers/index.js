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

let initialState = {
  labelsObjINIT: {
    //this needs to happen on the component level, to prevent cross contamination
    "#218b8d": { color: "#218b8d" },
    "#6bcdcc": { color: "#6bcdcc" },
    "#f8e559": { color: "#f8e559" },
    "#ef7124": { color: "#ef7124" },
    "#90dc9e": { color: "#90dc9e" },
    "#473e3e": { color: "#473e3e" }
  }
};

const reducer = (state = initialState, action) => {
  console.log("action.payload: ", action.payload, "action.type", action.type);

  switch (action.type) {
    case UPDATE_CARD:
      let updateCardInList = [...state.lists];
      for (let i = 0; i < updateCardInList.length; i++) {
        if (updateCardInList[i].id === action.payload.list_id) {
          for (let j = 0; j < updateCardInList[i].cards.length; j++) {
            if (updateCardInList[i].cards[j].id === action.payload.id) {
              updateCardInList[i].cards.splice(j, 1, action.payload);
              console.log("cards updated");
              return Object.assign({}, state, { lists: updateCardInList });
            }
          }
          updateCardInList[i].cards.push(action.payload);
          console.log("cards updated");
          return Object.assign({}, state, { lists: updateCardInList });
        }
      }
      break;

    case UPDATE_LABEL:
      let updateMutableLabels = [...state.labels];
      for (let i = 0; i < updateMutableLabels.length; i++) {
        if (updateMutableLabels[i].id === action.payload.id) {
          updateMutableLabels.splice(i, 1, action.payload);
          return Object.assign({}, state, { labels: updateMutableLabels });
        }
      }
      break;

    case UPDATE_LIST:
      let updateMutableLists = [...state.lists];
      for (let i = 0; i < updateMutableLists.length; i++) {
        if (updateMutableLists[i].id === action.payload.id) {
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
      let createMutableLabels = [...state.labels];
      for (let i = 0; i < createMutableLabels.length; i++) {
        if (createMutableLabels[i].id === action.payload.id) {
          createMutableLabels.splice(i, 1, action.payload);
          return Object.assign({}, state, { labels: createMutableLabels });
        }
      }
      break;

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
      let getBoardDataLabels = [...action.payload.labels];
      for (let i = 0; i < getBoardDataLabels.length; i++) {
        state.labelsObjINIT[getBoardDataLabels[i].color] =
          getBoardDataLabels[i];
      }
      action.payload.labels = Object.values(state.labelsObjINIT);

      return Object.assign({}, state, action.payload);

    case GET_BOARDS:
      return Object.assign({}, state, { boards: action.payload });

    default:
      return state;
  }
};

export default reducer;
