//action types
export const LOAD_CARDS = "LOAD_CARDS";

//action creators
export const loadCards = () => async dispatch => {
  await fetch("/cards")
    .then(results => {
      return results.json();
    })
    .then(results => {
      dispatch({
        type: LOAD_CARDS,
        payload: results
      });
    });
};

// export const somePostAction = data => async dispatch => {
//   await fetch("/somePostRoute2", {
//     method: "POST",
//     body: JSON.stringify(data),
//     headers: {
//       "Content-type": "application/json"
//     }
//   })
//     .then(results => {
//       return results.json();
//     })
//     .then(results => {
//       dispatch({
//         type: CASE_2,
//         payload: results
//       });
//     });
// };
