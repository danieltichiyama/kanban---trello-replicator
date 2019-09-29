//action types
export const CASE_1 = "CASE_1"; //action type, always uppercase, otherwise known as an ENUM
export const CASE_2 = "CASE_2";

//action creators
export function caseOne(payload) {
  return {
    type: CASE_1,
    payload
  };
}

export function caseTwo(payload) {
  return {
    type: CASE_2,
    payload
  };
}

export const someAction = () => async dispatch => {
  await fetch("/someRoute") //await makes the async dispatch wait for the fetch callback to complete
    .then(results => {
      return results.json();
    })
    .then(results => {
      dispatch({
        //dispatch sends  it to our components
        type: CASE_1,
        payload: results
      });
    });
};

export const somePostAction = data => async dispatch => {
  await fetch("/somePostRoute2", {
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
        type: CASE_2,
        payload: results
      });
    });
};
