export const reducer = (state, action) => {
  const { type, payload } = action
  switch (type) {
    case 'setUser':
      return {
        ...state,
        user: payload
      }

    case 'setToken':
      return {
        ...state,
        token: payload
      }



    default:
      return state
  }

}

export const asyncReducer = {
  FETCH: ({ dispatch, getState, signal }) => async (action) => {
    dispatch({ type: 'START_FETCH' });
    try {
      const response = await fetch(action.url);
      const data = await response.json();
      dispatch({ type: 'FINISH_FETCH', data });
    } catch (error) {
      dispatch({ type: 'ERROR_FETCH', error });
    }
  },
}
