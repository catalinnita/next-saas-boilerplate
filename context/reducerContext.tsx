import React, { useContext, useEffect } from "react"
import { useReducerAsync } from "use-reducer-async"
import { reducer, asyncReducer } from "../utils/reducer"
import { initialState } from "../utils/initialState"

type reducerContextType = {
  state,
  dispatch
}

type reducerProvider = {
  pageProps: Record<string, any>
}

export const ReducerContext = React.createContext({} as reducerContextType);

export const ReducerProvider: React.FC<reducerProvider> = ({ pageProps, children }) => {
  const [ state, dispatch ] = useReducerAsync(reducer, initialState, asyncReducer);
  const { token, user } = pageProps

  useEffect(() => {
    dispatch({
      type: 'setUser',
      payload: user
    })
    dispatch({
      type: 'setToken',
      payload: token
    })
  }, [token, user]);

  return (
    <ReducerContext.Provider value={{ state, dispatch }}>
      { children }
    </ReducerContext.Provider>
  )
}

export const useReducerContext = () => useContext(ReducerContext)
