import axios from "axios";

const update = payload => axios.put("/user", payload);
const show = () => axios.get("/user");

const userApi = { update, show };

export default userApi;
