import axios from "axios";

const login = payload => axios.post("/public/session", payload);

const authApi = { login };
export default authApi;
