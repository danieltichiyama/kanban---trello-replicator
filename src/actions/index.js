//action types
export const LOAD_CARDS = "LOAD_CARDS";
export const ADD_CARD = "ADD_CARD";
export const EDIT_CARD = "EDIT_CARD";
export const GET_CARD = "GET_CARD";
export const DELETE_CARD = "DELETE_CARD";

//action creators

export const actionsLoadStatuses = () = async dispatch =>{
  await fetch(`/api/statuses`)
}

export const deleteCard = id => async dispatch => {
  await fetch(`/api/cards/${id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json"
    }
  })
    .then(response => {
      return response.json();
    })
    .then(results => {
      dispatch({
        type: DELETE_CARD,
        payload: results.id
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const actionsLoadCards = () => async dispatch => {
  await fetch("/api/cards")
    .then(results => {
      return results.json();
    })
    .then(results => {
      dispatch({
        type: LOAD_CARDS,
        payload: results
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const getCardData = id => async dispatch => {
  dispatch({
    type: GET_CARD,
    payload: id
  });
};

export const addCard = data => async dispatch => {
  await fetch("/api/cards", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json"
    }
  })
    .then(results => {
      return results.json();
    })
    .then(results => {
      dispatch({
        type: ADD_CARD,
        payload: results
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const editCard = data => async dispatch => {
  let object = {
    id: data.id,
    title: data.title,
    body: data.body,
    created_by: data.created_by,
    assigned_by: data.assigned_by,
    priority_id: data.priority_id,
    status_id: data.status_id
  };

  await fetch(`/api/cards/${data.id}`, {
    method: "PUT",
    body: JSON.stringify(object),
    headers: {
      "Content-type": "application/json"
    }
  })
    .then(results => {
      return results.json();
    })
    .then(results => {
      dispatch({
        type: EDIT_CARD,
        payload: results
      });
    })
    .catch(err => {
      console.log(err);
    });
};
