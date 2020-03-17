//action types
export const GET_BOARDS = "GET_BOARDS";
export const GET_BOARD_DATA = "GET_BOARD_DATA";
export const CREATE_BOARD = "CREATE_BOARD";
export const CREATE_LIST = "CREATE_LIST";
export const CREATE_CARD = "CREATE_CARD";
export const CREATE_LABEL = "CREATE_LABEL";
export const UPDATE_BOARD = "UPDATE_BOARD";
export const UPDATE_LIST = "UPDATE_LIST";
export const UPDATE_CARD = "UPDATE_CARD";
export const UPDATE_LABEL = "UPDATE_LABEL";
export const UPDATE_CARD_IN_STORE = "UPDATE_CARD_IN_STORE";
export const UPDATE_LIST_IN_STORE = "UPDATE_LIST_IN_STORE";
export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const REGISTER_USER = "REGISTER_USER";

const postConfig = data => {
  return {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json"
    }
  };
};

const putConfig = data => {
  return {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json"
    }
  };
};

export const actionsLoginUser = formData => async dispatch => {
  await fetch("/api/auth/login", postConfig(formData))
    .then(response => {
      return response.json();
    })
    .then(results => {
      return dispatch({
        type: LOGIN_USER,
        payload: results
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const actionsRegisterUser = formData => async dispatch => {
  await fetch("api/auth/register", postConfig(formData))
    .then(response => {
      return response.json();
    })
    .then(results => {
      return dispatch({ type: REGISTER_USER, payload: results });
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};

export const actionsLogoutUser = () => async dispatch => {
  await fetch("/api/auth/logout")
    .then(response => {
      response.json();
    })
    .then(results => {
      return dispatch({ type: LOGOUT_USER, payload: results });
    })
    .catch(err => {
      console.log(err);
    });
};

export const actionsUpdateListStore = formData => dispatch => {
  return dispatch({
    type: UPDATE_LIST_IN_STORE,
    payload: formData
  });
};

export const actionsUpdateCardStore = formData => dispatch => {
  return dispatch({
    type: UPDATE_CARD_IN_STORE,
    payload: formData
  });
};

export const actionsAddLabels = formData => async dispatch => {
  await fetch(`/api/cards/labels/${formData.card_id}`, putConfig(formData))
    .then(response => {
      return response.json();
    })
    .then(json => {
      return dispatch({
        type: UPDATE_CARD,
        payload: json
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const actionsUpdateLabel = formData => async dispatch => {
  await fetch(`/api/labels/${formData.id}`, putConfig(formData))
    .then(response => {
      return response.json();
    })
    .then(json => {
      return dispatch({
        type: UPDATE_LABEL,
        payload: json
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const actionsUpdateCard = formData => async dispatch => {
  await fetch(`/api/cards/${formData.id}`, putConfig(formData))
    .then(response => {
      return response.json();
    })
    .then(json => {
      return dispatch({
        type: UPDATE_CARD,
        payload: json
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const actionsUpdateList = formData => async dispatch => {
  await fetch(`/api/lists/${formData.id}`, putConfig(formData))
    .then(response => {
      return response.json();
    })
    .then(json => {
      return dispatch({
        type: UPDATE_LIST,
        payload: json
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const actionsUpdateBoard = formData => async dispatch => {
  console.log(formData);
  await fetch(`/api/boards/${formData.id}`, putConfig(formData))
    .then(response => {
      return response.json();
    })
    .then(json => {
      return dispatch({
        type: UPDATE_BOARD,
        payload: json
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const actionsCreateLabel = formData => async dispatch => {
  await fetch(`/api/labels/new`, postConfig(formData))
    .then(response => {
      return response.json();
    })
    .then(json => {
      return dispatch({
        type: CREATE_LABEL,
        payload: json
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const actionsCreateCard = formData => async dispatch => {
  await fetch(`/api/cards/new`, postConfig(formData))
    .then(response => {
      return response.json();
    })
    .then(json => {
      return dispatch({
        type: CREATE_CARD,
        payload: json
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const actionsCreateList = formData => async dispatch => {
  await fetch(`/api/lists/new`, postConfig(formData))
    .then(response => {
      return response.json();
    })
    .then(json => {
      json["cards"] = [];
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
