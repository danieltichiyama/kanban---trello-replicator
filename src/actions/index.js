//action types
export const GET_BOARDS = "GET_BOARDS";

export const actionsGetBoards = userID => async dispatch => {
  await fetch(`/api/boards/${userID}`)
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
