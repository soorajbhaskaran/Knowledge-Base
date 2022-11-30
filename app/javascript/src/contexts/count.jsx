import React, { useReducer, useContext } from "react";

import countReducer from "reducers/count";

const CountStateContext = React.createContext();
const CountDispatchContext = React.createContext();

const initialState = { count: 0 };

const CountProvider = ({ children }) => {
  const [state, dispatch] = useReducer(countReducer, initialState);

  return (
    <CountStateContext.Provider value={state}>
      <CountDispatchContext.Provider value={dispatch}>
        {children}
      </CountDispatchContext.Provider>
    </CountStateContext.Provider>
  );
};

const useCountState = () => {
  const context = useContext(CountStateContext);
  if (context === undefined) {
    throw new Error("useCountState must be used within a CountProvider");
  }

  return context;
};

const useCountDispatch = () => {
  const context = useContext(CountDispatchContext);
  if (context === undefined) {
    throw new Error("useCountDispatch must be used within a CountProvider");
  }

  return context;
};

export { CountProvider, useCountState, useCountDispatch };
