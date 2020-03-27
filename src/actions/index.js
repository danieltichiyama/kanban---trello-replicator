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
export const GET_USER = "GET_USER";
export const UPDATE_USER = "UPDATE_USER";
export const DELETE_USER = "DELETE_USER";
export const TOGGLE_MODAL = "TOGGLE_MODAL";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const GET_USERS = "GET_USERS";
export const INVITE_COLLABORATORS = "INVITE_COLLABORATORS";
export const UNAUTHORIZED_ACTION_ERROR = "UNAUTHORIZED_ACTION_ERROR";

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

const deleteConfig = () => {
  return {
    method: "DELETE",
    headers: {
      "Content-type": "application/json"
    }
  };
};

const actionAuthorization = (dispatch, getState) => {
  let state = getState();
  if (state.created_by && state.user_id) {
    if (state.created_by !== state.user_id) {
      return dispatch({
        type: UNAUTHORIZED_ACTION_ERROR,
        payload: null
      });
    } else {
      return true;
    }
  }
};

export const actionsInviteCollaborators = formData => async (
  dispatch,
  getState
) => {
  if (actionAuthorization(dispatch, getState) === true) {
    await fetch(`/api/boards/invite/${formData.id}`, postConfig(formData))
      .then(response => {
        return response.json();
      })
      .then(results => {
        return dispatch({
          type: INVITE_COLLABORATORS,
          payload: results
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
};

export const actionsGetUsers = searchTerm => async dispatch => {
  if (searchTerm === "") {
    return dispatch({
      type: GET_USERS,
      payload: []
    });
  }
  await fetch(`/api/users/all?search=${searchTerm}`)
    .then(response => {
      return response.json();
    })
    .then(results => {
      return dispatch({
        type: GET_USERS,
        payload: results
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const actionsToggleModal = (modal = false) => dispatch => {
  return dispatch({
    type: TOGGLE_MODAL,
    payload: modal
  });
};

export const actionsDeleteUser = id => async dispatch => {
  await fetch(`/api/users/${id}/`, deleteConfig())
    .then(response => {
      return response.json();
    })
    .then(results => {
      return dispatch({
        type: DELETE_USER,
        payload: results
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const actionsUpdateUser = formData => async dispatch => {
  await fetch(`/api/users/${formData.id}/`, putConfig(formData))
    .then(response => {
      return response.json();
    })
    .then(results => {
      return dispatch({
        type: UPDATE_USER,
        payload: results
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const actionsGetUser = id => async dispatch => {
  await fetch(`/api/users/${id}`)
    .then(response => {
      return response.json();
    })
    .then(results => {
      return dispatch({
        type: GET_USER,
        payload: results
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const actionsLoginUser = formData => async dispatch => {
  await fetch("/api/auth/login", postConfig(formData))
    .then(response => {
      console.log("response", response);
      return response.json();
    })
    .then(results => {
      console.log("results", results);
      return dispatch({
        type: LOGIN_USER,
        payload: results
      });
    })
    .catch(err => {
      console.log(err);
      return dispatch({
        type: LOGIN_ERROR
      });
    });
};

export const actionsRegisterUser = formData => async dispatch => {
  await fetch("/api/auth/register", postConfig(formData))
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

export const actionsUpdateLabel = formData => async (dispatch, getState) => {
  if (actionAuthorization(dispatch, getState) === true) {
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
  }
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

export const actionsUpdateList = formData => async (dispatch, getState) => {
  if (actionAuthorization(dispatch, getState) === true) {
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
  }
};

export const actionsUpdateBoard = formData => async (dispatch, getState) => {
  if (actionAuthorization(dispatch, getState) === true) {
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
  }
};

export const actionsCreateLabel = formData => async (dispatch, getState) => {
  if (actionAuthorization(dispatch, getState) === true) {
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
  }
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

export const actionsCreateList = formData => async (dispatch, getState) => {
  if (actionAuthorization(dispatch, getState) === true) {
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
  }
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
      console.log("json", json);
      return dispatch({
        type: GET_BOARDS,
        payload: json
      });
    })
    .catch(err => {
      console.log(err);
    });
};
