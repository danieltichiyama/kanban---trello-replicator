//action types
export const GET_BOARDS = "GET_BOARDS";
export const GET_BOARD_DATA = "GET_BOARD_DATA";
export const CREATE_BOARD = "CREATE_BOARD";
export const CREATE_LIST = "CREATE_LIST";

const postConfig = data => {
  return {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json"
    }
  };
};

export const actionsCreateList = formData => async dispatch => {
  await fetch(`/api/lists/new`, postConfig(formData))
    .then(response => {
      return response.json();
    })
    .then(json => {
      return dispatch({
        type: CREATE_LIST,
        payload: json
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const actionsCreateBoard = formData => async dispatch => {
  await fetch(`/api/boards/new`, postConfig(formData))
    .then(response => {
      return response.json();
    })
    .then(json => {
      return dispatch({
        type: CREATE_BOARD,
        payload: json
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const actionsGetBoardData = boardID => async dispatch => {
  await fetch(`/api/boards/${boardID}`)
    .then(response => {
      return response.json();
    })
    .then(json => {
      return dispatch({
        type: GET_BOARD_DATA,
        payload: json
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const actionsGetBoards = userID => async dispatch => {
  await fetch(`/api/boards/all/${userID}`)
    .then(response => {
      return response.json();
    })
    .then(json => {
      return dispatch({
        type: GET_BOARDS,
        payload: json
      });
    })
    .catch(err => {
      console.log(err);
    });
};
