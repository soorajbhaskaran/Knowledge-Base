import axios from "axios";

const fetch = () => axios.get("/categories");
const create = (payload) => axios.post("/categories", payload);

const categoryApi = { fetch, create };
export default categoryApi;
