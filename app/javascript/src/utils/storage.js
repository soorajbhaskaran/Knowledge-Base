const setToLocalStorage = ({ authToken, userId }) => {
  localStorage.setItem("authToken", JSON.stringify(authToken));
  localStorage.setItem("userId", JSON.stringify(userId));
};

const getFromLocalStorage = key => localStorage.getItem(key);

export { setToLocalStorage, getFromLocalStorage };
