import React, { useReducer, useContext } from "react";

import statusReducer from "reducers/status";

const StatusStateContext = React.createContext();
const StatusDispatchContext = React.createContext();

const initialState = { status: null };

const StatusProvider = ({ children }) => {
  const [state, dispatch] = useReducer(statusReducer, initialState);

  return (
    <StatusStateContext.Provider value={state}>
      <StatusDispatchContext.Provider value={dispatch}>
        {children}
      </StatusDispatchContext.Provider>
    </StatusStateContext.Provider>
  );
};

const useStatusState = () => {
  const context = useContext(StatusStateContext);
  if (context === undefined) {
    throw new Error("useStatusState must be used within a StatusProvider");
  }

  return context;
};

const useStatusDispatch = () => {
  const context = useContext(StatusDispatchContext);
  if (context === undefined) {
    throw new Error("useStatusDispatch must be used within a StatusProvider");
  }

  return context;
};

export { StatusProvider, useStatusState, useStatusDispatch };
