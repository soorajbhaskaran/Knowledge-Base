import axios from "axios";

const login = (payload) => axios.post("/api/public/sessions", payload);

const authApi = { login };
export default authApi;
