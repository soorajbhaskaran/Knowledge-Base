import axios from "axios";

const login = (payload) => axios.post("/public/sessions", payload);

const authApi = { login };
export default authApi;
