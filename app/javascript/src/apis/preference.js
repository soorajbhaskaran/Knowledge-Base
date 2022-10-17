import axios from "axios";

const show = () => axios.get("/preference");
const update = (payload) => axios.put(`/preference/`, payload);
const create = (payload) => axios.post(`/preference/`, payload);

const preferenceApi = { show, update, create };

export default preferenceApi;
