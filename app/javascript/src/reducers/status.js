const statusReducer = (_state, { type, status }) => {
  switch (type) {
    case "SET_STATUS":
      return { status };
    case "RESET_STATUS":
      return { status: null };
    default:
      throw new Error(`Unhandled action type: ${type}`);
  }
};

export default statusReducer;
