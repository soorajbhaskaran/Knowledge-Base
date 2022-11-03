import axios from "axios";

const show = () => axios.get("/api/preference");
const update = (payload) => axios.put(`/api/preference/`, payload);

const preferenceApi = { show, update };

export default preferenceApi;
