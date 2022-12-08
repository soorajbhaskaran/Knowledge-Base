const setToLocalStorage = ({ authToken }) => {
  localStorage.setItem("authToken", JSON.stringify(authToken));
};

const getFromLocalStorage = key => JSON.parse(localStorage.getItem(key));

export { setToLocalStorage, getFromLocalStorage };
