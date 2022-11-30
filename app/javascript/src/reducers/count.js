const countReducer = (_state, { type, count }) => {
  switch (type) {
    case "SET_COUNT":
      return { count };
    default:
      throw new Error(`Unhandled action type: ${type}`);
  }
};

export default countReducer;
